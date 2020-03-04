import React, { memo, useRef } from "react";
import { useLightMode, useToggle } from "../../../hooks";
import {
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton
} from "@chakra-ui/core";
import { BoardBox, CreateNewBoardForm } from "./";

const CreateNewBoardModal = () => {
  const [isLightMode] = useLightMode();
  const { isOpen, close, open } = useToggle();

  const firstFieldRef = useRef(null);
  //TODO: refactor box
  return (
    <>
      <BoardBox
        backgroundColor={isLightMode ? "gray.300" : "gray.600"}
        onClick={open}
      >
        <Flex align="center" justify="center" h="100%" fontWeight="bold">
          Create new board
        </Flex>
      </BoardBox>

      <Modal isOpen={isOpen} onClose={close} initialFocusRef={firstFieldRef}>
        <ModalOverlay backgroundColor="rgba(0,0,0,0.8)" />
        <ModalContent
          bg={isLightMode ? "#ebecf0" : "gray.700"}
          borderRadius={4}
          px={4}
          pt={2}
          pb={4}
        >
          <ModalHeader fontSize="1rem" textAlign="center" fontWeight="normal">
            Create New Board
          </ModalHeader>
          <ModalCloseButton opacity={0.6} />
          <CreateNewBoardForm
            onClose={close}
            ref={firstFieldRef}
            button={
              <Button
                type="submit"
                size="sm"
                variantColor="purple"
                boxShadow="2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
              >
                Create Board
              </Button>
            }
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default memo(CreateNewBoardModal);
