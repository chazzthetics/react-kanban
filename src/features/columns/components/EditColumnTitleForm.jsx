import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  makeSelectColumn,
  columnTitleUpdated,
  columnTitleEditingCancelled
} from "../slices";
import { EditForm } from "../../../components";

const EditColumnTitleForm = ({ columnId }) => {
  const columnSelector = useMemo(makeSelectColumn, []);

  const { title, isEditing } = useSelector(state =>
    columnSelector(state, columnId)
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
      initialValues={{ columnTitle: title }}
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

//FIXME: fix form length
