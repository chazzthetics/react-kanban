import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { columnTitleEditingCancelled, columnTitleUpdated } from "../slices";
import {
  selectColumnTitle,
  selectColumnIsEditing
} from "../../../app/redux/selectors";
import { EditForm } from "../../../components";

const EditColumnTitleForm = ({ columnId }) => {
  const currentColumnTitle = useSelector(state =>
    selectColumnTitle(state, columnId)
  );

  const isEditing = useSelector(state =>
    selectColumnIsEditing(state, columnId)
  );

  const dispatch = useDispatch();
  const onCancel = () => {
    dispatch(columnTitleEditingCancelled({ columnId }));
  };

  function update(columnTitle) {
    dispatch(columnTitleUpdated({ columnId, newTitle: columnTitle }));
  }

  return (
    <EditForm
      inputName="columnTitle"
      initialValues={{ columnTitle: currentColumnTitle }}
      isEditing={isEditing}
      onCancel={onCancel}
      update={update}
      maxW="120px"
      fontWeight="semibold"
      fontSize=".9rem"
      mt={1}
      mb={2}
    />
  );
};

EditColumnTitleForm.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default EditColumnTitleForm;
