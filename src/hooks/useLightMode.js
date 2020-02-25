import { useCallback, useMemo } from "react";
import { useColorMode } from "@chakra-ui/core";

const useLightMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const isLightMode = useMemo(() => colorMode === "light", [colorMode]);

  const handleColorChange = useCallback(() => toggleColorMode(), [
    toggleColorMode
  ]);

  return [isLightMode, handleColorChange];
};

export default useLightMode;
