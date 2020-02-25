import React from "react";
import PropTypes from "prop-types";
import { useToggle, useColumn } from "../../../hooks";
import { ListButton } from "../../../components";
import { MoveColumnSelect } from "./";

const MoveColumnButton = ({ columnId, close }) => {
  const { isOpen, toggle } = useToggle();
  const { isLocked } = useColumn(columnId);

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
