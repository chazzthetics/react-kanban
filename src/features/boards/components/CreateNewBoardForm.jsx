import React, { memo, forwardRef, useCallback } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "../../../hooks";
import { createBoard } from "../slices";
import { makeBoard } from "../utils/makeBoard";
import { boardColors } from "../utils/boardColors";
import { ColorRadioButton } from "../../../components";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  RadioButtonGroup
} from "@chakra-ui/core";

const CreateNewBoardForm = forwardRef(({ onClose, button }, ref) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const create = useCallback(
    ({ title, color }) => {
      const board = makeBoard({ title, color });
      dispatch(createBoard(board));
      onClose();

      history.push(`/b/${board.id}/${board.title}`);
    },
    [dispatch, onClose, history]
  );

  const { values, handleChange, handleRadioSelect, handleSubmit } = useForm(
    { title: "", color: "" },
    () => create({ title: values.title, color: values.color })
  );

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <FormControl>
          <FormLabel htmlFor="title" fontSize=".9rem">
            Board Title
          </FormLabel>
          <Input
            name="title"
            id="title"
            size="sm"
            borderRadius={4}
            p={2}
            ref={ref}
            value={values.title}
            onChange={handleChange}
            placeholder="Enter board title..."
            _focus={{ border: "1px solid #ddd", borderRadius: "4px" }}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="color" fontSize=".9rem">
            Choose Board Color
          </FormLabel>
          <RadioButtonGroup
            id="color"
            isInline
            name="color"
            onChange={handleRadioSelect}
          >
            {boardColors.map(color => (
              <ColorRadioButton key={color} value={color} />
            ))}
          </RadioButtonGroup>
        </FormControl>
        {button}
      </Stack>
    </form>
  );
});

CreateNewBoardForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  button: PropTypes.element.isRequired
};

export default memo(CreateNewBoardForm);
