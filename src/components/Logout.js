import React from "react";
import { Button, HStack, Text } from "@chakra-ui/react";

const Logout = ({ user, handleLogout }) => {
  return (
    <HStack>
      <Text>{user.name} logged-in</Text>
      <Button colorScheme={"pink"} px={8} onClick={handleLogout}>
        logout
      </Button>
    </HStack>
  );
};

export default Logout;
