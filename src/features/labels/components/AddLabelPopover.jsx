import React, { memo, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useToggle, useLightMode } from "../../../hooks";
import { selectLabelIds } from "../slices";
import { LabelButton } from "./";
import {
  Popover,
  PopoverTrigger,
  PopoverCloseButton,
  Button,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter
} from "@chakra-ui/core";

const AddLabelPopover = ({ taskId }) => {
  const [isLightMode] = useLightMode();
  const initialFocusRef = useRef(null);
  const { isOpen, close, open } = useToggle();

  const labelIds = useSelector(selectLabelIds);

  const handleSave = useCallback(() => {
    close();
  }, [close]);

  return (
    <Popover
      isOpen={isOpen}
      onClose={close}
      onOpen={open}
      initialFocusRef={initialFocusRef}
      usePortal
      placement="right-start"
    >
      <PopoverTrigger>
        <Button
          size="sm"
          variantColor="purple"
          boxShadow="2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
          mr={4}
        >
          Labels
        </Button>
      </PopoverTrigger>
      <PopoverContent
        zIndex={4}
        w="200px"
        bg={isLightMode ? "white" : "gray.700"}
        cursor="default"
        className="add-label-container"
        _focus={{ outline: "none" }}
      >
        <PopoverHeader
          fontSize="0.9rem"
          textAlign="center"
          opacity={isLightMode ? 0.8 : 1}
        >
          Labels
        </PopoverHeader>
        <PopoverCloseButton opacity={0.6} />
        <PopoverBody>
          {labelIds.map(labelId => (
            <LabelButton
              key={labelId}
              labelId={labelId}
              taskId={taskId}
              ref={initialFocusRef}
            />
          ))}
          <PopoverFooter
            d="flex"
            alignItems="center"
            justifyContent="flex-end"
            px={0}
          >
            <Button
              type="button"
              size="sm"
              mr={1}
              variantColor="green"
              boxShadow="2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
              onClick={handleSave}
              className="add-label-btn"
            >
              Save
            </Button>
          </PopoverFooter>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

AddLabelPopover.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default memo(AddLabelPopover);
