import { Box, StackDivider, Text, VStack } from "@chakra-ui/react";
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
              <b>URL:</b> {blog.url}
            </Text>
          </Box>
          <Box>
            <Text>
              {" "}
              <b>Author</b>: {blog.author}
            </Text>
          </Box>
          {/*<IconButton aria-label="temp" icon={<BiShow />} isRound="true" />*/}
        </VStack>
      ))}
    </VStack>
  );
};

export default Blogs;
