import React from "react";
import { FiHome } from "react-icons/fi";
import {
  Flex,
  Heading,
  IconButton,
  Box,
  List,
  ListItem
} from "@chakra-ui/core";
import {
  SelectBoardInput,
  CreateNewBoardForm
} from "../../features/boards/components";

const AppBar = () => {
  return (
    <Box as="header" h="4vh" bg="gray.500" mb="2rem" p="4px">
      <Flex as="nav" align="center" justify="space-between" h="100%">
        <List d="flex" align="center" justify="flex-start" flexBasis="14rem">
          <ListItem mr={1}>
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
        </List>
        <Box>
          <Heading fontSize="1rem">React Kanban</Heading>
        </Box>
        <List d="flex" align="center" justify="flex-end" flexBasis="14rem">
          <ListItem>
            <CreateNewBoardForm />
          </ListItem>
        </List>
      </Flex>
    </Box>
  );
};

export default AppBar;

// TODO: Fix button placements - move create board to end
