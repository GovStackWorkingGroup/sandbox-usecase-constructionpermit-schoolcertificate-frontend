import { Flex, Heading } from "@chakra-ui/react";
import { colors } from "../../../../../chakra-overrides/colors";
import ApplicationStatus, {
  Status,
} from "../../../../../components/status/ApplicationStatus";

interface ActionProps {
  title: string;
  status: Status;
  showStatus?: boolean;
  children: JSX.Element | JSX.Element[];
  action: JSX.Element;
}

export default function Action({
  title,
  status,
  showStatus,
  children,
  action,
}: ActionProps) {
  return (
    <Flex direction="column" gap="10px">
      <Flex justifyContent="space-between" alignItems="center">
        <Heading color={colors.theme.primary} variant="title" size="sm">
          {title}
        </Heading>
        { showStatus && <ApplicationStatus status={status ?? Status.NOT_STARTED} /> }
      </Flex>
      <Flex direction="column">{children}</Flex>
      {action}
    </Flex>
  );
}
