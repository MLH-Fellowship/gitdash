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

  const pulls = await octokit.request("GET /issues");

  // Iterate through the repo names and collect the pull data
  const filterPulls = [];

  for (let pull of pulls.data) {
    if (pull.pull_request) {
      // Issues can be pull requests but pull requests cannot be issues.
      // Thus I am filtering the return data if the pull_request is populated
      // Then it is a pull request and not an issue.
      filterPulls.push(pull);
    }
  }

  // Return the counts
  return res.status(200).json({
    pulls: filterPulls,
    count: filterPulls.length,
  });
}
