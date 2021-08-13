import { Box, Heading, Flex, Icon, Text, Button, Link } from "@chakra-ui/react";
import { GoRepo } from "react-icons/go";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { FiGlobe } from "react-icons/fi";
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react"
import axios from "axios";

async function toggleFavourite(
  userId: string,
  repoId: string,
  isFavourite: boolean
) {
  if (!isFavourite) {
    axios
      .post("https://api.gitdash.tech/favourite", {
        userId: userId,
        repoId: repoId,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    axios
      .delete("https://api.gitdash.tech/favourite", {
        data: {
          userId: userId,
          repoId: repoId,
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

export default function RepoCard({
  repoId,
  userId,
  repoName,
  repoOwner,
  description,
  primaryLanguage,
  numStars,
  isFavourite,
}: {
  repoId: string;
  userId: string;
  repoName: string;
  repoOwner: string;
  description: string;
  primaryLanguage: string;
  numStars: number;
  isFavourite: boolean;
}) {
  return (
    <Box borderRadius="lg" backgroundColor="gray.800" m="5">
      <Flex direction="row" justifyContent="space-between" pt={4} pl={4} pr={4}>
        <Flex>
          <Box pr={4}>
            <Icon as={GoRepo}></Icon>
          </Box>
          <Box>
            <Link
              href={`https://github.com/${repoOwner}/${repoName}`}
              target="_blank"
            >
              <Heading fontWeight="800" size="md">
                {`${repoOwner}/${repoName}`}
              </Heading>
            </Link>
          </Box>
        </Flex>
        <Box>
          {isFavourite === true && (
            <Button
              leftIcon={<AiFillStar />}
              variant="ghost"
              onClick={() => toggleFavourite(userId, repoId, isFavourite)}
            >
              Favourite
            </Button>
          )}
          {isFavourite === false && (
            <Button
              leftIcon={<AiOutlineStar />}
              variant="ghost"
              onClick={() => toggleFavourite(userId, repoId, isFavourite)}
            >
              Favourite
            </Button>
          )}
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
