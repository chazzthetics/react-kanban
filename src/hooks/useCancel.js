import { useRef, useEffect, useCallback } from "react";

//FIXME: disgusting, fix doesn't even work
const isLabelPopover = e => {
  return e.target.textContent === "Labels" || e.target.textContent === "Save";
};

const useCancel = (isActive, cancelAction) => {
  const cancelRef = useRef(null);

  const handleCancel = useCallback(
    e => {
      if (e.keyCode === 27) {
        // Close on ESC
        cancelAction();
        return;
      } else if (cancelRef.current && cancelRef.current.contains(e.target)) {
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
