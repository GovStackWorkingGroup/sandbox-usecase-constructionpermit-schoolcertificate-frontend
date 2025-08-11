import { Flex, Stack, StackDivider } from "@chakra-ui/react";
import { colors } from "../../chakra-overrides/colors";

export default function ListCard({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <Flex
      direction="column"
      borderRadius="16px"
      backgroundColor={colors.theme.light}
      p="10px"
    >
      <Stack divider={<StackDivider />} spacing="10px">
        {children}
      </Stack>
    </Flex>
  );
}
