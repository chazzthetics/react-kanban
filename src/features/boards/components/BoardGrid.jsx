import React, { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeBoard } from "../slices";
import { slugify } from "../../../utils/slugify";
import { BoardBox, StarBoardButton, CreateNewBoardModal } from "../components";
import { SimpleGrid, Flex, Box, Heading } from "@chakra-ui/core";

const BoardGrid = ({ icon, heading, boards, showCreate = false }) => {
  const dispatch = useDispatch();

  const handleBoardChange = useCallback(
    boardId => {
      dispatch(changeBoard(boardId));
    },
    [dispatch]
  );

  return (
    <Box
      mx="auto"
      px={{ xs: "5%", sm: "5%", md: "10%", lg: "12%", xl: "25%" }}
      h="100%"
      mb={6}
    >
      <Flex align="center" mt={{ xs: 6, sm: 12 }}>
        <Box as={icon} mr={2} size="24px" />
        <Heading as="h2" size="sm">
          {heading}
        </Heading>
      </Flex>
      <SimpleGrid
        columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        overflowX="auto"
        spacing={4}
        py={4}
      >
        {boards &&
          boards.map(board => (
            <Link key={board.id} to={`/b/${board.id}/${slugify(board.title)}`}>
              <BoardBox
                backgroundColor={`${board.color}.400`}
                position="relative"
                onClick={() => handleBoardChange(board.id)}
              >
                <Flex
                  p={2}
                  bg={`${board.color}.500`}
                  borderRadius="4px 4px 0 0"
                  justify="space-between"
                  align="center"
                >
                  <Heading as="h4" color="white" size="sm" fontSize=".9rem">
                    {board.title}
                  </Heading>
                </Flex>
                <StarBoardButton
                  position="absolute"
                  bottom={0}
                  right={0}
                  _focus={{ boxShadow: "none" }}
                  boardId={board.id}
                  isStarred={board.isStarred}
                />
              </BoardBox>
            </Link>
          ))}
        {showCreate && <CreateNewBoardModal />}
      </SimpleGrid>
    </Box>
  );
};

BoardGrid.propTypes = {
  icon: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
  boards: PropTypes.array.isRequired,
  showCreate: PropTypes.bool.isRequired
};

export default memo(BoardGrid);
