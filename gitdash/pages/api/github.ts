import { getSession } from "next-auth/client";
import { Octokit } from "@octokit/core";

export default async function GetDetails(
  req: any,
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: {
        (arg0: {
          stars: any;
          followers: any;
          starred: any;
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

  // Get all repos
  const repos = await octokit.request("GET /user/repos");

  // Number of followers
  const followerCount = userData.data.followers;

  // Number of stars
  // Note this really needs some way of optimizing instead of getting all the repos, parsing
  // and adding. GraphQL!!!!!!!!
  const starsCount = repos.data
    .filter((repo: { fork: any }) => !repo.fork)
    .reduce((acc: any, item: { stargazers_count: any }) => {
      return acc + item.stargazers_count;
    }, 0);

  // Get Number of starred repos by using a weird hack since Github api doesnt have a endpoint.
  // You parse the link header in the response to get the rel_last which relates to the totat
  // count if the per_page is set to one

  // Making the request to get the response :/
  const reposStarred = await octokit.request("GET /user/starred?per_page=1");

  // Parsing the starred repos using a library
  const parse = require("parse-link-header");
  const linkHeader = reposStarred.headers.link;
  const parsed = parse(linkHeader);
  const starredCount = parsed.last.page;

  // Number of issues
  const issueCount = repos.data
    .filter((repo: { fork: any }) => !repo.fork)
    .reduce((acc: any, item: { open_issues: any }) => {
      // console.log(item.open_issues)
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
    stars: starsCount,
    followers: followerCount,
    starred: starredCount,
    all_repos: repo_names,
    repo_count: num_repos,
    issues: issueLinks,
    issue_count: issueCount,
  });
}
