import { Box, Heading, Flex, Icon, Text, Button, Link } from "@chakra-ui/react";
import { GoRepo } from "react-icons/go";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { FiGlobe } from "react-icons/fi";

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
    <Box borderRadius="lg" backgroundColor="gray.800" m="5">
      <Flex direction="row" justifyContent="space-between" pt={4} pl={4} pr={4}>
        <Flex>
          <Box pr={4}>
            <Icon as={GoRepo}></Icon>
          </Box>
          <Box>
            <Link href={`https://github.com/${repoOwner}/${repoName}`}>
              <Heading fontWeight="800" size="md">
                {`${repoOwner}/${repoName}`}
              </Heading>
            </Link>
          </Box>
        </Flex>
        <Box>
          <Button leftIcon={<AiOutlineStar />} variant="ghost">
            Favourite
          </Button>
        </Box>
      </Flex>
      <Flex pb={4} pl={4} pr={4}>
        <Text fontSize="md">{description}</Text>
      </Flex>
      <Flex pb={4} pl={4} pr={4}>
        <Text>
          <Icon as={FiGlobe}></Icon>:{" "}
          {primaryLanguage ? primaryLanguage : "Text"}
        </Text>
        <Text ml={4}>
          <Icon as={AiFillStar}></Icon>: {numStars}
        </Text>
      </Flex>
    </Box>
  );
}
