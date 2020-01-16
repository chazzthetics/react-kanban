import React from "react";
import { MainBoard } from "../features/boards/components";

const App = () => {
  return (
    <div className="App" style={{ padding: "0 5%" }}>
      <h1>React Kanban</h1>
      <MainBoard />
    </div>
  );
};

export default App;
