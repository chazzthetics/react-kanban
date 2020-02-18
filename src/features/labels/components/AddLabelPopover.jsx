import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useToggle, useTask, useLabel } from "../../../hooks";
import {
  removeLabelFromTask,
  addLabelToTask,
  taskEditingCancelled
} from "../../tasks/slices";
import {
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

const AddLabelPopover = ({ taskId }) => {
  const { isOpen, close, open } = useToggle();
  const { taskLabelIds } = useTask(taskId);
  const { labelIds, allLabels } = useLabel();

  const dispatch = useDispatch();

  const handleToggleLabel = labelId => {
    if (taskLabelIds.includes(labelId)) {
      dispatch(removeLabelFromTask({ taskId, labelId }));
    } else {
      dispatch(addLabelToTask({ taskId, labelId }));
    }
  };

  const handleSave = () => {
    dispatch(taskEditingCancelled({ taskId }));
  };

  return (
    <>
      <Popover
        placement="bottom"
        isOpen={isOpen}
        onClose={close}
        onOpen={open}
        closeOnBlur={false}
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
        <PopoverContent zIndex={4} bg="gray.50" cursor="default">
          <PopoverHeader textAlign="center">Labels</PopoverHeader>
          <PopoverCloseButton />
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
      </Popover>
    </>
  );
};

AddLabelPopover.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default AddLabelPopover;

// TODO: refactor
//FIXME: form cant be child of form , maybe use modal instead of popover
// TODO: undo label select when clicked
