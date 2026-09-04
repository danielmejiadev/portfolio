"use client";

import { githubStatsSeed } from "@/lib/data";
import { useGithubStats } from "@/hooks/useGithubStats";

export default function GithubStats() {
  const { stats, isLive } = useGithubStats();

  const items = [
    { label: "public repos", value: stats.publicRepos },
    { label: "followers", value: stats.followers },
    { label: "on GitHub since", value: githubStatsSeed.memberSince },
  ];

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-ink-faint">
      <span className="inline-flex items-center gap-1.5" title={isLive ? "Live from the GitHub API" : "Last known values"}>
        <span className={`h-1.5 w-1.5 rounded-full ${isLive ? "bg-accent-3" : "bg-ink-faint"}`} />
        {isLive ? "live" : "cached"}
      </span>
      {items.map((item) => (
        <span key={item.label}>
          <strong className="font-sans text-ink">{item.value}</strong> {item.label}
        </span>
      ))}
    </div>
  );
}
