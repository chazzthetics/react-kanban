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
import { CreateLabelForm } from "./";

const AddLabelMenu = ({ taskId }) => {
  const dispatch = useDispatch();

  const allLabels = useSelector(state => state.labels.all);
  const labelIds = useSelector(state => state.labels.ids);

  const handleAddLabel = labelId => {
    dispatch(labelAdded({ taskId, labelId }));
  };

  return (
    <Popover closeOnBlur={true} placement="bottom-end">
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

AddLabelMenu.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default AddLabelMenu;

//TODO: refactor, switch to POPOVER?
// TODO: selectors
