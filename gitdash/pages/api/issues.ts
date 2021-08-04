import { Octokit } from "@octokit/core";

const Issues = async (req: any, res: any) => {
  const octokit = new Octokit({
    auth: "",
  });

  // Get issues data
  const assigned_issues = await octokit.request("GET /issues?filter=assigned");
  console.log(assigned_issues);

  // We can get specific data from it as well but for now returning everything.

  return res.status(200).json({
    assignedIssues: assigned_issues.data,
  });
};

export default Issues;
