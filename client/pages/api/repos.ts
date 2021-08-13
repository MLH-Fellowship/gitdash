import { getSession } from "next-auth/client";
import { Octokit } from "@octokit/core";
import parse from "parse-link-header";

import axios from "axios";
import https from "https";

export interface Repository {
  repoId: string;
}

export interface Favourite {
  userId: string;
  repositories: Repository[];
}

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

  // Get user data
  const userData = await octokit.request("GET /user");

  // Get all repos
  const repos = await octokit.request(
    "GET /user/repos?per_page=100&sort=updated"
  );

  let repo_information: any = {};

  let favourites: Favourite = {} as Favourite;

  // Get favourite repos from api
  await axios
    .get("https://api.gitdash.tech/favourite/" + userData.data.id, {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    })
    .then(function (response) {
      console.log(response.data);
      favourites = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  const final_output = [];

  // Iterate through all the repos to get their data
  for (let i = 0; i < repos.data.length; i++) {
    // Define the repo name and the username
    const repo = repos.data[i].name;
    const username = repos.data[i].owner.login;

    // Check if the repo is a fork
    if (repos.data[i].fork) {
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
      description: repos.data[i].description,
      primaryLanguage: primary_language,
      stargazersCount: repos.data[i].stargazers_count,
      id: repos.data[i].id,
      isFavourite: false,
    };

    // Check if favourites
    favourites.repositories.forEach((element) => {
      if (element.repoId == repos.data[i].id) {
        repo_information.isFavourite = true;
      }
    });

    console.log(repo_information);

    // Append to the final output array
    final_output.push(repo_information);
  }

  // Return the data
  return res.status(200).json({
    allRepoData: final_output,
  });
}
