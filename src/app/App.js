import React from "react";
import { MainBoard } from "../features/boards/components";
import { TaskList } from "../features/tasks/components";

const App = () => {
  return (
    <div className="App" style={{ padding: "10%" }}>
      <h1>App</h1>
      <MainBoard />
      <br />
      <br />
      <TaskList />
    </div>
  );
};

export default App;
