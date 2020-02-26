import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useToggle } from "../../../hooks";
import { makeSelectColumnIsLocked } from "../slices";
import { ListButton } from "../../../components";
import { MoveColumnSelect } from "./";

const MoveColumnButton = ({ columnId, close }) => {
  const { isOpen, toggle } = useToggle();

  const isLockedSelector = useMemo(makeSelectColumnIsLocked, []);
  const isLocked = useSelector(state => isLockedSelector(state, columnId));

  return (
    <>
      <ListButton
        onClick={toggle}
        isDisabled={isLocked}
        label="Move List"
        mb={isOpen ? 2 : 0}
      >
        Move List
      </ListButton>
      {isOpen && <MoveColumnSelect columnId={columnId} onClose={close} />}
    </>
  );
};

MoveColumnButton.propTypes = {
  columnId: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired
};

export default MoveColumnButton;
