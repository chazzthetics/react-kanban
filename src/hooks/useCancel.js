import { useRef, useEffect, useCallback } from "react";

//FIXME: clean up, looks disgusting
const isPopover = e => {
  const addLabel = document.querySelector(".add-label-container");
  const saveBtn = document.querySelector(".add-label-btn");
  const columnOptions = document.querySelector(".column-options-popover");
  const moveColumnSelect = document.querySelector(".move-column-select");
  //FIXME: refactor this shit..please...soon...works, but logic is not maintainable, doesnt work
  return (
    e.target.parentElement === addLabel ||
    e.target.parentElement.parentElement === addLabel ||
    e.target === saveBtn ||
    e.target === columnOptions ||
    e.target.parentElement === columnOptions ||
    e.target.parentElement.parentElement === columnOptions ||
    e.target.parentElement.parentElement.parentElement === columnOptions ||
    e.target === moveColumnSelect ||
    e.target.parentElement === moveColumnSelect ||
    e.target.parentElement.parentElement === moveColumnSelect ||
    e.target.parentElement.parentElement.parentElement === moveColumnSelect
  );
};

const useCancel = (isActive, cancelAction) => {
  const cancelRef = useRef(null);
  const handleCancel = useCallback(
    e => {
      if (e.keyCode === 27) {
        // Close on ESC
        cancelAction();
        return;
      } else if (
        (cancelRef.current && cancelRef.current.contains(e.target)) ||
        isPopover(e)
      ) {
        return;
      } else {
        // Close on click outside of form
        cancelAction();
        return;
      }
    },
    [cancelAction]
  );

  useEffect(() => {
    if (isActive) {
      document.addEventListener("mousedown", handleCancel);
      document.addEventListener("keydown", handleCancel);
    } else {
      document.removeEventListener("mousedown", handleCancel);
      document.removeEventListener("keydown", handleCancel);
    }

    return () => {
      document.removeEventListener("mousedown", handleCancel);
      document.removeEventListener("keydown", handleCancel);
    };
  }, [isActive, handleCancel]);

  return cancelRef;
};

export default useCancel;
