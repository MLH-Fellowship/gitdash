import {
  Box,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import Head from "next/head";
import Sidebar from "../components/sidebar";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [issueData, setIssueData] = useState(null);
  const [githubData, setGithubData] = useState(null);

  useEffect(() => {
    axios
      .get("/api/issues")
      .then((res) => res.data)
      .then((data) => setIssueData(data));

    axios
      .get("/api/github")
      .then((res) => res.data)
      .then((data) => setGithubData(data));
  }, []);

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
          <HStack>
            <VStack>
              <Text fontSize="xl">Issues</Text>
              {/* {issueData ? (
                issueData.output.map((issue: any) => {
                  <Box>
                    <Text fontSize="xl">{issue.html_url}</Text>
                    <Text fontSize="xl">{issue.title}</Text>
                    <Text fontSize="xl">{issue.body}</Text>
                  </Box>;
                })
              ) : (
                <></>
              )} */}
              <Text fontSize="xl">{issueData.output[0].html_url}</Text>
              <Text fontSize="xl">{issueData.output[0].title}</Text>
              <Text fontSize="xl">{issueData.output[0].body}</Text>
            </VStack>
            <VStack>
              <Text fontSize="xl">Pull Requests</Text>
            </VStack>
          </HStack>
        </Flex>
      </Sidebar>
    </>
  );
}
