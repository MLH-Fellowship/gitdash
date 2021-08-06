import {
  Heading,
  Box,
  Center,
  Text,
  Stack,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";

function extractRepoName(issueUrl: string) {
  var url = new URL(issueUrl);
  var pathArray = url.pathname.split("/");
  return pathArray[1] + "/" + pathArray[2];
}

export default function IssueCard({
  issueName,
  issueBody,
  issueLabels,
  issueRepo,
}: {
  issueName: string;
  issueBody: string;
  issueLabels: any;
  issueRepo: any;
}) {
  return (
    <Center py={6}>
      <Box
        w={{ base: "320px", md: "450px" }}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {issueName}
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          Repo: {extractRepoName(issueRepo)}
        </Text>
        <Text
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
        >
          {issueBody}
        </Text>

        <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            #art
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            #photography
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            #music
          </Badge>
        </Stack>
      </Box>
    </Center>
  );
}
