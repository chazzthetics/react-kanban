import React from "react";
import { useAuth } from "../hooks";
import { AuthRedirect } from "../components";

const HomePage = () => {
  const { user } = useAuth();

  if (user && user.id) {
    return <AuthRedirect userId={user.id} redirectFrom="home" />;
  }

  return (
    <div>
      <h1>Welcome to app</h1>
    </div>
  );
};

export default HomePage;
