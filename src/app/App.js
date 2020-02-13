import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import { BoardsPage, HomePage, LoginPage, RegisterPage } from "../pages";

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <nav
            style={{
              display: "flex",
              justifyContent: "space-between",
              border: "1px solid blue",
              padding: "1rem"
            }}
          >
            {/* Temp Navbar */}
            <NavLink exact to="/">
              Home
            </NavLink>
            <NavLink exact to="/login">
              Login
            </NavLink>
            <NavLink exact to="/register">
              Register
            </NavLink>
            <NavLink exact to="/app">
              Boards
            </NavLink>
            {/* *********** */}
          </nav>
          <HomePage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/app">
          <BoardsPage />
        </Route>
      </Switch>
    </>
  );
};

export default App;
