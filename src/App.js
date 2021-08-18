import { Heading, VStack } from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import blogService from "./services/blogService";
import Blogs from "./components/Blogs";
import loginService from "./services/loginService";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import AddBlog from "./components/AddBlog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });
  const [color, setColor] = useState("red");
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

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username);
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem(localStorageKey, JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
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

  const addBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    };
    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      setNewBlog({ title: "", author: "", url: "" });
      handleErrorMessageChange(
        `New Blog! ${returnedBlog.title} by ${returnedBlog.author} added`,
        "green"
      );
    } catch (exception) {
      handleErrorMessageChange("Cannot post blog", "red");
    }
  };

  const loginForm = () => (
    <LoginForm
      password={password}
      handleLogin={handleLogin}
      setPassword={setPassword}
      username={username}
      setUsername={setUsername}
    />
  );

  const handleLogout = () => {
    window.localStorage.removeItem(localStorageKey);
    setUser("");
  };

  const handleBlogChange = (event) => {
    const value = event.target.value;
    setNewBlog({ ...newBlog, [event.target.name]: value });
  };

  console.log(newBlog);

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
        {loginForm()}
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
      <AddBlog
        addBlog={addBlog}
        handleBlogChange={handleBlogChange}
        newBlog={newBlog}
      />
      <Blogs blogs={blogs} />
    </VStack>
  );
};

export default App;

/*
function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Logo h="40vmin" pointerEvents="none" />
            <Text>
              Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
            </Text>
            <Link
              color="teal.500"
              href="https://chakra-ui.com"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Chakra
            </Link>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}
 */
