import {
  Box,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  VStack,
  HStack,
  Center,
  Spinner,
  Divider,
} from "@chakra-ui/react";
import Head from "next/head";
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

export default function Dashboard() {
  const { data: githubData } = useSWR("/api/github", fetcher);
  const { data: issueData } = useSWR("/api/issues", fetcher);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      {githubData ? (
        <Sidebar pageTitle="Dashboard" githubData={githubData}>
          <Flex justify="center" wrap="wrap" mt={5}>
            <Box w="300px" p={5} ml={5} mb={3} borderWidth="1px" rounded="lg">
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
          </Flex>
          <Flex justify="center" wrap="wrap" mt={5}>
            <HStack>
              <VStack>
                <Text fontSize="xl">Issues</Text>
                {issueData ? (
                  <Text>{issueData?.output[0].body}</Text>
                ) : (
                  <Spinner size="xl" />
                )}
              </VStack>
              <VStack>
                <Text fontSize="xl">Pull Requests</Text>
              </VStack>
            </HStack>
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
