import React from "react";
import { Redirect } from "react-router-dom";

const AuthRedirect = ({ userId, redirectFrom }) => {
  return (
    <Redirect
      push
      to={{
        pathname: `/${userId}/boards`,
        state: { referrer: redirectFrom }
      }}
    />
  );
};

export default AuthRedirect;
