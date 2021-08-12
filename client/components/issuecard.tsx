import {
  Box,
  Flex,
  Heading,
  Text,
  Link,
  Avatar,
  Icon,
  Tag,
} from "@chakra-ui/react";
import { GoMilestone } from "react-icons/go";

function extractRepoName(issueUrl: string) {
  var url = new URL(issueUrl);
  var pathArray = url.pathname.split("/");
  return pathArray[1] + "/" + pathArray[2];
}

export default function IssueCard({
  issueName,
  issueBody,
  issueLabels,
  issueNumber,
  issueRepo,
  issueAvatar,
  issueUser,
}: {
  issueName: string;
  issueBody: string;
  issueLabels: any;
  issueNumber: number;
  issueRepo: string;
  issueAvatar: string;
  issueUser: string;
}) {
  return (
    <Flex
      w="sm"
      flexDirection="column"
      borderRadius="lg"
      backgroundColor="gray.800"
      m="5"
    >
      <Box mt={5} ml={5} mr={5}>
        <Text fontSize="xs">{extractRepoName(issueRepo)}</Text>
      </Box>
      <Flex ml={5} mr={5} justifyContent="space-between">
        <Link href={issueRepo} target="_blank">
          <Heading size="lg">{`#${issueNumber} ${issueName}`}</Heading>
        </Link>
        <Avatar src={issueAvatar} size="sm" />
      </Flex>
      <Flex ml={5} mr={5} mt={2}>
        <Flex>
          {issueLabels ? (
            issueLabels.map((label: any) => (
              <Tag
                key={label.id}
                size="sm"
                mr={2}
                backgroundColor={`#${label.color}`}
                color="black"
              >
                {label.name}
              </Tag>
            ))
          ) : (
            <></>
          )}
        </Flex>
      </Flex>
      <Flex ml={5} mr={5} mb={5} mt={2}>
        <Text>{issueBody}</Text>
      </Flex>
    </Flex>
  );
}
