import React, { useCallback } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAuth, useInitialFetch, useLightMode } from "../hooks";
import {
  selectAllBoardsWithTitleAndColor,
  changeBoard
} from "../features/boards/slices";
import { slugify } from "../utils/slugify";
import { CreateNewBoardModal } from "../features/boards/components";
import { AppBar, FullPageSpinner } from "../components";
import { SimpleGrid, Flex, Box, PseudoBox, Heading } from "@chakra-ui/core";
import { FiUser } from "react-icons/fi";

const Dashboard = () => {
  const dispatch = useDispatch();

  useAuth();
  useInitialFetch();

  const { loading: dataLoading } = useSelector(state => state.request);
  const allBoards = useSelector(selectAllBoardsWithTitleAndColor);

  const handleBoardChange = useCallback(
    boardId => {
      dispatch(changeBoard({ boardId }));
    },
    [dispatch]
  );

  const [isLightMode] = useLightMode();
  //FIXME: styling/grid
  return (
    <>
      <Helmet>
        <title>Dashboard | React Kanban</title>
      </Helmet>
      {/* {user && <p>Welcome {user.name}</p>} make notification toast */}
      <AppBar dashboard={true} />
      {dataLoading ? (
        <Flex align="center" justify="center" h="35vh" overflow="hidden">
          <FullPageSpinner height="35vh" />
        </Flex>
      ) : (
        <Box
          mx="auto"
          px={{ xs: "5%", sm: "5%", md: "10%", lg: "12%", xl: "20%" }}
          h="100%"
          mb={6}
        >
          <Flex align="center" mt={{ xs: 6, sm: 12 }} mb={6}>
            <Box as={FiUser} mr={2} size="24px" />
            <Heading as="h2" size="sm">
              Personal Boards
            </Heading>
          </Flex>
          <SimpleGrid
            columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
            overflowX="auto"
            spacing={4}
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
                    w="100%"
                    d="inline-block"
                    borderRadius={4}
                    bg={`${board.color}.400`}
                    _hover={{
                      boxShadow: isLightMode
                        ? "2px 12px 14px -10px rgba(0, 0, 0, 0.75)"
                        : "2px 10px 6px -8px rgba(255, 255, 255, 0.55)"
                    }}
                    transition="transform 150ms ease-in, box-shadow 150ms ease-in"
                  >
                    <Flex
                      p={2}
                      bg={`${board.color}.500`}
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
            <CreateNewBoardModal />
          </SimpleGrid>
        </Box>
      )}
    </>
  );
};

export default Dashboard;
