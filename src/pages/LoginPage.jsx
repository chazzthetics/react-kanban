import React from "react";
import { useDispatch } from "react-redux";
import { useForm, useAuth } from "../hooks";
import { login } from "../features/auth";
import { AuthRedirect } from "../components";
import { Flex, Heading, Button, Input } from "@chakra-ui/core";

const LoginPage = () => {
  const { user, loading } = useAuth();
  const dispatch = useDispatch();

  const { values, handleChange, handleSubmit } = useForm(
    { email: "", password: "" },
    loginUser,
    false
  );

  const { email, password } = values;

  function loginUser() {
    const credentials = { email: email, password: password };
    dispatch(login(credentials));
  }

  if (user && user.id) {
    return <AuthRedirect userId={user.id} redirectFrom="login" />;
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
              value={email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Password</label>
            <Input
              type="password"
              name="password"
              value={password}
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
