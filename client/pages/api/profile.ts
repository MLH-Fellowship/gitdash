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
          stars: any;
          followers: any;
          starred: any;
          id: any;
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

  // Number of followers
  const followerCount = userData.data.followers;

  // Number of stars
  // Note this really needs some way of optimizing instead of getting all the repos, parsing
  // and adding. GraphQL!!!!!!!! We need this optimisation in a lot of places 
  const starsCount = repos.data
    .filter((repo: { fork: any }) => !repo.fork)
    .reduce((acc: any, item: { stargazers_count: any }) => {
      return acc + item.stargazers_count;
    }, 0);

  // Making the request to get the response :/
  const reposStarred = await octokit.request("GET /user/starred?per_page=1");

  // Parsing the starred repos using a library
  const linkHeader = reposStarred.headers.link;
  const parsed = linkHeader ? parse(linkHeader) : parse('');
  const starredCount = parsed?.last.page;


  // Return the counts
  return res.status(200).json({
    stars: starsCount,
    followers: followerCount,
    starred: starredCount,
    id: userData.data.id
  });
}
