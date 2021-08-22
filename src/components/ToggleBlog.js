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
import { ArrowUpIcon } from "@chakra-ui/icons";
import ConfirmDeleteButton from "./ConfirmDeleteButton";

const ToggleBlog = (props) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="blogContainer">
      <PlainView
        hideWhenVisible={hideWhenVisible}
        title={props.blog.title}
        toggleVisibility={toggleVisibility}
      />
      <ExpandedView
        showWhenVisible={showWhenVisible}
        toggleVisibility={toggleVisibility}
        blog={props.blog}
        handleDeleteClick={props.handleDeleteClick}
        increaseLikes={props.increaseLikes}
      />
    </div>
  );
};

const PlainView = ({ hideWhenVisible, toggleVisibility, title }) => {
  return (
    <div style={hideWhenVisible}>
      <HStack justifySelf={"left"} alignItems={"left"}>
        <Text>{title}</Text>
        <Spacer />
        <ToggleButton label={"View"} toggleVisibility={toggleVisibility} />
      </HStack>
    </div>
  );
};

const ExpandedView = ({
  showWhenVisible,
  blog,
  toggleVisibility,
  increaseLikes,
  handleDeleteClick,
}) => {
  return (
    <div style={showWhenVisible} className="expandedBlog">
      <VStack alignItems={"left"}>
        <HStack>
          <BlogLine label={"Title"} content={blog.title} />
          <Spacer />
          <ToggleButton label={"Hide"} toggleVisibility={toggleVisibility} />
        </HStack>
        <BlogLine label={"Author"} content={blog.author} />
        <Likes blog={blog} increaseLikes={increaseLikes} />
        <BlogLine label={"User"} content={blog.user.name} />
        <URL blog={blog} />
        <Box>
          <ConfirmDeleteButton
            blog={blog}
            handleDeleteClick={handleDeleteClick}
          />
        </Box>
      </VStack>
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
        className="expandOrCollapseBlogButton"
      >
        {label}
      </Button>
    </>
  );
};

const Likes = ({ blog, increaseLikes }) => {
  return (
    <HStack>
      <Box>
        <Text className="numberOfLikes">
          <b>Likes: </b>
          {blog.likes}
        </Text>
      </Box>
      <IconButton
        className="likeButton"
        aria-label="temp"
        icon={<ArrowUpIcon />}
        onClick={() => increaseLikes(blog.id)}
      />
    </HStack>
  );
};

const URL = ({ blog }) => {
  return (
    <>
      <Box>
        <Text>
          <b>URL: </b>
          <Link href={blog.url} isExternal>
            <ExternalLinkIcon mx={"2px"} />
          </Link>
        </Text>
      </Box>
    </>
  );
};

export default ToggleBlog;
