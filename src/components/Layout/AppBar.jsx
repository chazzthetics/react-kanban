import React, { memo } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLightMode } from "../../hooks";
import { selectUser } from "../../features/auth";
import { FiHome, FiSun, FiMoon } from "react-icons/fi";
import { GoMarkGithub } from "react-icons/go";
import {
  SelectBoardInput,
  CreateNewBoardPopover
} from "../../features/boards/components";
import { AppBarIconButton, AvatarButton } from "../";
import {
  Flex,
  Heading,
  ButtonGroup,
  Box,
  List,
  ListItem,
  Link
} from "@chakra-ui/core";
import { selectCurrentBoardColor } from "../../features/boards/slices";

const AppBar = ({ dashboard }) => {
  const [isLightMode, handleColorChange] = useLightMode();
  const user = useSelector(selectUser);
  const color = useSelector(selectCurrentBoardColor);

  return (
    <Box
      as="header"
      bg={dashboard || !isLightMode ? "gray.700" : `${color}.400`}
      h="40px"
      p="4px"
    >
      <Flex as="nav" align="center" justify={{ xs: "space-between" }} h="100%">
        <List
          d="flex"
          alignItems="center"
          justifyContent="flex-start"
          flexBasis={{ sm: "12rem" }}
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
        <Flex>
          <Heading
            fontSize={{ xs: ".8rem", sm: ".9rem", md: "1rem" }}
            letterSpacing=".8px"
            fontWeight="semibold"
            color="#FFF"
          >
            REACT KANBAN
          </Heading>
        </Flex>
        <List
          d="flex"
          alignItems="center"
          justifyContent="flex-end"
          flexBasis={{ sm: "12rem" }}
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
                _focus="none"
                tabIndex={-1}
              >
                <AppBarIconButton
                  icon={GoMarkGithub}
                  label="Go to Source Code"
                />
              </Link>
            </ListItem>
            <ListItem>
              <AppBarIconButton
                icon={isLightMode ? FiMoon : FiSun}
                label="Change Theme"
                color={isLightMode ? "white" : "yellow.300"}
                onClick={handleColorChange}
              />
            </ListItem>
            <ListItem cursor="pointer">
              <AvatarButton
                name={user ? user.name : ""}
                dashboard={dashboard}
                color={color}
              />
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

export default memo(AppBar);
