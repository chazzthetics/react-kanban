import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useBoard } from "../../hooks";
import { logout, selectUser } from "../../features/auth";
import { FiHome, FiSun, FiMoon } from "react-icons/fi";
import { GoMarkGithub } from "react-icons/go";
import {
  SelectBoardInput,
  CreateNewBoardPopover
} from "../../features/boards/components";
import { AppBarIconButton } from "../";
import {
  Flex,
  Heading,
  ButtonGroup,
  Box,
  List,
  ListItem,
  Avatar,
  Link,
  Button,
  useColorMode
} from "@chakra-ui/core";

const AppBar = ({ dashboard }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  //FIXME:REFACTOR
  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login";
  };
  const { colorMode, toggleColorMode } = useColorMode();

  const { color } = useBoard();

  return (
    <Box
      as="header"
      h="40px"
      bg={dashboard ? "gray.700" : `${color}.700`}
      p="4px"
    >
      <Flex as="nav" align="center" justify="space-between" h="100%">
        <List
          d="flex"
          alignItems="center"
          justifyContent="flex-start"
          flexBasis="14rem"
        >
          <ButtonGroup d="flex" spacing={1}>
            <ListItem mr={1}>
              <Link
                as={RouterLink}
                exact
                to={user ? `/${user.id}/boards` : "/"}
              >
                <AppBarIconButton
                  icon={FiHome}
                  label="Go to Dashboard"
                  fontSize="1.3rem"
                />
              </Link>
            </ListItem>
            {!dashboard && (
              <ListItem d="flex" alignItems="center">
                <SelectBoardInput />
              </ListItem>
            )}
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
              <CreateNewBoardPopover />
            </ListItem>
            <ListItem>
              <Link
                href="https://github.com/chazzthetics/react-kanban"
                rel="noopener noreferrer"
                isExternal
              >
                <AppBarIconButton
                  icon={GoMarkGithub}
                  label="Go to Source Code"
                />
              </Link>
            </ListItem>
            <ListItem>
              <AppBarIconButton
                icon={colorMode === "light" ? FiMoon : FiSun}
                label="Change Theme"
                onClick={toggleColorMode}
              />
            </ListItem>
            <ListItem cursor="pointer">
              <Button variant="unstyled" size="sm" onClick={handleLogout}>
                <Avatar
                  name={user && user.name}
                  bg={dashboard ? "green.400" : `${color}.400`}
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

AppBar.propTypes = {
  dashboard: PropTypes.bool.isRequired
};

export default AppBar;
