import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useColumn } from "../../../hooks";
import { updateColumnTitle, columnTitleEditingCancelled } from "../slices";
import { EditForm } from "../../../components";

const EditColumnTitleForm = ({ columnId }) => {
  const { title, isEditing } = useColumn(columnId);
  const dispatch = useDispatch();

  const onCancel = () => {
    dispatch(columnTitleEditingCancelled({ columnId }));
  };

  function update(columnTitle) {
    dispatch(updateColumnTitle({ columnId, title: columnTitle }));
  }

  return (
    <EditForm
      inputName="columnTitle"
      initialValues={{ columnTitle: title }}
      isEditing={isEditing}
      onCancel={onCancel}
      update={update}
      maxW="120px"
      fontWeight="semibold"
      fontSize=".9rem"
    />
  );
};

EditColumnTitleForm.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default EditColumnTitleForm;

//FIXME: fix form length
