import React, { useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  VStack,
} from "@chakra-ui/react";
import loginService from "../services/loginService";
import blogService from "../services/blogService";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username);
    const user = await props.attemptLogin({ username, password });
    if (user) {
      setUsername("");
      setPassword("");
    }
  };
  return (
    <form onSubmit={handleLogin}>
      <VStack spacing={4}>
        <InputGroup>
          <InputLeftAddon children="username:" />
          <Input
            type="text"
            value={username}
            name={"Username"}
            onChange={({ target }) => setUsername(target.value)}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="password:" />
          <Input
            type="password"
            value={password}
            name={"Password"}
            onChange={({ target }) => setPassword(target.value)}
          />
        </InputGroup>
        <Button type="submit" colorScheme={"pink"} px={8}>
          login
        </Button>
      </VStack>
    </form>
  );
};

export default LoginForm;
