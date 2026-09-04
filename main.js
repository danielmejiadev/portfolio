(function () {
  "use strict";

  var data = window.__BRAND__ || {};
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  function $(sel, scope) { return (scope || document).querySelector(sel); }
  function $$(sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); }
  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "] failed:", e); }
  }

  // ---- Reveal on scroll ----
  function initReveals() {
    var els = $$("[data-reveal]");
    if (!els.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-revealed");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -2% 0px" });
    els.forEach(function (el) { io.observe(el); });

    // Safety net: force-reveal anything still hidden after 6s
    setTimeout(function () {
      $$("[data-reveal]:not(.is-revealed)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("is-revealed");
        }
      });
    }, 6000);
  }

  // ---- Sticky nav ----
  function initNav() {
    var nav = $(".nav");
    if (!nav) return;
    var on = function () {
      if (window.scrollY > 60) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
  }

  // ---- Magnetic buttons ----
  function initMagnetic() {
    if (!fineHover) return;
    $$("[data-magnetic]").forEach(function (el) {
      var strength = parseFloat(el.dataset.magneticStrength || "0.3");
      var inner = document.createElement("span");
      inner.className = "magnetic-inner";
      while (el.firstChild) inner.appendChild(el.firstChild);
      el.appendChild(inner);
      el.classList.add("has-magnetic");
      var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        tx = ((e.clientX - r.left) - r.width / 2) * strength;
        ty = ((e.clientY - r.top) - r.height / 2) * strength;
        if (!raf) raf = requestAnimationFrame(loop);
      });
      el.addEventListener("mouseleave", function () {
        tx = 0; ty = 0;
        if (!raf) raf = requestAnimationFrame(loop);
      });
      function loop() {
        cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2;
        inner.style.transform = "translate3d(" + cx + "px, " + cy + "px, 0)";
        raf = (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) ? requestAnimationFrame(loop) : null;
      }
    });
  }

  // ---- Tilt on cards ----
  function initTilt() {
    if (!fineHover) return;
    $$(".case-card, .oss-card").forEach(function (card) {
      var MAX = 6;
      var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
      card.classList.add("has-tilt");
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        tx = -py * MAX; ty = px * MAX;
        if (!raf) raf = requestAnimationFrame(loop);
      });
      card.addEventListener("mouseleave", function () {
        tx = 0; ty = 0;
        if (!raf) raf = requestAnimationFrame(loop);
      });
      function loop() {
        cx += (tx - cx) * 0.15; cy += (ty - cy) * 0.15;
        card.style.setProperty("--rx", cx.toFixed(2) + "deg");
        card.style.setProperty("--ry", cy.toFixed(2) + "deg");
        raf = (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) ? requestAnimationFrame(loop) : null;
      }
    });
  }

  // ---- Count-up stats ----
  function initCountUp() {
    $$("[data-count-to]").forEach(function (el) {
      var target = parseFloat(el.dataset.countTo);
      var decimals = (el.dataset.countTo.split(".")[1] || "").length;
      var trigger = function () {
        if (window.gsap) {
          var obj = { v: 0 };
          gsap.to(obj, {
            v: target, duration: 1.3, ease: "power2.out",
            onUpdate: function () { el.textContent = obj.v.toFixed(decimals); }
          });
        } else {
          el.textContent = target.toFixed(decimals);
        }
      };
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { trigger(); io.unobserve(e.target); }
        });
      }, { threshold: 0.01 });
      io.observe(el);
    });
  }

  // ---- Mouse-reactive gradient mesh (hero) ----
  function initGradientMesh() {
    if (!fineHover || reduced) return;
    var mx = 50, my = 40, tx = 50, ty = 40;
    document.addEventListener("mousemove", function (e) {
      tx = (e.clientX / window.innerWidth) * 100;
      ty = (e.clientY / window.innerHeight) * 100;
    });
    function frame() {
      mx += (tx - mx) * 0.05;
      my += (ty - my) * 0.05;
      document.documentElement.style.setProperty("--mx", mx + "%");
      document.documentElement.style.setProperty("--my", my + "%");
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // ---- Footer year ----
  function initFooterYear() {
    var el = $("[data-year]");
    if (el) el.textContent = new Date().getFullYear();
  }

  function boot() {
    safe(initFooterYear, "initFooterYear");
    safe(initNav, "initNav");
    safe(initReveals, "initReveals");
    safe(initMagnetic, "initMagnetic");
    safe(initTilt, "initTilt");
    safe(initCountUp, "initCountUp");
    safe(initGradientMesh, "initGradientMesh");
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
