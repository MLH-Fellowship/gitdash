import { getSession } from "next-auth/client";
import { Octokit } from "@octokit/core";
import parse from "parse-link-header";
import axios from "axios";
import { Favourite } from "../../models/Favourite";
import https from "https";

export default async function GetPullDetails(
  req: any,
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: {
        (arg0: {
          pulls: any;
          pullsCount: any;
          issues: any;
          issuesCount: any;
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

  const pulls = await octokit.request("GET /issues");

  // Iterate through the repo names and collect the pull data
  const filterPulls = [];
  const filterIssues = [];

  let favourites: Favourite = {} as Favourite;

  // Get favourite repos from api
  await axios
    .get("https://api.gitdash.tech/favourite/" + userData.data.id, {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    })
    .then(function (response) {
      favourites = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  for (let pull of pulls.data) {
    if (
      favourites.repositories.some(
        (e) => e.repoId === pull.repository?.id.toString()
      )
    ) {
      if (pull.pull_request) {
        // Issues can be pull requests but pull requests cannot be issues.
        // Thus I am filtering the return data if the pull_request is populated
        // Then it is a pull request and not an issue.
        filterPulls.push(pull);
      } else {
        filterIssues.push(pull);
      }
    }
  }

  // Return the counts
  return res.status(200).json({
    pulls: filterPulls,
    pullsCount: filterPulls.length,
    issues: filterIssues.reverse(),
    issuesCount: filterIssues.length,
  });
}
