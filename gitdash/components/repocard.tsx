import { Box, Heading, Flex, Icon } from "@chakra-ui/react";
import { GoRepo, GoStar } from "react-icons/go";

export default function RepoCard({
  repoName,
  repoOwner,
  description,
  primaryLanguage,
  numStars,
}: {
  repoName: string;
  repoOwner: string;
  description: string;
  primaryLanguage: string;
  numStars: number;
}) {
  return (
    <Box>
      <Flex borderRadius="lg" backgroundColor="gray.800" m={5}>
        <Box mt="1" p="4">
          <Icon as={GoRepo}></Icon>
        </Box>
        <Box mt="1" pt="4">
          <Heading fontWeight="800" size="md">
            {repoName}
          </Heading>
        </Box>
      </Flex>
    </Box>
  );
}
