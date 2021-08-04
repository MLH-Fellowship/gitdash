import { ReactNode } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";

const Team = ({ children }: { children: ReactNode }) => {
  return <Box>{children}</Box>;
};

const TeamContent = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"lg"}
      p={8}
      rounded={"xl"}
      align={"center"}
      pos={"relative"}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: "solid transparent",
        borderLeftWidth: 16,
        borderRight: "solid transparent",
        borderRightWidth: 16,
        borderTop: "solid",
        borderTopWidth: 16,
        borderTopColor: useColorModeValue("white", "gray.800"),
        pos: "absolute",
        bottom: "-16px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      {children}
    </Stack>
  );
};

const TeamHeading = ({ children }: { children: ReactNode }) => {
  return (
    <Heading as={"h3"} fontSize={"xl"}>
      {children}
    </Heading>
  );
};

const TeamText = ({ children }: { children: ReactNode }) => {
  return (
    <Text
      textAlign={"center"}
      color={useColorModeValue("gray.600", "gray.400")}
      fontSize={"sm"}
    >
      {children}
    </Text>
  );
};

const TeamAvatar = ({
  src,
  name,
  title,
}: {
  src: string;
  name: string;
  title: string;
}) => {
  return (
    <Flex align={"center"} mt={8} direction={"column"}>
      <Avatar src={src} alt={name} mb={2} />
      <Stack spacing={-1} align={"center"}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize={"sm"} color={useColorModeValue("gray.600", "gray.400")}>
          {title}
        </Text>
      </Stack>
    </Flex>
  );
};

export default function TeamSection() {
  return (
    <Box bg={useColorModeValue("gray.100", "gray.700")}>
      <Container maxW={"7xl"} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={"center"}>
          <Heading>The Team</Heading>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 10, md: 4, lg: 10 }}
        >
          <Team>
            <TeamContent>
              <TeamHeading>Frontend Web Developer</TeamHeading>
              <TeamText>
                My name is Alesana, and I am a Co-founder and Frontend Web
                Developer at Git Dash. I primarily work on making the website as
                performant as possible.
              </TeamText>
            </TeamContent>
            <TeamAvatar
              src={"https://avatars.githubusercontent.com/u/39209557?v=4"}
              name={"Alesana Eteuati Jr"}
              title={"Co-founder at Git Dash"}
            />
          </Team>
          <Team>
            <TeamContent>
              <TeamHeading>Backend Web Developer</TeamHeading>
              <TeamText>
                My name is Prakhar, and I am a Co-founder and Backend Web
                Developer at Git Dash. I primarily work on getting the data
                required for the website from various sources.{" "}
              </TeamText>
            </TeamContent>
            <TeamAvatar
              src={"https://avatars.githubusercontent.com/u/38958532?v=4"}
              name={"Prakhar Rathi"}
              title={"Co-founder at Git Dash"}
            />
          </Team>
          <Team>
            <TeamContent>
              <TeamHeading>Frontend Web Developer</TeamHeading>
              <TeamText>
                My name is Anand, and I am a Co-founder and Frontend Web
                Developer at Git Dash. I primarily work on the UI/UX of the
                website, and try to make it as easy as possible for you to use.
              </TeamText>
            </TeamContent>
            <TeamAvatar
              src={"https://avatars.githubusercontent.com/u/48560219?v=4"}
              name={"Anand Rajaram"}
              title={"Co-founder at Git Dash"}
            />
          </Team>
        </Stack>
      </Container>
    </Box>
  );
}
