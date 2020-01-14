import React from "react";
import { BoardItem } from "../features/boards/components";
import { ColumnItem } from "../features/columns/components";
import { TaskItem } from "../features/tasks/components";

const App = () => {
  return (
    <div className="App" style={{ padding: "10%" }}>
      <h1>App</h1>
      <BoardItem />
      <br />
      <ColumnItem />
      <br />
      <TaskItem />
    </div>
  );
};

export default App;
