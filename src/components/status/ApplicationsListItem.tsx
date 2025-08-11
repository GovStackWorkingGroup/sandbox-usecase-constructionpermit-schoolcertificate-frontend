import { Divider, Flex, Spacer, Text } from "@chakra-ui/react";
import { colors } from "../../chakra-overrides/colors";
import ApplicationStatus, { Status } from "./ApplicationStatus";

export default function ApplicationsListItem () {
  return (
    <>
    <Flex direction="column" gap="10px">
      <Flex direction="row">
        <Text 
        color={colors.theme.primary} 
        alignSelf="center">1. Task Title</Text>
        <Spacer />
        <ApplicationStatus status={Status.NOT_STARTED} />
      </Flex>
      <Text>Task Description (If Needed)</Text>
      <Divider />
    </Flex>
    </>
  )
}