import { Box, Heading } from "@chakra-ui/react";

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
    <Box maxW="sm" borderRadius="lg" backgroundColor="gray.800" m={5}>
      <Heading>{repoName}</Heading>
    </Box>
  );
}
