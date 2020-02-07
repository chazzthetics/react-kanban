import { useEffect, useRef } from "react";

const useFocus = (isEditing = false) => {
  const focusRef = useRef(null);

  useEffect(() => {
    if (focusRef.current) {
      if (isEditing) {
        focusRef.current.select();
      } else {
        focusRef.current.focus();
      }
    }
  }, [isEditing]);

  return focusRef;
};

export default useFocus;
