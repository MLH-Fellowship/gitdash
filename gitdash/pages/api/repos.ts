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
        (arg0: { allRepoData: any }): any;
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
  const repos = await octokit.request(
    "GET /user/repos?per_page=100&sort=updated"
  );

  console.log(repos.data[2]);

  // List of repos
  const repo_names = repos.data.map((repo: { name: any }) => repo.name);

  const final_output = [];
  let repo_information = {};

  // Iterate through all the repos to get their data
  for (let i = 0; i < repos.data.length; i++) {
    // Define the repo name and the username
    const repo = repos.data[i].name;
    const username = repos.data[i].owner.login;

    // Check if the repo is a fork
    if (repos.data[i].fork) {
      console.log("This is a fork");
      continue;
    }

    // Get repo languages
    const languages = await octokit.request(
      "GET /repos/{owner}/{repo}/languages",
      {
        owner: username,
        repo: repo,
      }
    );

    // Get the most used language
    const primary_language = Object.keys(languages.data)[0];

    // info for one particular repo will be saved
    repo_information = {
      repoName: repo,
      owner: username,
      description: repos.data.description,
      primaryLanguage: primary_language,
      stargazersCount: repos.data[i].stargazers_count,
      id: repos.data[i].id,
    };

    // Append to the final output array
    final_output.push(repo_information);
  }

  // Return the data
  return res.status(200).json({
    allRepoData: final_output,
  });
}
