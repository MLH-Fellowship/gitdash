import Sidebar from "../components/sidebar";
import useSWR from "swr";

async function fetcher(...arg: any) {
  try {
    const res = await fetch(arg);
    return res.json();
  } catch (err) {
    console.log(err);
  }
}

export default function Repos() {
  const { data: githubData } = useSWR("/api/github", fetcher);
  const { data: repoData } = useSWR("/api/all_repos", fetcher);

  console.log(repoData);

  return (
    <Sidebar pageTitle="Repositories" githubData={githubData}>
      <h1>This is the repositories page</h1>
    </Sidebar>
  );
}
