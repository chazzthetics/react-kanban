import React from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, useAuth } from "../hooks";
import { login, selectUser } from "../features/auth";
import { Flex, Heading, Button, Input } from "@chakra-ui/core";

const LoginPage = () => {
  const { values, handleChange, handleSubmit } = useForm(
    { email: "", password: "" },
    loginUser,
    false
  );

  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);

  //TODO: user on every key down--fix
  const user = useSelector(selectUser);
  // const { user } = useAuth();

  function loginUser() {
    const credentials = { email: values.email, password: values.password };
    dispatch(login(credentials));
  }

  if (user && user.id) {
    return (
      <Redirect
        push
        to={{ pathname: `/${user.id}/boards`, state: { referrer: "login" } }}
      />
    );
  }

  return (
    <Flex
      h="100vh"
      bg="gray.50"
      flexDir="column"
      align="center"
      justify="flex-start"
    >
      <Flex
        h="40%"
        bg="gray.50"
        flexDir="column"
        align="center"
        justify="center"
      >
        <Flex>
          <Heading as="h1" textAlign="center" size="lg">
            React Kanban | Login
          </Heading>
        </Flex>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <Input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Password</label>
            <Input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" isLoading={loading}>
            Login
          </Button>
        </form>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
