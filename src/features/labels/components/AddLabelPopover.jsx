import React from "react";
import PropTypes from "prop-types";
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
import { useSelector, useDispatch } from "react-redux";
import { labelAdded } from "../../tasks/slices";
import { CreateLabelForm } from ".";
import { selectAllLabels, selectLabelIds } from "../../../app/redux/selectors";

const AddLabelPopover = ({ taskId }) => {
  const allLabels = useSelector(selectAllLabels);
  const labelIds = useSelector(selectLabelIds);

  const dispatch = useDispatch();
  const handleAddLabel = labelId => {
    dispatch(labelAdded({ taskId, labelId }));
  };

  return (
    <Popover closeOnBlur={true} placement="bottom">
      <PopoverTrigger>
        <Button>Labels</Button>
      </PopoverTrigger>
      <PopoverContent zIndex={4} bg="gray.200">
        <PopoverHeader>Add Label</PopoverHeader>
        <PopoverCloseButton />
        <PopoverArrow />
        <PopoverBody>
          {labelIds.map(labelId => (
            <Button
              key={labelId}
              onClick={() => handleAddLabel(labelId)}
              display="block"
            >
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
