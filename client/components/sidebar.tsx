import React, { ReactNode } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  Spacer,
  HStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FiHome, FiMenu, FiChevronDown, FiLogIn } from "react-icons/fi";
import { GoRepo, GoStar } from "react-icons/go";
import { IconType } from "react-icons";
import { ReactText } from "react";

import { signOut, useSession } from "next-auth/client";
import NextLink from "next/link";

import SocialCard from "../components/socialcard";

interface LinkItemProps {
  name: string;
  icon: IconType;
  link: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: FiHome, link: "/dashboard" },
  { name: "Repositories", icon: GoRepo, link: "/repos" },
  { name: "Favourites", icon: GoStar, link: "/favourites" },
];

const LinkItemsNotLoggedIn: Array<LinkItemProps> = [
  { name: "Home Page", icon: FiHome, link: "/" },
  { name: "Login", icon: FiLogIn, link: "/login" },
];

export default function Sidebar({
  children,
  pageTitle,
  githubData,
}: {
  children: ReactNode;
  pageTitle: string;
  githubData: any;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [session, loading] = useSession();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
        session={session}
        githubData={githubData}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent
            onClose={onClose}
            session={session}
            githubData={githubData}
          />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} pageTitle={pageTitle} session={session} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  session: any;
  githubData: any;
}

const SidebarContent = ({
  onClose,
  session,
  githubData,
  ...rest
}: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          <NextLink href="/">Git Dash</NextLink>
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      {githubData ? (
        <SocialCard session={session} githubData={githubData} />
      ) : (
        <></>
      )}

      {session
        ? LinkItems.map((links) => (
            <NavItem key={links.name} icon={links.icon} link={links.link}>
              {links.name}
            </NavItem>
          ))
        : LinkItemsNotLoggedIn.map((links) => (
            <NavItem key={links.name} icon={links.icon} link={links.link}>
              {links.name}
            </NavItem>
          ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  link: string;
}
const NavItem = ({ icon, children, link, ...rest }: NavItemProps) => {
  return (
    <NextLink href={link}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </NextLink>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
  pageTitle: string;
  session: any;
}
const MobileNav = ({ onOpen, pageTitle, session, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        {pageTitle}
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
              id="menu-button"
            >
              {session && (
                <HStack>
                  {session?.user?.image && (
                    <Avatar size={"sm"} src={session.user?.image} />
                  )}
                  {!session?.user?.image && <Avatar size={"sm"} />}
                  <Box display={{ base: "none", md: "flex" }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              )}
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem
                onClick={() =>
                  signOut({ callbackUrl: "http://localhost:3000/login" })
                }
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
