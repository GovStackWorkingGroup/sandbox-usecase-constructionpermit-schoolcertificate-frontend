import { defineStyleConfig } from "@chakra-ui/react";
import { colors } from "./colors";

export const Heading = defineStyleConfig({
  baseStyle: {
    fontFamily: "Inter",
    color: colors.black,
    fontWeight: 700,
  },
  variants: {
    display: {
      fontWeight: 400,
      lineHeight: "122.22%",
    },
    title: {
      fontWeight: 500,
      lineHeight: "150%",
      letterSpacing: "0.15px",
    },
    headline: {
      fontSize: "1.5rem",
      fontWeight: 400,
      lineHeight: "133.33%",
    },
  },
  sizes: {
    xl: {
      fontSize: "2.58rem",
    },
    lg: {
      fontSize: "2.25rem",
      lineHeight: "3rem",
    },
    md: {
      fontSize: "1.5rem",
      lineHeight: "2rem",
    },
    sm: {
      fontSize: "1.125rem",
      lineHeight: "1.5rem",
    },
    xs: {
      fontSize: "1rem",
    },
  },
});
