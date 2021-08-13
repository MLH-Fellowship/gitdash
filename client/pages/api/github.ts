import { getSession } from "next-auth/client";
import { Octokit } from "@octokit/core";
import parse from "parse-link-header";

export default async function GetDetails(
  req: any,
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: {
        (arg0: {
          all_repos: any;
          repo_count: any;
          issues: any;
          issue_count: any;
        }): any;
        new (): any;
      };
    };
  }
): Promise<any> {
  const session = await getSession({ req });

  const octokit = new Octokit({
    auth: session?.accessToken,
  });

  // Get user data
  const userData = await octokit.request("GET /user");
  const username = userData.data.login

  // Get all repos
  const repos = await octokit.request("GET /user/repos");

  // Number of issues
  const issueCount = repos.data
    .filter((repo: { fork: any }) => !repo.fork)
    .reduce((acc: any, item: { open_issues: any }) => {
      return acc + item.open_issues;
    }, 0);

  // List of repos
  const repo_names = repos.data.map((repo: { name: any }) => repo.name);

  // Number of repos
  const num_repos = repo_names.length;

  /* Get the data related to the issues of a repository */
  // Loop through the repo names
  const issueLinks = repos.data.map((repo: { issues_url: string | any[] }) =>
    repo.issues_url.slice(0, -9)
  );

  // Return the counts
  return res.status(200).json({
    all_repos: repo_names,
    repo_count: num_repos,
    issues: issueLinks,
    issue_count: issueCount,
  });
}
