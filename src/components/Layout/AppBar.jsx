import React from "react";
import { FiHome, FiCode } from "react-icons/fi";
import {
  Flex,
  Heading,
  ButtonGroup,
  IconButton,
  Box,
  List,
  ListItem,
  Avatar
} from "@chakra-ui/core";
import {
  SelectBoardInput,
  CreateNewBoardForm
} from "../../features/boards/components";

const AppBar = () => {
  return (
    <Box as="header" h="40px" bg="gray.400" p="4px">
      <Flex as="nav" align="center" justify="space-between" h="100%">
        <List
          d="flex"
          alignItems="center"
          justifyContent="flex-start"
          flexBasis="14rem"
        >
          <ButtonGroup d="flex" spacing={1}>
            <ListItem>
              <IconButton
                aria-label="Go to Home"
                icon={FiHome}
                size="sm"
                fontSize="1.3rem"
              />
            </ListItem>
            <ListItem>
              <SelectBoardInput />
            </ListItem>
          </ButtonGroup>
        </List>
        <Box>
          <Heading fontSize="1rem">React Kanban</Heading>
        </Box>
        <List
          d="flex"
          alignItems="center"
          justifyContent="flex-end"
          flexBasis="14rem"
        >
          <ButtonGroup d="flex" spacing={1}>
            <ListItem>
              <CreateNewBoardForm />
            </ListItem>
            {/* Temporary placeholders */}
            <ListItem>
              <IconButton icon={FiCode} size="sm" />
            </ListItem>
            <ListItem>
              <IconButton icon="question" size="sm" />
            </ListItem>
            <ListItem cursor="pointer">
              <Avatar name="C L" size="sm" />
            </ListItem>
            {/* ********************** */}
          </ButtonGroup>
        </List>
      </Flex>
    </Box>
  );
};

export default AppBar;

// TODO: keep ListItem?
