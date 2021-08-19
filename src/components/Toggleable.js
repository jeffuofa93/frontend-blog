import React, { useImperativeHandle } from "react";
import { Button, VStack } from "@chakra-ui/react";

const Togglable = React.forwardRef((props, ref) => {
  // const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: props.visible ? "none" : "" };
  const showWhenVisible = { display: props.visible ? "" : "none" };

  const toggleVisibility = () => {
    props.setVisible(!props.visible);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <VStack>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible} align={"center"}>
        {props.children}
        <Button
          onClick={toggleVisibility}
          colorScheme={"pink"}
          px={8}
          alignSelf={"left"}
        >
          cancel
        </Button>
      </div>
    </VStack>
  );
});

export default Togglable;
