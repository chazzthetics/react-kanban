import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { useForm } from "../hooks";
import { register, selectUser } from "../features/auth";
import { Flex, Heading, Button, Input } from "@chakra-ui/core";

const RegisterPage = () => {
  const { values, handleChange, handleSubmit } = useForm(
    { name: "", email: "", password: "" },
    registerUser,
    false
  );

  const dispatch = useDispatch();

  function registerUser() {
    const credentials = {
      name: values.name,
      email: values.email,
      password: values.password
    };
    dispatch(register(credentials));
  }
  const user = useSelector(selectUser);

  if (user && user.id) {
    return (
      <Redirect
        push
        to={{ pathname: `/${user.id}/boards`, state: { referrer: "register" } }}
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
            React Kanban | Register
          </Heading>
        </Flex>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <Input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
            />
          </div>
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
          <Button type="submit">Register</Button>
        </form>
      </Flex>
    </Flex>
  );
};

export default RegisterPage;
