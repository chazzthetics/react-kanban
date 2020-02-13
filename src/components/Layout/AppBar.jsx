import React from "react";
import { useSelector } from "react-redux";
import { FiHome, FiSun } from "react-icons/fi";
import { GoMarkGithub } from "react-icons/go";
import {
  Flex,
  Heading,
  ButtonGroup,
  IconButton,
  Box,
  List,
  ListItem,
  Avatar,
  Tooltip,
  Spinner
} from "@chakra-ui/core";
import {
  SelectBoardInput,
  CreateNewBoardForm
} from "../../features/boards/components";

const AppBar = () => {
  const { loading } = useSelector(state => state.request);
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
            <Tooltip label="Home" borderRadius={4} placement="bottom">
              <ListItem mr={loading ? 4 : 1}>
                <IconButton
                  aria-label="Go to Home"
                  icon={FiHome}
                  size="sm"
                  fontSize="1.3rem"
                />
              </ListItem>
            </Tooltip>
            <ListItem d="flex" alignItems="center">
              {loading ? (
                <Spinner thickness="3px" speed="0.65s" color="blue.500" />
              ) : (
                <SelectBoardInput />
              )}
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
            <Tooltip label="Create Board" borderRadius={4}>
              <ListItem mr={1}>
                <CreateNewBoardForm />
              </ListItem>
            </Tooltip>
            {/* Temporary placeholders */}
            <ListItem>
              <Tooltip label="Source Code" borderRadius={4}>
                <a
                  href="https://github.com/chazzthetics/react-kanban"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton icon={GoMarkGithub} size="sm" />
                </a>
              </Tooltip>
            </ListItem>
            <ListItem>
              <Tooltip label="Change Theme" borderRadius={4}>
                <IconButton icon={FiSun} size="sm" />
              </Tooltip>
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
