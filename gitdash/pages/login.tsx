import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/client";
import { FaGithub } from "react-icons/fa";
import {
  Button,
  Box,
  useColorModeValue,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import React from "react";

export default function Home() {
  const [session, loading] = useSession();

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Box
        bg={useColorModeValue("gray.50", "inherit")}
        minH="100vh"
        py="12"
        px={{ base: "4", lg: "8" }}
      >
        {!session && (
          <>
            <Box maxW="md" mx="auto">
              <Heading textAlign="center" size="xl" fontWeight="extrabold">
                Sign in to your account with Github
              </Heading>

              <SimpleGrid mt="6" columns={1} spacing="3">
                <Button
                  colorScheme="teal"
                  leftIcon={<FaGithub />}
                  onClick={() => signIn("github")}
                >
                  Sign in with GitHub
                </Button>
              </SimpleGrid>
            </Box>
          </>
        )}
        {session && (
          <>
            <Box maxW="md" mx="auto">
              <Heading textAlign="center" size="xl" fontWeight="extrabold">
                Signed in as {session.user?.name} <br />{" "}
              </Heading>

              <SimpleGrid mt="6" columns={1} spacing="3">
                <Button
                  colorScheme="teal"
                  leftIcon={<FaGithub />}
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
              </SimpleGrid>
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
