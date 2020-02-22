import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth";
import { Button, Avatar } from "@chakra-ui/core";

const AvatarButton = ({ name, dashboard, color }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login";
  };

  return (
    <Button variant="unstyled" size="sm" onClick={handleLogout}>
      <Avatar
        name={name}
        bg={dashboard ? "gray.400" : `${color}.400`}
        color="#fff"
        size="sm"
      />
    </Button>
  );
};

AvatarButton.propTypes = {
  name: PropTypes.string.isRequired,
  dashboard: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired
};

export default AvatarButton;
