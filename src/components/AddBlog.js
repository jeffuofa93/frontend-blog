import React, { useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  VStack,
} from "@chakra-ui/react";

const AddBlog = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const handleBlogChange = (event) => {
    const value = event.target.value;
    setNewBlog({ ...newBlog, [event.target.name]: value });
  };

  const addBlog = async (event) => {
    event.preventDefault();
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    });

    setNewBlog({ title: "", author: "", url: "" });
  };

  return (
    <form onSubmit={addBlog}>
      <VStack p={8} spacing={4}>
        <InputGroup>
          <InputLeftAddon children="title:" />
          <Input
            type="text"
            value={newBlog.title}
            variant={"filled"}
            onChange={handleBlogChange}
            name="title"
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="author:" />
          <Input
            type="text"
            value={newBlog.author}
            variant={"filled"}
            onChange={handleBlogChange}
            name="author"
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="url:" />
          <Input
            type="text"
            value={newBlog.url}
            variant={"filled"}
            onChange={handleBlogChange}
            name="url"
          />
        </InputGroup>
        <Button type="submit" colorScheme={"pink"} px={8} alignSelf={"left"}>
          add blog
        </Button>
      </VStack>
    </form>
  );
};

export default AddBlog;
