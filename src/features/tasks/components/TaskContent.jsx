import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useLightMode } from "../../../hooks";
import { makeSelectTaskCompleted, makeSelectTaskContent } from "../slices";
import { Text } from "@chakra-ui/core";

const TaskContent = ({ taskId }) => {
  const [isLightMode] = useLightMode();

  const taskCompletedSelector = useMemo(makeSelectTaskCompleted, []);
  const completed = useSelector(state => taskCompletedSelector(state, taskId));

  const taskContentSelector = useMemo(makeSelectTaskContent, []);
  const content = useSelector(state => taskContentSelector(state, taskId));

  return (
    <Text
      fontSize="0.9rem"
      maxW="190px"
      w="100%"
      overflowWrap="break-word"
      whiteSpace="pre-wrap"
      color={
        isLightMode && !completed
          ? "black"
          : isLightMode && completed
          ? "gray.300"
          : !isLightMode && completed
          ? "gray.600"
          : "white"
      }
    >
      {content}
    </Text>
  );
};

TaskContent.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default memo(TaskContent);
