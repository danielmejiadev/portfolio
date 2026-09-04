"use client";

import { useEffect, useRef } from "react";
import { lerpTowards } from "@/utils/motion";

const FOLLOW_SMOOTHING = 0.05;
const INITIAL_POSITION_PERCENT = { x: 50, y: 40 };

/** Mouse-reactive gradient mesh, scoped to its parent (a `position: relative` section). */
export default function HeroMesh() {
  const meshRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const meshElement = meshRef.current;
    if (!meshElement) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const parentSection = meshElement.parentElement;
    if (!parentSection) return;

    let currentX = INITIAL_POSITION_PERCENT.x;
    let currentY = INITIAL_POSITION_PERCENT.y;
    let targetX = INITIAL_POSITION_PERCENT.x;
    let targetY = INITIAL_POSITION_PERCENT.y;
    let animationFrameId = 0;

    function handleMouseMove(event: MouseEvent) {
      const bounds = parentSection!.getBoundingClientRect();
      targetX = ((event.clientX - bounds.left) / bounds.width) * 100;
      targetY = ((event.clientY - bounds.top) / bounds.height) * 100;
    }

    function animateTowardsTarget() {
      currentX = lerpTowards(currentX, targetX, FOLLOW_SMOOTHING);
      currentY = lerpTowards(currentY, targetY, FOLLOW_SMOOTHING);
      meshElement!.style.setProperty("--mx", `${currentX}%`);
      meshElement!.style.setProperty("--my", `${currentY}%`);
      animationFrameId = requestAnimationFrame(animateTowardsTarget);
    }

    parentSection.addEventListener("mousemove", handleMouseMove);
    animationFrameId = requestAnimationFrame(animateTowardsTarget);

    return () => {
      parentSection.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <div ref={meshRef} className="hero-mesh" aria-hidden="true" />;
}
