import {
  Heading,
  Box,
  Center,
  Text,
  Stack,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";

export default function IssueCard({
  issueName,
  issueBody,
  issueLabels,
}: {
  issueName: string;
  issueBody: string;
  issueLabels: any;
}) {
  return (
    <Center py={6}>
      <Box
        w={"320px"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {issueName}
        </Heading>
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
