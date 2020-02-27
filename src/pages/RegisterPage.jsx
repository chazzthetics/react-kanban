import React from "react";
import { useDispatch } from "react-redux";
import { useForm, useAuth } from "../hooks";
import { register } from "../features/auth";
import { AuthRedirect } from "../components";
import { Flex, Heading, Button, Input } from "@chakra-ui/core";

const RegisterPage = () => {
  const { user, loading } = useAuth();
  const dispatch = useDispatch();

  const { values, handleChange, handleSubmit } = useForm(
    { name: "", email: "", password: "" },
    registerUser,
    false
  );

  const { name, email, password } = values;

  function registerUser() {
    const credentials = {
      name: name,
      email: email,
      password: password
    };
    dispatch(register(credentials));
  }

  if (user && user.id) {
    return <AuthRedirect userId={user.id} redirectFrom="register" />;
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
            React Kanban | Register
          </Heading>
        </Flex>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <Input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </div>
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
            Register
          </Button>
        </form>
      </Flex>
    </Flex>
  );
};

export default RegisterPage;
