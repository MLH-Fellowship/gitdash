import Sidebar from "../components/sidebar";
import useSWR from "swr";
import { Heading, Spinner } from "@chakra-ui/react";
import RepoCard from "../components/repocard";
import Head from "next/head";

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
  const { data: repoData } = useSWR("/api/repos", fetcher);

  return (
    <>
      <Sidebar pageTitle="Repositories" githubData={githubData}>
        {repoData ? (
          repoData?.allRepoData.map((repo: any) => (
            <RepoCard
              key={repo.id}
              repoName={repo.repoName}
              repoOwner={repo.owner}
              description={repo.description}
              primaryLanguage={repo.primaryLanguage}
              numStars={repo.numStars}
            />
          ))
        ) : (
          <Spinner size="xl"></Spinner>
        )}
      </Sidebar>
    </>
  );
}
