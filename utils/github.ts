import { githubStatsSeed } from "@/lib/data";

export type GithubUserStats = {
  followers: number;
  publicRepos: number;
};

/**
 * Fetches the public, keyless GitHub API for the portfolio owner's profile.
 * Used by hooks/useGithubStats — never called directly from a component.
 */
export async function fetchGithubUserStats(): Promise<GithubUserStats> {
  const response = await fetch(`https://api.github.com/users/${githubStatsSeed.username}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`GitHub API responded with ${response.status}`);
  }

  const payload = await response.json();

  if (typeof payload.followers !== "number" || typeof payload.public_repos !== "number") {
    throw new Error("GitHub API response is missing followers/public_repos");
  }

  return { followers: payload.followers, publicRepos: payload.public_repos };
}
