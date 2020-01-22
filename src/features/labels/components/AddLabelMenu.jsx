import React from "react";
import PropTypes from "prop-types";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/core";
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
    <Menu>
      <MenuButton as={Button} rightIcon="chevron-down">
        Label
      </MenuButton>
      <MenuList>
        {labelIds.map(labelId => (
          <MenuItem key={labelId} onClick={() => handleAddLabel(labelId)}>
            <span style={{ color: `${allLabels[labelId].color}` }}>
              {allLabels[labelId].color} | {allLabels[labelId].name}
            </span>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

AddLabelMenu.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default AddLabelMenu;

//TODO: refactor, switch to POPOVER?
// TODO: selectors
