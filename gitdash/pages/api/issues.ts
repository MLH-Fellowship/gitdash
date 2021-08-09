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

  // Get all issues
  const issues = await octokit.request("GET /issues");

  // Iterate through the repo names and collect the pull data
  const filterIssues = [];

  for (let issue of issues.data) {
    if (!issue.pull_request) {
      // Issues can be pull requests but pull requests cannot be issues.
      // Thus I am filtering the return data if the pull_request is populated
      // Then it is a pull request and not an issue.
      filterIssues.push(issue);
    }
  }

  return res.status(200).json({
    output: filterIssues.reverse(),
    count: filterIssues.length,
  });
}
