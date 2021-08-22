import React, { useImperativeHandle } from "react";
import { Button, VStack } from "@chakra-ui/react";
import PropTypes from "prop-types";

const Togglable = React.forwardRef(
  ({ buttonLabel, children, setVisible, visible }, ref) => {
    // const [visible, setVisible] = useState(false);

    Togglable.propTypes = {
      buttonLabel: PropTypes.string.isRequired,
    };

    const hideWhenVisible = { display: visible ? "none" : "" };
    const showWhenVisible = { display: visible ? "" : "none" };

    const toggleVisibility = () => {
      setVisible(!visible);
    };

    useImperativeHandle(ref, () => {
      return { toggleVisibility };
    });

    return (
      <VStack>
        <div style={hideWhenVisible}>
          <Button onClick={toggleVisibility} id="createBlogButton">
            {buttonLabel}
          </Button>
        </div>
        <div style={showWhenVisible} align={"center"}>
          {children}
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
  }
);

Togglable.displayName = "Togglable";

export default Togglable;
