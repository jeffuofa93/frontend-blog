import { Box, Link, StackDivider, Text, VStack } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import React from "react";

const Blogs = ({ blogs }) => {
  return (
    <VStack
      divider={<StackDivider />}
      borderColor="gray.100"
      borderWidth="2px"
      p="4"
      borderRadius="lg"
      w="100%"
      maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw" }}
      alignItems="strech"
      justifySelf={"center"}
    >
      {blogs.map((blog) => (
        <VStack key={blog.id} justifySelf={"left"} alignItems={"left"}>
          <Box>
            <Text>
              {" "}
              <b>Blog Title:</b> {blog.title}
            </Text>
          </Box>
          <Box>
            <Text>
              {" "}
              <b>Author</b>: {blog.author}
            </Text>
          </Box>
          <Box>
            <Text>
              {" "}
              <b>URL:</b>{" "}
              <Link href={blog.url} isExternal>
                <ExternalLinkIcon mx={"2px"} />
              </Link>
            </Text>
          </Box>
        </VStack>
      ))}
    </VStack>
  );
};

export default Blogs;
