import { Box, Flex, Stat, StatLabel, StatNumber, Text } from "@chakra-ui/react";
import useSWR from "swr";
import Head from "next/head";
import Sidebar from "../components/sidebar";

async function fetcher(...arg: any) {
  const res = await fetch(arg);

  return res.json();
}

export default function Dashboard() {
  const { data } = useSWR("/api/github", fetcher);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Sidebar pageTitle="Dashboard">
        <Box mt={5}>
          <Flex justify="center">
            {/* Add boxes for each display */}
            <Box w="300px" p={5} ml={5} mb={3} borderWidth="1px" rounded="lg">
              <Stat>
                <StatLabel>
                  <Text fontSize="xl">Github Stars</Text>
                </StatLabel>
                <StatNumber>{data ? data.stars : "Loading..."}</StatNumber>
              </Stat>
            </Box>
            <Box w="300px" p={5} ml={5} mb={3} borderWidth="1px" rounded="lg">
              <Stat>
                <StatLabel>
                  <Text fontSize="xl">Github Followers</Text>
                </StatLabel>
                <StatNumber>{data ? data.followers : "Loading..."}</StatNumber>
              </Stat>
            </Box>
            <Box w="300px" p={5} ml={5} mb={3} borderWidth="1px" rounded="lg">
              <Stat>
                <StatLabel>
                  <Text fontSize="xl">Github Repos Starred</Text>
                </StatLabel>
                <StatNumber>{data ? data.starred : "Loading..."}</StatNumber>
              </Stat>
            </Box>
          </Flex>
        </Box>
      </Sidebar>
    </>
  );
}
