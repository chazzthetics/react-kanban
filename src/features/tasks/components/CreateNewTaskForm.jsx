import React, { memo, useCallback, useEffect, useRef, forwardRef } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { createTask } from "../slices";
import { useToggle } from "../../../hooks";
import { makeTask } from "../utils/makeTasks";
import { CreateForm, AddButtonGroup } from "../../../components";
import { CreateTaskButton } from "./";
import { Box } from "@chakra-ui/core";

const CreateNewTaskForm = forwardRef(({ columnId }, ref) => {
  const { isOpen, close, open } = useToggle();

  const dispatch = useDispatch();

  const create = useCallback(
    taskContent => {
      const task = makeTask({ content: taskContent });
      dispatch(createTask({ task, columnId }));
    },
    [dispatch, columnId]
  );

  useEffect(() => {
    if (isOpen) {
      ref.current.scrollIntoView(true);
    }
  }, [isOpen, ref]);

  // Firefox padding issue
  const boxRef = useRef(null);
  const isOverFlow = boxRef.current?.offsetTop > 830;
  const isChrome = !!window.chrome;

  return (
    <Box
      position={isOpen ? "static" : "sticky"}
      bottom={0}
      pb={isOpen && isOverFlow && !isChrome ? 2 : 0}
      ref={boxRef}
    >
      {!isOpen ? (
        <CreateTaskButton onOpen={open} columnId={columnId} />
      ) : (
        <Box ref={ref}>
          <CreateForm
            inputName="taskContent"
            placeholder="Enter a title for this task..."
            initialValues={{ taskContent: "" }}
            create={create}
            isOpen={isOpen}
            onCancel={close}
            textarea={true}
            w="17rem"
            h="36px"
            px={2}
            mb={2}
            size="sm"
            borderRadius={4}
          >
            <AddButtonGroup onClose={close} value="Add Task" />
          </CreateForm>
        </Box>
      )}
    </Box>
  );
});

CreateNewTaskForm.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default memo(CreateNewTaskForm);
