"use client";


import Link from "next/link";
import Logo from "./logo";
import { Box, Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { RightDrawer } from "./drawer";

const routes = [
  { name: "Home", path: "/" },
  { name: "Tasks", path: "/tasks" },
];

const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <Box as='header' bg='white' boxShadow='sm'>
      <Container maxW='7xl' px={4} py={4}>
        <Flex justify='space-between' align='center'>
          <Flex align='center' gap={4}>
            <Link href='/' passHref>
              <Logo />
            </Link>
            <HStack as='nav' gap={2}>
              {routes.map((route) => (
                <Button
                  key={route.name}
                  rounded={"md"}
                  asChild
                  variant={route.path === pathname ? "surface" : "plain"}
                >
                  <Link href={route.path} passHref>
                    <Text
                      color='gray.600'
                      _hover={{ color: "gray.700" }}
                      transition='colors 0.2s'
                    >
                      {route.name}
                    </Text>
                  </Link>
                </Button>
              ))}
            </HStack>
          </Flex>

          <RightDrawer>
            <Button variant='outline' size='sm'>
              New Task
            </Button>
          </RightDrawer>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
