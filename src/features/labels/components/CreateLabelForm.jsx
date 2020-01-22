import React from "react";
import { useDispatch } from "react-redux";
import { labelCreated } from "../slices";
import { useForm } from "../../../hooks";

function makeLabel({ color, name }) {
  return {
    id: `labelNew${Math.floor(Math.random() * 20)}`,
    color,
    name
  };
}

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
      <input
        type="text"
        name="color"
        value={color}
        onChange={handleChange}
        placeholder="color"
      />
      <input
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
