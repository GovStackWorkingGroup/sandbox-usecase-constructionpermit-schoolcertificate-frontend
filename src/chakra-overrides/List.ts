import { listAnatomy as parts } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const sizes = {
  xs: definePartsStyle(() => ({
    container: defineStyle({
      fontSize: ".75rem",
    }),
  })),
  sm: definePartsStyle(() => ({
    container: defineStyle({
      fontSize: ".875rem",
    }),
  })),
  md: definePartsStyle(() => ({
    container: defineStyle({
      fontSize: "1rem",
    }),
  })),
};

export const List = defineMultiStyleConfig({ sizes });
