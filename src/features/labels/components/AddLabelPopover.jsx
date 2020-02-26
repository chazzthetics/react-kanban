import React, { memo, useMemo, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useToggle, useLabel, useLightMode } from "../../../hooks";
import {
  removeLabelFromTask,
  addLabelToTask,
  taskEditingCancelled,
  makeSelectTaskLabelIds
} from "../../tasks/slices";
import { Fade } from "../../../components";
import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverCloseButton,
  PseudoBox,
  Button,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter
} from "@chakra-ui/core";
// import { CreateLabelForm } from "./";
//FIXME: Fix position
const AddLabelPopover = ({ taskId }) => {
  const { isOpen, close, open } = useToggle();

  const taskLabelIdsSelector = useMemo(makeSelectTaskLabelIds, []);
  const taskLabelIds = useSelector(state =>
    taskLabelIdsSelector(state, taskId)
  );

  const { labelIds, allLabels } = useLabel();

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

  const handleSave = useCallback(() => {
    dispatch(taskEditingCancelled({ taskId }));
  }, [dispatch, taskId]);

  const [isLightMode] = useLightMode();
  const initialFocusRef = useRef(null);

  return (
    <Popover
      isOpen={isOpen}
      onClose={close}
      onOpen={open}
      closeOnBlur={false}
      initialFocusRef={initialFocusRef}
      placement="bottom-start"
      // usePortal
    >
      <PopoverTrigger>
        <Button
          size="sm"
          variantColor="pink"
          boxShadow="2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
        >
          Add Label
        </Button>
      </PopoverTrigger>
      <Fade in={isOpen}>
        <PopoverContent
          zIndex={4}
          bg={isLightMode ? "white" : "gray.700"}
          cursor="default"
        >
          <PopoverHeader
            fontSize=".9rem"
            textAlign="center"
            opacity={isLightMode ? 0.8 : 1}
          >
            Labels
          </PopoverHeader>
          <PopoverCloseButton opacity={0.6} />
          <PopoverBody>
            {labelIds.map(labelId => (
              <PseudoBox
                as="button"
                type="button"
                key={labelId}
                w="100%"
                h="24px"
                borderRadius={4}
                onClick={() => handleToggleLabel(labelId)}
                bg={allLabels[labelId].color}
                opacity={taskLabelIds.includes(labelId) ? 1 : 0.6}
                _hover={{ opacity: 0.9 }}
                ref={labelId === "1" ? initialFocusRef : null}
              ></PseudoBox>
            ))}
            <PopoverFooter
              d="flex"
              alignItems="center"
              justifyContent="flex-end"
              px={0}
            >
              <Button
                type="button"
                size="sm"
                mr={1}
                variantColor="green"
                boxShadow="2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
                onClick={handleSave}
              >
                Save
              </Button>
            </PopoverFooter>
          </PopoverBody>
        </PopoverContent>
      </Fade>
    </Popover>
  );
};

AddLabelPopover.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default memo(AddLabelPopover);

// TODO: refactor
//FIXME: form cant be child of form , maybe use modal instead of popover
// TODO: undo label select when clicked
