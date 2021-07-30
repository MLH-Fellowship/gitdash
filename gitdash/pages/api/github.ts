const { Octokit } = require('@octokit/rest')

export default async (req, res) => {
  const octokit = new Octokit({
    // auth: 
    // github token for a particular user, leaving empty for now
  })
  const username = "anandrajaram21"    // need to get the input from the user for this  

  // Number of followers
  const followers = await octokit.request(`/users/${username}/followers?per_page=100`)
  const followerCount = followers.data.length

  // Number of stars
  const repos = await octokit.request(`/users/${username}/repos`);
  const starsCount = repos.data.filter(repo => !repo.fork).reduce((acc, item) => {
      return acc + item.stargazers_count
  }, 0)

  // Number of starred repos
  const reposStarred = await octokit.request(`/users/${username}/starred`)
  const starredCount = reposStarred.data.length

  // List of repos
  const repo_names = repos.data.map(repo => repo.name)

  // console.log(repos) - for API Testing 

  // Return the counts
  return res.status(200).json({ stars: starsCount, followers: followerCount, starred: starredCount, all_repos: repo_names})
}
