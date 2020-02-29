import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from "@chakra-ui/core";

const TaskModal = ({
  title,
  isOpen,
  onClose,
  onRemove,
  onSubmit,
  isDisabled,
  children
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay backgroundColor="rgba(0,0,0,0.8)" />
      <ModalContent borderRadius={4} bg="#ebecf0">
        <ModalHeader fontSize=".9rem" fontWeight={600} pb={0}>
          {title}
        </ModalHeader>
        <ModalCloseButton opacity={0.6} size="sm" />
        <form onSubmit={onSubmit}>
          <ModalBody>{children}</ModalBody>
          <ModalFooter
            width="100%"
            d="flex"
            justifyContent="space-between"
            pt={0}
          >
            <Button
              type="submit"
              size="sm"
              variantColor="green"
              boxShadow="2px 4px 12px -8px rgba(0, 0, 0, 0.75)"
            >
              Save
            </Button>
            <Button
              type="button"
              size="sm"
              variant={isDisabled ? "unstyled" : "ghost"}
              variantColor="red"
              onClick={onRemove}
              disabled={isDisabled}
              _disabled={{ cursor: "default", color: "lightgray" }}
            >
              Remove
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

TaskModal.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired
};

export default TaskModal;
