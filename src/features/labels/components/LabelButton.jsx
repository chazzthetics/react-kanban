import React, { memo, forwardRef, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { selectAllLabels } from "../slices";
import {
  makeSelectTaskLabelIds,
  addLabelToTask,
  removeLabelFromTask
} from "../../tasks/slices";
import { PseudoBox } from "@chakra-ui/core";

const LabelButton = forwardRef(({ labelId, taskId }, ref) => {
  const taskLabelIdsSelector = useMemo(makeSelectTaskLabelIds, []);
  const taskLabelIds = useSelector(state =>
    taskLabelIdsSelector(state, taskId)
  );

  const allLabels = useSelector(selectAllLabels);

  const dispatch = useDispatch();

  const handleToggleLabel = useCallback(
    labelId => {
      if (taskLabelIds.includes(labelId)) {
        dispatch(removeLabelFromTask({ taskId, labelId }));
      } else {
        dispatch(addLabelToTask({ taskId, labelId }));
      }
    },
    [dispatch, taskId, taskLabelIds]
  );

  return (
    <PseudoBox
      as="button"
      type="button"
      w="100%"
      h="22px"
      borderRadius={4}
      onClick={() => handleToggleLabel(labelId)}
      bg={allLabels[labelId].color}
      opacity={taskLabelIds.includes(labelId) ? 1 : 0.6}
      _hover={{ opacity: 0.9 }}
      ref={labelId === "1" ? ref : null}
    />
  );
});

LabelButton.propTypes = {
  labelId: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired
};

export default memo(LabelButton);
