import { Octokit } from "@octokit/core";
import { getSession } from "next-auth/client";

export default async function GetIssueDetails(
  req: any,
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: {
        (arg0: { output: any; count: any }): any;
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

  // Iterate through the repo names and collect the pull data
  const allAssignedIssues = [];
  for (let repo of repos.data) {
    if (repo.owner) {
      // Get issues data
      const assignedIssues = await octokit.request(
        `GET /repos/{owner}/{repo}/issues?sort=updated`,
        {
          owner: repo.owner.login,
          repo: repo.name,
        }
      );

      // Iterate through the pullData
      for (let issue of assignedIssues.data) {
        if (!issue.pull_request) {
          allAssignedIssues.push(issue);
        }
      }
    }
  }
  console.log("Actual data");
  console.log(allAssignedIssues);

  return res.status(200).json({
    output: allAssignedIssues,
    count: allAssignedIssues.length,
  });
}
