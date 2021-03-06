import React, { memo, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeSelectColumnTitle } from "../slices";
import { useLightMode } from "../../../hooks";
import { columnTitleEditing } from "../slices";
import { PseudoBox, Heading } from "@chakra-ui/core";

const ColumnTitle = ({ columnId }) => {
  const [isLightMode] = useLightMode();

  const columnTitleSelector = useMemo(makeSelectColumnTitle, []);
  const title = useSelector(state => columnTitleSelector(state, columnId));

  const dispatch = useDispatch();

  const handleEditColumnTitle = useCallback(() => {
    dispatch(columnTitleEditing({ columnId }));
  }, [dispatch, columnId]);

  return (
    <PseudoBox
      d="flex"
      alignItems="center"
      justifyContent="center"
      py={2}
      pr={1}
      _hover={{
        backgroundColor: isLightMode ? "#d4d4d4" : "gray.500",
        borderRadius: 4
      }}
      transition="background-color 100ms ease-in"
      onClick={handleEditColumnTitle}
    >
      <Heading
        as="h3"
        cursor="pointer"
        size="sm"
        fontSize=".9rem"
        fontWeight="semibold"
        ml={1}
        color={isLightMode ? "black" : "white"}
      >
        {title}
      </Heading>
    </PseudoBox>
  );
};

export default memo(ColumnTitle);
