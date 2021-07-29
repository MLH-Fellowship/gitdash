import { ReactElement } from "react";
import {
  Box,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  Flex,
  Container,
} from "@chakra-ui/react";
import { FcApproval, FcFlashOn, FcIphone } from "react-icons/fc";

interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={"gray.100"}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={"gray.600"}>{text}</Text>
    </Stack>
  );
};

export default function Features() {
  return (
    <Container maxW={"7xl"}>
      <Box p={4}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <Feature
            icon={<Icon as={FcApproval} w={10} h={10} />}
            title={"Easy to use"}
            text={
              "An intuitive website design, and easy to use UI ensures that everyone from a 16 year old student to a 60 year old developer can understand what to do."
            }
          />
          <Feature
            icon={<Icon as={FcFlashOn} w={10} h={10} />}
            title={"Fast"}
            text={
              "All you need to do to get started is to just sign in with GitHub and see your dashboard in all its glory. It's just one click!"
            }
          />
          <Feature
            icon={<Icon as={FcIphone} w={10} h={10} />}
            title={"Responsive"}
            text={
              "You can expect the same, world class experience, wherever you access the website from, whether it is your tablet, your mobile phone, or your desktop computer."
            }
          />
        </SimpleGrid>
      </Box>
    </Container>
  );
}
