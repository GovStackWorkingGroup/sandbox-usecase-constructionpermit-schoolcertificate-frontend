import { defineStyleConfig } from "@chakra-ui/react";

export const Button = defineStyleConfig({
  baseStyle: {},
  sizes: {
    lg: {
      fontSize: "1.125rem",
    },
    md: {
      fontSize: "1rem",
    },
    sm: {
      fontSize: ".875rem",
    },
  },
  variants: {
    ghost: {},
    outline: (props) => ({
      bg: `${props.colorScheme}.0`,
    }),
    solid: {},
  },
});
