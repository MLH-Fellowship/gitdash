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
import IssueCard from "../components/card";
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

  console.log(issueData);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      {githubData ? (
        <Sidebar pageTitle="Dashboard" githubData={githubData}>
          {/* <Flex justify="center" wrap="wrap" mt={5}>
            <Box w="300px" p={5} ml={20} mb={3} borderWidth="1px" rounded="lg">
              <Stat>
                <StatLabel>
                  <Text fontSize="xl">Github Stars</Text>
                </StatLabel>
                <StatNumber>
                  {githubData ? githubData.stars : "Loading..."}
                </StatNumber>
              </Stat>
            </Box>
            <Box w="300px" p={5} ml={5} mb={3} borderWidth="1px" rounded="lg">
              <Stat>
                <StatLabel>
                  <Text fontSize="xl">Github Followers</Text>
                </StatLabel>
                <StatNumber>
                  {githubData ? githubData.followers : "Loading..."}
                </StatNumber>
              </Stat>
            </Box>
            <Box w="300px" p={5} ml={5} mb={3} borderWidth="1px" rounded="lg">
              <Stat>
                <StatLabel>
                  <Text fontSize="xl">Github Repos Starred</Text>
                </StatLabel>
                <StatNumber>
                  {githubData ? githubData.starred : "Loading..."}
                </StatNumber>
              </Stat>
            </Box>
          </Flex> */}
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
                  issueData.output.map((issue: any) => (
                    <IssueCard
                      issueName={issue.title}
                      issueBody={issue.body}
                      issueLabels={issue.labels}
                      issueRepo={issue.html_url}
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
                {issueData ? (
                  issueData.output.map((issue: any) => (
                    <IssueCard
                      issueName={issue.title}
                      issueBody={issue.body}
                      issueLabels={issue.labels}
                      issueRepo={issue.html_url}
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
