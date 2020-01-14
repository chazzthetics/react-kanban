import React from "react";
import { ColumnItem } from "../features/columns/components";
import { TaskItem } from "../features/tasks/components";

const App = () => {
  return (
    <div className="App" style={{ padding: "10%" }}>
      <h1>App</h1>
      <ColumnItem />
      <br />
      <TaskItem />
    </div>
  );
};

export default App;
