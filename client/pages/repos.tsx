import Sidebar from "../components/sidebar";
import useSWR from "swr";
import { Center, Heading, Spinner, Flex, Text } from "@chakra-ui/react";
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
  const { data: githubData } = useSWR("/api/profile", fetcher);
  const { data: repoData } = useSWR("/api/repos", fetcher, );

  return (
    <>
      <Head>
        <title>Repositories</title>
      </Head>
      <Sidebar pageTitle="Repositories" githubData={githubData}>
        {repoData ? (
          repoData?.allRepoData.map((repo: any) => (
            <RepoCard
              repoId={repo.id}
              userId={githubData.id}
              key={repo.id}
              repoName={repo.repoName}
              repoOwner={repo.owner}
              description={repo.description}
              primaryLanguage={repo.primaryLanguage}
              numStars={repo.stargazersCount}
              isFavourite={repo.isFavourite}
              size="5xl"
            />
          ))
        ) : (
          <Flex
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            mt={5}
          >
            <Text fontSize="xl" fontWeight={600}>
              Please wait...{"\n"}
            </Text>
            <Spinner size="xl" />
          </Flex>
        )}
      </Sidebar>
    </>
  );
}
