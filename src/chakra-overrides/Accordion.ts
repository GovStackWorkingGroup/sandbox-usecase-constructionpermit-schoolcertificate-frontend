import { accordionAnatomy as parts } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const sizes = {
  xs: definePartsStyle(() => ({
    panel: defineStyle({
      fontSize: ".75rem",
    }),
  })),
  sm: definePartsStyle(() => ({
    panel: defineStyle({
      fontSize: ".875rem",
    }),
  })),
  md: definePartsStyle(() => ({
    panel: defineStyle({
      fontSize: "1rem",
    }),
  })),
};

export const Accordion = defineMultiStyleConfig({ sizes });
