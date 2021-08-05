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
          user: any; 
          repoName: any;  
          repoData: any; 
          contributors: any; 
          languages: any; 
          tags: any; 
          branches:any; 
          commits: any; 
          forks: any; 
        }): any;
        new (): any;
      };
    };
  }
): Promise<any> {
  const session = await getSession({ req });
  const {repo} = req.query

  const octokit = new Octokit({
    auth: session?.accessToken,
  });

  // Get user data
  const userData = await octokit.request("GET /user");
  const username = userData.data.login

  // Get the data about the spcific repo
  const repoData = await octokit.request(
    'GET /repos/{owner}/{repo}', 
  {
    owner: username,
    repo: repo
  })

  // Get repo contributors 
  const contributors = await octokit.request(
    'GET /repos/{owner}/{repo}/contributors', 
  {
    owner: username,
    repo: repo
  })

  // Get repo languages 
  const languages = await octokit.request(
    'GET /repos/{owner}/{repo}/languages', 
  {
    owner: username,
    repo: repo
  })

  // Get repo tags 
  const tags = await octokit.request(
    'GET /repos/{owner}/{repo}/tags', 
  {
    owner: username,
    repo: repo
  })
  
  // Get a list of branches 
  const branches = await octokit.request(
    'GET /repos/{owner}/{repo}/branches', 
  {
    owner: username,
    repo: repo
  })

  // Get a list of commit data 
  const commits = await octokit.request(
    'GET /repos/{owner}/{repo}/commits?per_page=100', 
  {
    owner: username,
    repo: repo
  })

  // Get Forks 
  const forks = await octokit.request(
    'GET /repos/{owner}/{repo}/forks?per_page=100', 
  {
    owner: username,
    repo: repo
  })


  // Return the data
  return res.status(200).json({
    user: username,
    repoName: repo,
    contributors: contributors.data, 
    languages: languages.data, 
    tags: tags.data,
    branches: branches.data, 
    commits: commits.data,
    forks: forks.data,
    repoData: repoData.data, 
  });
}