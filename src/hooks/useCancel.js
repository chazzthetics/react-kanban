import { useRef, useEffect, useCallback } from "react";

const useCancel = (isActive, cancelAction) => {
  const cancelRef = useRef(null);

  const handleCancel = useCallback(
    e => {
      if (cancelRef.current.contains(e.target)) return;
      cancelAction();
      return;
    },
    [cancelAction]
  );

  useEffect(() => {
    if (isActive) {
      document.addEventListener("mousedown", handleCancel);
    } else {
      document.removeEventListener("mousedown", handleCancel);
    }

    return () => document.removeEventListener("mousedown", handleCancel);
  }, [isActive, handleCancel]);

  return cancelRef;
};

export default useCancel;
