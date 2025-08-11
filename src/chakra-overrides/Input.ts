import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { colors } from "./colors";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
  group: {
    bg: colors.secondary[0],
  },
  field: {
    outline: `2px solid ${colors.secondary[1000]}`,
  },
  variants: {},
  sizes: {},
  defaultProps: {
    variant: null,
  },
});

export const Input = defineMultiStyleConfig({ baseStyle });
