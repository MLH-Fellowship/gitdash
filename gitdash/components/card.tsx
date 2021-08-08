import {
  Heading,
  Box,
  Center,
  Text,
  Stack,
  Tag,
  useColorModeValue,
  Button,
  Link,
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
          {issueBody.slice(0, 100)}...
        </Text>

        <Stack align={"center"} justify={"center"} direction={"row"} mt={"3px"}>
          {issueLabels.map((label: any) => (
            <Tag key={label.id} px={2} py={1} fontWeight={"400"}>
              {label.name}
            </Tag>
          ))}
        </Stack>
        <Link href={issueRepo}>
          <Button
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            bg={"blue.400"}
            color={"white"}
            boxShadow={
              "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            }
            _hover={{
              bg: "blue.500",
            }}
            _focus={{
              bg: "blue.500",
            }}
            mt={"10px"}
          >
            Link
          </Button>
        </Link>
      </Box>
    </Center>
  );
}
