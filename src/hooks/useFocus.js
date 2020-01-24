import { useEffect, useRef } from "react";

const useFocus = () => {
  const focusRef = useRef(null);

  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  });

  return focusRef;
};

export default useFocus;
