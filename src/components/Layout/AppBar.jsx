import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth";
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
  Tooltip
} from "@chakra-ui/core";
import {
  SelectBoardInput,
  CreateNewBoardForm
} from "../../features/boards/components";

const AppBar = () => {
  const user = useSelector(selectUser);

  return (
    <Box as="header" h="40px" bg="#4C80A7" p="4px">
      <Flex as="nav" align="center" justify="space-between" h="100%">
        <List
          d="flex"
          alignItems="center"
          justifyContent="flex-start"
          flexBasis="14rem"
        >
          <ButtonGroup d="flex" spacing={1}>
            <Tooltip label="Home" borderRadius={4} placement="bottom">
              <ListItem mr={1}>
                <IconButton
                  aria-label="Go to Home"
                  icon={FiHome}
                  size="sm"
                  fontSize="1.3rem"
                  bg="rgba(0,0,0,.3)"
                  color="#fff"
                  _hover={{ backgroundColor: "rgba(0,0,0,.1)" }}
                />
              </ListItem>
            </Tooltip>
            <ListItem d="flex" alignItems="center">
              <SelectBoardInput />
            </ListItem>
          </ButtonGroup>
        </List>
        <Box>
          <Heading
            fontSize="1rem"
            letterSpacing=".8px"
            fontWeight="semibold"
            color="#FFF"
          >
            REACT KANBAN
          </Heading>
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
            <ListItem>
              <Tooltip label="Source Code" borderRadius={4}>
                <a
                  href="https://github.com/chazzthetics/react-kanban"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton
                    icon={GoMarkGithub}
                    size="sm"
                    bg="rgba(0,0,0,.3)"
                    color="#fff"
                    _hover={{ backgroundColor: "rgba(0,0,0,.1)" }}
                  />
                </a>
              </Tooltip>
            </ListItem>
            <ListItem>
              <Tooltip label="Change Theme" borderRadius={4}>
                <IconButton
                  icon={FiSun}
                  size="sm"
                  bg="rgba(0,0,0,.3)"
                  color="#fff"
                  _hover={{ backgroundColor: "rgba(0,0,0,.1)" }}
                />
              </Tooltip>
            </ListItem>
            <ListItem cursor="pointer">
              <Avatar
                name={user && user.name}
                bg="purple.500"
                color="#fff"
                size="sm"
              />
            </ListItem>
          </ButtonGroup>
        </List>
      </Flex>
    </Box>
  );
};

export default AppBar;

// TODO: keep ListItem?
