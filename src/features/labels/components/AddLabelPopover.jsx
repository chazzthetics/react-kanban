import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useToggle } from "../../../hooks";
import { labelAdded, taskEditingCancelled } from "../../tasks/slices";
import { CreateLabelForm } from "./";
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
import { makeSelectTaskLabelIds } from "../../tasks/slices";
import { selectAllLabels, selectLabelIds } from "../slices";

const AddLabelPopover = ({ taskId }) => {
  const { isOpen, close, open } = useToggle();

  const taskLabelIdsSelector = useMemo(makeSelectTaskLabelIds, []);
  const taskLabels = useSelector(state => taskLabelIdsSelector(state, taskId));

  // FIXME: REFACTOR
  const allLabels = useSelector(selectAllLabels);
  const labelIds = useSelector(selectLabelIds);

  const dispatch = useDispatch();

  const handleAddLabel = labelId => {
    dispatch(labelAdded({ taskId, labelId }));
  };

  const handleSave = () => {
    dispatch(taskEditingCancelled({ taskId }));
  };

  return (
    <Popover
      placement="bottom"
      isOpen={isOpen}
      onClose={close}
      onOpen={open}
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Button size="sm" boxShadow="2px 4px 12px -8px rgba(0, 0, 0, 0.75)">
          Add Label
        </Button>
      </PopoverTrigger>
      <PopoverContent zIndex={4} bg="gray.50">
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
              onClick={() => handleAddLabel(labelId)}
              bg={allLabels[labelId].color}
              opacity={taskLabels.includes(labelId) ? 1 : 0.7}
              _hover={{ opacity: ".9" }}
            ></PseudoBox>
          ))}
          <PopoverFooter
            d="flex"
            alignItems="center"
            justifyContent="flex-end"
            px={0}
          >
            <Popover closeOnBlur={false}>
              <Button
                type="button"
                size="sm"
                mr={1}
                boxShadow="2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
                onClick={handleSave}
              >
                Save
              </Button>
              <PopoverTrigger>
                <Button
                  type="button"
                  size="sm"
                  boxShadow="2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
                >
                  Create Label
                </Button>
              </PopoverTrigger>
              <PopoverContent zIndex={4} placement="bottom-start">
                <CreateLabelForm />
              </PopoverContent>
            </Popover>
          </PopoverFooter>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

AddLabelPopover.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default AddLabelPopover;

// TODO: refactor
//FIXME: form cant be child of form , maybe use modal instead of popover
// TODO: undo label select when clicked
