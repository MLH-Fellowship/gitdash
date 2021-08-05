import {
  Box,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import useSWR from "swr";
import Head from "next/head";
import Sidebar from "../components/sidebar";

async function fetcher(...arg: any) {
  const res = await fetch(arg);

  return res.json();
}

export default function Dashboard() {
  const { data: githubData } = useSWR("/api/github", fetcher);
  const { data: issueData } = useSWR("/api/issues", fetcher);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Sidebar pageTitle="Dashboard">
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
          {/* <Text>{issueData}</Text> */}
        </Flex>
      </Sidebar>
    </>
  );
}
