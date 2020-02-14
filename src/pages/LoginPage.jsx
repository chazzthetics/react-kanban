import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "../hooks";
import { login } from "../features/auth";
import { Flex, Heading, Button, Input } from "@chakra-ui/core";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const { values, handleChange, handleSubmit } = useForm(
    { email: "", password: "" },
    loginUser
  );

  const history = useHistory();
  const dispatch = useDispatch();

  function loginUser() {
    const credentials = { email: values.email, password: values.password };
    dispatch(login(credentials));
    history.push("/app");
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
            React Kanban
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
          <Button type="submit">Login</Button>
        </form>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
