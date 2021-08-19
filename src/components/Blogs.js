import { StackDivider, VStack } from "@chakra-ui/react";
import React from "react";
import ToggleBlog from "./ToggleBlog";

const Blogs = ({ blogs, increaseLikes, handleDeleteClick }) => {
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
        <ToggleBlog
          key={blog.id}
          blog={blog}
          increaseLikes={increaseLikes}
          handleDeleteClick={handleDeleteClick}
        >
          {""}
        </ToggleBlog>
      ))}
    </VStack>
  );
};

export default Blogs;
