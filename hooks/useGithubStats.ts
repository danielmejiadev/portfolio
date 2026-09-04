"use client";

import { useQuery } from "@tanstack/react-query";
import { githubStatsSeed } from "@/lib/data";
import { fetchGithubUserStats } from "@/utils/github";

const seedStats = { followers: githubStatsSeed.followers, publicRepos: githubStatsSeed.publicRepos };

/**
 * Live public-repo/follower counts for the portfolio owner. Renders the
 * real, seeded values immediately (see lib/data.ts), then React Query
 * refreshes them from the GitHub API in the background. If the fetch
 * fails (offline, rate-limited) the seed just stays on screen — never a
 * fabricated number.
 */
export function useGithubStats() {
  const query = useQuery({
    queryKey: ["github-user-stats", githubStatsSeed.username],
    queryFn: fetchGithubUserStats,
    placeholderData: seedStats,
  });

  return {
    stats: query.data ?? seedStats,
    // `placeholderData` makes `isSuccess` true immediately with the seed —
    // only count it as "live" once a real fetch has actually resolved.
    isLive: query.isSuccess && !query.isPlaceholderData,
  };
}
