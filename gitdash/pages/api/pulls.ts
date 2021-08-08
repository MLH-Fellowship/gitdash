import { getSession } from "next-auth/client";
import { Octokit } from "@octokit/core";
import parse from "parse-link-header";

export default async function GetPullDetails(
  req: any,
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: {
        (arg0: { pulls: any; count: any }): any;
        new (): any;
      };
    };
  }
): Promise<any> {
  const session = await getSession({ req });

  const octokit = new Octokit({
    auth: session?.accessToken,
  });

  // Get all repos
  const repos = await octokit.request("GET /user/repos");

  // Iterate through the repo names and collect the pull data
  const allPullData = [];
  for (let repo of repos.data) {
    if (repo.owner) {
      // Get pull request data
      const pullData = await octokit.request(
        `GET /repos/{owner}/{repo}/pulls`,
        {
          owner: repo.owner.login,
          repo: repo.name,
        }
      );

      // Iterate through the pullData
      for (let pull of pullData.data) {
        allPullData.push(pull);
      }
    }
  }
  console.log("Actual data");
  console.log(allPullData);

  // Return the counts
  return res.status(200).json({
    pulls: allPullData,
    count: allPullData.length,
  });
}
