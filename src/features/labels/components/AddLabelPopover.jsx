import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  Popover,
  PopoverTrigger,
  PopoverCloseButton,
  Button,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverBody
} from "@chakra-ui/core";
import { useToggle } from "../../../hooks";
import { labelAdded } from "../../tasks/slices";
import { CreateLabelForm } from ".";
import { selectAllLabels, selectLabelIds } from "../../../app/redux/selectors";

const AddLabelPopover = ({ taskId }) => {
  const { isOpen, close, open } = useToggle();

  const allLabels = useSelector(selectAllLabels);
  const labelIds = useSelector(selectLabelIds);

  const dispatch = useDispatch();
  const handleAddLabel = labelId => {
    dispatch(labelAdded({ taskId, labelId }));
  };

  return (
    <Popover placement="bottom" isOpen={isOpen} onClose={close} onOpen={open}>
      <PopoverTrigger>
        <Button size="sm" boxShadow="2px 4px 12px -8px rgba(0, 0, 0, 0.75)">
          Add Label
        </Button>
      </PopoverTrigger>
      <PopoverContent zIndex={4} bg="gray.200">
        <PopoverHeader>Label</PopoverHeader>
        <PopoverCloseButton />
        <PopoverArrow />
        <PopoverBody>
          {labelIds.map(labelId => (
            <Button key={labelId} onClick={() => handleAddLabel(labelId)}>
              {allLabels[labelId].name || allLabels[labelId].color}
            </Button>
          ))}
          <Popover>
            <PopoverTrigger>
              <Button variantColor="blue">Create</Button>
            </PopoverTrigger>
            <PopoverContent zIndex={4} placement="bottom-start">
              <CreateLabelForm />
            </PopoverContent>
          </Popover>
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
