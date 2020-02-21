import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth, useBoard } from "../hooks";
import { changeBoard } from "../features/boards/slices";
import { slugify } from "../utils/slugify";
import { AppBar } from "../components";
import { Grid, Box, Heading } from "@chakra-ui/core";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { user } = useAuth();

  const { allBoards } = useBoard();

  const handleBoardChange = boardId => {
    dispatch(changeBoard({ boardId }));
  };

  return (
    <>
      <Helmet>
        <title>Dashboard | React Kanban</title>
      </Helmet>

      <AppBar dashboard={true} />
      <Heading as="h1">Dashboard</Heading>
      {user && <p>Welcome {user.name}</p>}
      <Grid
        templateColumns="repeat(4, 1fr)"
        px="10%"
        mx="auto"
        border="1px solid red"
      >
        {allBoards &&
          allBoards.map(board => (
            <Link
              key={board.id}
              to={`/b/${board.id}/${slugify(board.title)}`}
              onClick={() => handleBoardChange(board.id)}
            >
              <Box h={250} w={250} border="1px solid black">
                {board.id} | {board.title}
              </Box>
            </Link>
          ))}
      </Grid>
    </>
  );
};

export default Dashboard;
