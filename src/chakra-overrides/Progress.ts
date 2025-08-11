import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

export const Progress = createMultiStyleConfigHelpers([
  "filledTrack",
]).defineMultiStyleConfig({
  baseStyle: {
    filledTrack: {
      willChange: "width",
      transition: "width 0.1s ease",
    },
  },
});
