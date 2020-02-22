import { useColorMode } from "@chakra-ui/core";

const useLightMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const isLightMode = colorMode === "light";

  return [isLightMode, toggleColorMode];
};

export default useLightMode;
