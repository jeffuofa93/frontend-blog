import { Heading, VStack } from "@chakra-ui/react";

import React, { useEffect, useRef, useState } from "react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import blogService from "./services/blogService";
import Blogs from "./components/Blogs";
import loginService from "./services/loginService";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import AddBlog from "./components/AddBlog";
import Toggleable from "./components/Toggleable";
import userService from "./services/userService";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState("");
  const [color, setColor] = useState("red");
  const [visible, setVisible] = useState(false);
  const blogFormRef = useRef();
  const localStorageKey = "loggedBlogappUser";

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(localStorageKey);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const attemptLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem(localStorageKey, JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
    } catch (exception) {
      handleErrorMessageChange("Wrong Credentials", "red");
    }
  };

  const handleErrorMessageChange = (newMessage, color) => {
    setErrorMessage(newMessage);
    setColor(color);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const increaseLikes = async (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    try {
      const returnedBlog = await blogService.update(id, updatedBlog);
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));
    } catch (exception) {
      handleErrorMessageChange("Error updating blog", "red");
    }
  };

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    try {
      const returnedBlog = await blogService.create(blogObject);
      const updatedBlogs = await blogService.getAll();
      setBlogs(updatedBlogs);
    } catch (exception) {
      handleErrorMessageChange("Cannot post blog", "red");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem(localStorageKey);
    setUser("");
  };

  const handleDeleteClick = async (deleteBlog) => {
    // if (!window.confirm(`Delete ${deleteBlog.name}?`)) return;
    try {
      const isDeleted = await blogService.remove(deleteBlog.id);
      setBlogs(blogs.filter((blog) => blog.id !== deleteBlog.id));
    } catch (exception) {
      handleErrorMessageChange("Error deleting blog", "red");
    }
  };

  const sortedBlogs = blogs.sort((firstBlog, secondBlog) => {
    return secondBlog.likes - firstBlog.likes;
  });

  if (user === "") {
    return (
      <VStack spacing={4} p={8} height="100vh">
        <ColorModeSwitcher alignSelf="flex-end" mr={"8"} isRound={"true"} />
        <Heading
          mb="4"
          fontWeight="extrabold"
          size="2xl"
          bgGradient="linear(to-r,pink.500,pink.300,blue.500)"
          bgClip="text"
        >
          Blogs
        </Heading>
        <Notification message={errorMessage} color={color} />
        <LoginForm attemptLogin={attemptLogin} />
      </VStack>
    );
  }

  return (
    <VStack spacing={4} p={8} height="100vh">
      <ColorModeSwitcher alignSelf="flex-end" mr={"8"} isRound={"true"} />
      <Heading
        mb="4"
        fontWeight="extrabold"
        size="2xl"
        bgGradient="linear(to-r,pink.500,pink.300,blue.500)"
        bgClip="text"
      >
        Blogs
      </Heading>
      <Notification message={errorMessage} color={color} />
      <Logout user={user} handleLogout={handleLogout} />
      <Toggleable
        buttonLabel={"create blog"}
        visible={visible}
        setVisible={setVisible}
        ref={blogFormRef}
      >
        <AddBlog createBlog={createBlog} />
      </Toggleable>
      {visible ? (
        ""
      ) : (
        <Blogs
          blogs={sortedBlogs}
          increaseLikes={increaseLikes}
          handleDeleteClick={handleDeleteClick}
        />
      )}
    </VStack>
  );
};

export default App;
