import React, { useState } from "react";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Link,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { FaArrowUp } from "react-icons/all";
import AlertButton from "./AlertButton";

const ToggleBlog = (props) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  // console.log(props.user);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <HStack justifySelf={"left"} alignItems={"left"}>
          <Text>{props.blog.title}</Text>
          <Spacer />
          <ToggleButton label={"View"} toggleVisibility={toggleVisibility} />
        </HStack>
      </div>
      <div style={showWhenVisible}>
        <VStack alignItems={"left"}>
          <HStack>
            <BlogLine label={"Title"} content={props.blog.title} />
            <Spacer />
            <ToggleButton label={"Hide"} toggleVisibility={toggleVisibility} />
          </HStack>
          <BlogLine label={"Author"} content={props.blog.author} />
          <HStack>
            <Box>
              <Text>
                <b>Likes: </b>
                {props.blog.likes}
              </Text>
            </Box>
            <IconButton
              aria-label="temp"
              icon={<FaArrowUp />}
              onClick={() => props.increaseLikes(props.blog.id)}
            />
          </HStack>
          <BlogLine label={"User"} content={props.blog.user.name} />
          <Box>
            <Text>
              <b>URL: </b>
              <Link href={props.blog.url} isExternal>
                <ExternalLinkIcon mx={"2px"} />
              </Link>
            </Text>
          </Box>
          <Box>
            <AlertButton
              blog={props.blog}
              handleDeleteClick={props.handleDeleteClick}
            />
          </Box>
        </VStack>
      </div>
    </div>
  );
};

const BlogLine = ({ label, content }) => {
  return (
    <Box>
      <Text>
        <b>{label}: </b>
        {content}
      </Text>
    </Box>
  );
};

const ToggleButton = ({ label, toggleVisibility }) => {
  return (
    <>
      <Button
        colorScheme={"pink"}
        px={8}
        alignSelf={"left"}
        onClick={toggleVisibility}
      >
        {label}
      </Button>
    </>
  );
};

export default ToggleBlog;
