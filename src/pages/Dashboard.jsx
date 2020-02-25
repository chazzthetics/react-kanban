import React, { useCallback } from "react";
import { Helmet } from "react-helmet";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAuth, useBoard, useLightMode } from "../hooks";
import { changeBoard } from "../features/boards/slices";
import { slugify } from "../utils/slugify";
import { AppBar, FullPageSpinner } from "../components";
import { Grid, Flex, Box, PseudoBox, Heading } from "@chakra-ui/core";
import { FiUser } from "react-icons/fi";

const Dashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { user, loading: userLoading } = useAuth();
  const { loading: dataLoading } = useSelector(state => state.request);

  const { allBoards } = useBoard();

  const handleBoardChange = useCallback(
    boardId => {
      dispatch(changeBoard({ boardId }));
    },
    [dispatch]
  );

  const [isLightMode] = useLightMode();

  return (
    <>
      <Helmet>
        <title>Dashboard | React Kanban</title>
      </Helmet>
      {/* {user && <p>Welcome {user.name}</p>} make notification toast */}
      <AppBar dashboard={true} />
      {userLoading || dataLoading ? (
        <Flex align="center" justify="center" h="35vh" overflow="hidden">
          <FullPageSpinner height="35vh" />
        </Flex>
      ) : (
        <Grid
          mx="auto"
          px="20%"
          h="100%"
          gridTemplateColumns="1fr 3fr"
          pt={16}
          gridColumnGap={8}
          gridRowGap={2}
        >
          <Box flexDir="column" border="1px solid black">
            SIDENAV
          </Box>

          <Flex align="center" my={2}>
            <Box as={FiUser} mr={2} size="24px" />
            <Heading as="h2" size="sm">
              Personal Boards
            </Heading>
          </Flex>
          <Grid
            gridTemplateColumns="repeat(4, 1fr)"
            gridColumn="2 / 3"
            gridGap={4}
          >
            {allBoards &&
              allBoards.map(board => (
                <Link
                  key={board.id}
                  to={`/b/${board.id}/${slugify(board.title)}`}
                  onClick={() => handleBoardChange(board.id)}
                >
                  <PseudoBox
                    h={100}
                    w={200}
                    d="inline-block"
                    borderRadius={4}
                    bg={
                      isLightMode ? `${board.color}.700` : `${board.color}.500`
                    }
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: isLightMode
                        ? "2px 12px 14px -10px rgba(0, 0, 0, 0.75)"
                        : "2px 10px 6px -8px rgba(255, 255, 255, 0.55)"
                    }}
                    transition="transform 175ms ease-in, box-shadow 175ms ease-in"
                  >
                    <Flex
                      p={2}
                      bg={`${board.color}.600`}
                      borderRadius="4px 4px 0 0"
                      justify="space-between"
                      align="center"
                    >
                      <Heading as="h4" color="white" size="sm">
                        {board.title}
                      </Heading>
                    </Flex>
                  </PseudoBox>
                </Link>
              ))}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Dashboard;
