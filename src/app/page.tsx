import {
  Box,
  Button,
  Container,
  Heading,
  Text,
} from "@chakra-ui/react";
// import Layout from "./components/layout";
import Link from "next/link";

const Index = () => {
  return (

      <Box as='section' py={{ base: 12, md: 20 }}>
        <Container maxW='4xl' textAlign='center'>
          <Heading as='h1' size='4xl' mb={6} lineHeight='tight' fontWeight={"extrabold"}>
            Manage Your Tasks{" "}
            <Text as='span' color='blue.500'>
              Efficiently
            </Text>
          </Heading>
          <Text fontSize='md' color='gray.600' mb={8}>
            Stay organized, boost productivity, and never miss a deadline with
            our powerful task management solution
          </Text>
          <Button colorPalette={"blue"} rounded={"lg"} >
            <Link
              href='/tasks'
              style={{ width: "200px"  }}
            >
              Get Started
            </Link>
          </Button>
        </Container>
      </Box>
    // </Layout>
  );
};

export default Index;
