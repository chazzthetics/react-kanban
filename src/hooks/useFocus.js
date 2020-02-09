import { useEffect, useRef } from "react";

const useFocus = (isEditing = false) => {
  const focusRef = useRef(null);

  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  });

  useEffect(() => {
    if (focusRef.current && isEditing) {
      focusRef.current.select();
    }
  }, [isEditing]);

  return focusRef;
};

export default useFocus;
