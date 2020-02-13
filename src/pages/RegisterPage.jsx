import React from "react";
import axios from "axios";
import { Button, Input } from "@chakra-ui/core";

const RegisterPage = () => {
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    password: ""
  });
  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const user = {
      name: values.name,
      email: values.email,
      password: values.password
    };
    const { data } = await axios.post(
      "http://localhost:8000/api/auth/register",
      user
    );
    localStorage.setItem("access_token", data.access_token);
    return data;
  };

  const getUser = async () => {
    const { data: authUser } = await axios.get(
      "http://localhost:8000/api/auth/user",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      }
    );

    console.log(authUser);
  };

  return (
    <div>
      <h1>RegisterPage</h1>
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

      <Button type="button" onClick={getUser}>
        Get User
      </Button>
    </div>
  );
};

export default RegisterPage;
