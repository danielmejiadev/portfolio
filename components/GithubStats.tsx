"use client";

import { useEffect, useState } from "react";
import { githubStatsSeed } from "@/lib/data";

export default function GithubStats() {
  const [stats, setStats] = useState({
    followers: githubStatsSeed.followers,
    publicRepos: githubStatsSeed.publicRepos,
  });
  const [live, setLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.github.com/users/${githubStatsSeed.username}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (cancelled || !d) return;
        if (typeof d.followers === "number" && typeof d.public_repos === "number") {
          setStats({ followers: d.followers, publicRepos: d.public_repos });
          setLive(true);
        }
      })
      .catch(() => {
        /* offline or rate-limited — keep the seeded values */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const items = [
    { label: "public repos", value: stats.publicRepos },
    { label: "followers", value: stats.followers },
    { label: "on GitHub since", value: githubStatsSeed.memberSince },
  ];

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-ink-faint">
      <span className="inline-flex items-center gap-1.5" title={live ? "Live from the GitHub API" : "Last known values"}>
        <span className={`h-1.5 w-1.5 rounded-full ${live ? "bg-accent-3" : "bg-ink-faint"}`} />
        {live ? "live" : "cached"}
      </span>
      {items.map((it) => (
        <span key={it.label}>
          <strong className="font-sans text-ink">{it.value}</strong> {it.label}
        </span>
      ))}
    </div>
  );
}
