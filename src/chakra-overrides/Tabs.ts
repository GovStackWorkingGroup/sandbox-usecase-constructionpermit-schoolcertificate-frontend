import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const Tabs = createMultiStyleConfigHelpers([
  "tab",
  "tablist",
]).defineMultiStyleConfig({
  variants: {
    enclosed: {
      tab: {
        color: "secondary.1000",
        fontWeight: "600",
        borderTopLeftRadius: ".5rem",
        borderTopRightRadius: ".5rem",
        _selected: {
          bg: "secondary.1000",
          color: "secondary.0",
          borderBottomColor: "secondary.1000",
        },
      },
      tablist: {
        borderColor: "secondary.1000",
        marginBottom: 0,
      },
    },
  },
  defaultProps: {
    variant: "enclosed",
  },
});

export default Tabs;
