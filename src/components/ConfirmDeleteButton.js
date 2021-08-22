import React, { useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

const ConfirmDeleteButton = ({ handleDeleteClick, blog }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  const handleClick = (handleDeleteClick, blog) => {
    handleDeleteClick(blog);
    setIsOpen(false);
  };

  return (
    <>
      <Button
        className="outerDeleteButton"
        colorScheme="red"
        onClick={() => setIsOpen(true)}
      >
        Delete Blog
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Blog
            </AlertDialogHeader>

            <AlertDialogBody>Delete {blog.title}?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => handleClick(handleDeleteClick, blog)}
                ml={3}
                id="confirmDeleteButton"
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ConfirmDeleteButton;
