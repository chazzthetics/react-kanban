import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/auth";
import { Button, Input } from "@chakra-ui/core";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const [values, setValues] = React.useState({
    email: "",
    password: ""
  });

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const history = useHistory();
  const dispatch = useDispatch();
  const handleSubmit = e => {
    e.preventDefault();
    const credentials = { email: values.email, password: values.password };
    dispatch(login(credentials));
    history.push("/app", { success: true });
  };

  return (
    <div>
      <h1>Login Page</h1>
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
    </div>
  );
};

export default LoginPage;
