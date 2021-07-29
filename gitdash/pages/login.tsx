import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/client";
import { FaGithub } from "react-icons/fa";
import { Button, Box } from "@chakra-ui/react";

export default function Home() {
  const [session, loading] = useSession();

  return (
    <>
      <Head>
        <title>GitDash</title>
      </Head>
      {/* {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn("github")}>
            <FaGithub>Sign in with GitHub</FaGithub>
            Sign in with GitHub
          </button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )} */}
      <body>
        <Button
          colorScheme="teal"
          leftIcon={<FaGithub />}
          onClick={() => signIn("github")}
        >
          Sign in with GitHub
        </Button>
      </body>
    </>
  );
}
