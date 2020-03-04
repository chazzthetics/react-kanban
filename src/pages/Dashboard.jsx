import React from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useAuth, useInitialFetch } from "../hooks";
import {
  selectAllBoardsDetails,
  selectStarredBoards
} from "../features/boards/slices";
import { BoardGrid } from "../features/boards/components";
import { AppBar, FullPageSpinner } from "../components";
import { FiUser, FiStar } from "react-icons/fi";
import { Flex } from "@chakra-ui/core";

const Dashboard = () => {
  useAuth();
  useInitialFetch();

  const { loading: dataLoading } = useSelector(state => state.request);
  const allBoards = useSelector(selectAllBoardsDetails);
  const starredBoards = useSelector(selectStarredBoards);

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
        <>
          {/* Starred Boards */}
          {starredBoards.length > 0 && (
            <BoardGrid
              icon={FiStar}
              heading="Starred Boards"
              boards={starredBoards}
              showCreate={false}
            />
          )}

          {/* Personal Boards */}
          <BoardGrid
            icon={FiUser}
            heading="Personal Boards"
            boards={allBoards}
            showCreate={true}
          />
        </>
      )}
    </>
  );
};

export default Dashboard;
