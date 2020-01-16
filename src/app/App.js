import React from "react";
import { MainBoard } from "../features/boards/components";
import { useSelector } from "react-redux";
import { selectCurrentBoardId } from "./redux/selectors";

const App = () => {
  const currentBoard = useSelector(selectCurrentBoardId);
  console.log(currentBoard);
  return (
    <div className="App" style={{ padding: "0 5%" }}>
      <h1>React Kanban</h1>
      {currentBoard ? <MainBoard /> : "No boards"}
    </div>
  );
};

export default App;
