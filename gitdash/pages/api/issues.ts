import { Octokit } from "@octokit/core";
import { getSession } from "next-auth/client";

export default async function GetIssueDetails(
  req: any,
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: {
        (arg0: {
          output: any; 
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

  // Get issues data
  const assignedIssues = await octokit.request(`GET /repos/{owner}/{repo}/issues`, {
    owner: 'prakharrathi25', 
    repo: 'intellimart'
  })

  // Get all repos
  // console.log(assignedIssues);

  return res.status(200).json({
    output: assignedIssues.data,
  });
}

