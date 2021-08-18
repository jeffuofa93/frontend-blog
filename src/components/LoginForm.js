import React from "react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  VStack,
} from "@chakra-ui/react";

const LoginForm = ({
  setUsername,
  username,
  handleLogin,
  password,
  setPassword,
}) => {
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
