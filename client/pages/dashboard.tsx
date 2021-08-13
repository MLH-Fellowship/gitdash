import {
  Box,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Stack,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import Head from "next/head";
import Sidebar from "../components/sidebar";
import IssueCard from "../components/issuecard";
import useSWR from "swr";

async function fetcher(...arg: any) {
  try {
    const res = await fetch(arg);
    return res.json();
  } catch (err) {
    console.log(err);
  }
}

export default function Dashboard() {
  const { data: githubData } = useSWR("/api/github", fetcher);
  const { data: issueData } = useSWR("/api/issues", fetcher);
  const { data: prData } = useSWR("/api/pulls", fetcher);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      {githubData ? (
        <Sidebar pageTitle="Dashboard" githubData={githubData}>
          <Flex justify="center" wrap="wrap" mt={5}>
            <Stack
              direction={{ base: "column", xl: "row" }}
              spacing={{ base: "10px", xl: "220px" }}
            >
              <VStack>
                <Text fontSize="xl" fontWeight="800">
                  Issues
                </Text>
                {issueData ? (
                  issueData.output
                    .slice(0, 3)
                    .map((issue: any) => (
                      <IssueCard
                        issueName={issue.title}
                        issueBody={issue.body}
                        issueLabels={issue.labels}
                        issueRepo={issue.html_url}
                        issueNumber={issue.number}
                        issueAvatar={issue.user.avatar_url}
                        issueUser={issue.user.login}
                        key={issue.id}
                      />
                    ))
                ) : (
                  <Spinner size="xl" />
                )}
              </VStack>
              <VStack>
                <Text fontSize="xl" fontWeight="800">
                  Pull Requests
                </Text>
                {prData ? (
                  prData.pulls
                    .slice(0, 3)
                    .map((pr: any) => (
                      <IssueCard
                        issueName={pr.title}
                        issueBody={pr.body}
                        issueLabels={pr.labels}
                        issueRepo={pr.html_url}
                        issueAvatar={pr.user.avatar_url}
                        issueNumber={pr.number}
                        issueUser={pr.user.login}
                        key={pr.id}
                      />
                    ))
                ) : (
                  <Spinner size="xl" />
                )}
              </VStack>
            </Stack>
          </Flex>
        </Sidebar>
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
    </>
  );
}
