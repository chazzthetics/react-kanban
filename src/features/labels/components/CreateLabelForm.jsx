import React from "react";
import { useDispatch } from "react-redux";
import { labelCreated } from "../slices";
import { useForm } from "../../../hooks";
import { makeLabel } from "../utils/makeLabel";
import { Input } from "@chakra-ui/core";

const CreateLabelForm = () => {
  const dispatch = useDispatch();
  const { values, handleChange, handleSubmit } = useForm(
    { color: "", name: "" },
    () => create({ color: values.color, name: values.name })
  );
  const { color, name } = values;

  function create({ color, name }) {
    const label = makeLabel({ color, name });
    dispatch(labelCreated({ label }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="color"
        value={color}
        onChange={handleChange}
        placeholder="color"
      />
      <Input
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        placeholder="label"
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default CreateLabelForm;
