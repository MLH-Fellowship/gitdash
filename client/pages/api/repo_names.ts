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
          repoNames: any;
          user: any;
          repoCount: any; 
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

  // List of repos
  const repo_names = repos.data.map((repo: { name: any }) => repo.name);

  // Number of repos
  const num_repos = repo_names.length;

  // Return the data
  return res.status(200).json({
    user: username,
    repoNames: repo_names,
    repoCount: num_repos
  });
}
