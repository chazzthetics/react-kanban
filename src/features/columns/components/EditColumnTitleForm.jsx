import React, { memo, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  makeSelectColumn,
  updateColumnTitle,
  columnTitleEditingCancelled
} from "../slices";
import { EditForm } from "../../../components";
import { Flex } from "@chakra-ui/core";

const EditColumnTitleForm = ({ columnId }) => {
  const columnSelector = useMemo(makeSelectColumn, []);
  const { isEditing, title } = useSelector(state =>
    columnSelector(state, columnId)
  );

  const dispatch = useDispatch();

  const onCancel = useCallback(() => {
    dispatch(columnTitleEditingCancelled({ columnId }));
  }, [dispatch, columnId]);

  const update = useCallback(
    columnTitle => {
      dispatch(updateColumnTitle({ columnId, title: columnTitle }));
    },
    [dispatch, columnId]
  );

  return (
    <Flex>
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
    </Flex>
  );
};

EditColumnTitleForm.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default memo(EditColumnTitleForm);
