import {
  Box,
  Heading,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import useSWR from "swr";
import { useEffect, useState } from "react";

//
async function fetcher(...arg: any) {
  const res = await fetch(arg);

  return res.json();
}

export default function dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    setData(useSWR("/api/github", fetcher));
  });

  return (
    <>
      <Box mt={5}>
        <Heading as="h1" textAlign="center" size="2xl" mb={5}>
          Your Dashboard
        </Heading>
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
    </>
  );
}
