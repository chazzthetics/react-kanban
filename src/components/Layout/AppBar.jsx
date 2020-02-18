import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logout } from "../../features/auth";
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
  Link,
  Button
} from "@chakra-ui/core";
import {
  SelectBoardInput,
  CreateNewBoardForm
} from "../../features/boards/components";

const AppBar = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login";
  };
  //FIXME: HOME link dispatches
  return (
    <Box as="header" h="40px" bg="#39729f" p="4px">
      <Flex as="nav" align="center" justify="space-between" h="100%">
        <List
          d="flex"
          alignItems="center"
          justifyContent="flex-start"
          flexBasis="14rem"
        >
          <ButtonGroup d="flex" spacing={1}>
            <ListItem mr={1}>
              <Link as={RouterLink} to="/dashboard">
                <IconButton
                  aria-label="Go to Home"
                  icon={FiHome}
                  size="sm"
                  fontSize="1.3rem"
                  bg="rgba(0,0,0,.3)"
                  color="#fff"
                  _hover={{ backgroundColor: "rgba(0,0,0,.1)" }}
                />
              </Link>
            </ListItem>
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
            <ListItem mr={1}>
              <CreateNewBoardForm />
            </ListItem>
            <ListItem>
              <Link
                href="https://github.com/chazzthetics/react-kanban"
                rel="noopener noreferrer"
                isExternal
              >
                <IconButton
                  icon={GoMarkGithub}
                  size="sm"
                  bg="rgba(0,0,0,.3)"
                  color="#fff"
                  _hover={{ backgroundColor: "rgba(0,0,0,.1)" }}
                />
              </Link>
            </ListItem>
            <ListItem>
              <IconButton
                icon={FiSun}
                size="sm"
                bg="rgba(0,0,0,.3)"
                color="#fff"
                _hover={{ backgroundColor: "rgba(0,0,0,.1)" }}
              />
            </ListItem>
            <ListItem cursor="pointer">
              <Button variant="unstyled" size="sm" onClick={handleLogout}>
                <Avatar
                  name={user && user.name}
                  bg="purple.500"
                  color="#fff"
                  size="sm"
                />
              </Button>
            </ListItem>
          </ButtonGroup>
        </List>
      </Flex>
    </Box>
  );
};

export default AppBar;
