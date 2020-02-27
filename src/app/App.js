import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  BoardPage,
  Dashboard
} from "../pages";
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
        <Route path="/:userId/boards">
          <Dashboard />
        </Route>
        <Route path="/b/:boardId/:boardTitle">
          <BoardPage />
        </Route>
      </Switch>
    </>
  );
};

export default App;

//FIXME: render phases
