import { defineStyleConfig } from "@chakra-ui/react";

export const Text = defineStyleConfig({
  baseStyle: {
    fontFamily: "Inter",
    color: "inherit",
    fontWeight: 400,
  },
  variants: {
    bold: {
      fontWeight: 600,
    },
    caps: {
      textTransform: "uppercase",
      fontWeight: 600,
    },
    body: {
      fontWeight: 400,
      lineHeight: "133.33%",
    },
    title: {
      lineHeight: "142.857%",
      fontWeight: 500,
    },
    label: {
      fontWeight: 600,
      lineHeight: "142.857%",
      letterSpacing: "0.1px",
    },
  },
  sizes: {
    xxs: {
      fontSize: ".625rem",
      lineHeight: ".875rem",
    },
    xs: {
      fontSize: ".75rem",
      lineHeight: "1rem",
    },
    sm: {
      fontSize: ".875rem",
      lineHeight: "1.25rem",
    },
    md: {
      fontSize: "1rem",
      lineHeight: "1.5rem",
    },
    lg: {
      fontSize: "1.125rem",
      lineHeight: "1.75rem",
    },
  },
  defaultProps: {
    size: "md",
  },
});
