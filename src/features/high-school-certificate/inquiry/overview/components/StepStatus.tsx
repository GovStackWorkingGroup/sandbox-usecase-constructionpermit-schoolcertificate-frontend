import AlertCircle from "@assets/icons/alert-circle.svg?react";
import CheckCircle from "@assets/icons/check-circle-2.svg?react";
import CircleEllipsis from "@assets/icons/circle-ellipsis.svg?react";
import RadioOFF from "@assets/icons/selected-off.svg?react";
import RadioON from "@assets/icons/selected-on.svg?react";
import { Divider, Flex, Link, List, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { colors } from "../../../../../chakra-overrides/colors";
import { Status } from "../../../../../components/status/ApplicationStatus";

// Robust type for status string values
type StatusType = typeof Status.COMPLETED | typeof Status.NOT_STARTED | typeof Status.IN_PROGRESS;

interface StepProps {
  id: string;
  activeStep: "identification" | "preferences" | "review" | "payment";
  status: {
    identification: StatusType;
    preferences: StatusType;
    review: StatusType;
    payment: StatusType;
  };
}

export default function StepStatus({
  id,
  activeStep,
  status
}: StepProps) {
  const { t } = useTranslation();
  const steps = [
    { key: "identification", title: t('application.identification.title') },
    { key: "preferences", title: t('inquiry.certificate.preferences.title') },
    { key: "payment", title: t('inquiry.payment.title') },
    { key: "review", title: t('inquiry.overview.heading') },
  ] as const;

  // Enforce type safety for status keys and StatusType values
  const statusConfig: Record<StatusType, { icon: JSX.Element; title: string; color: string }> = {
    [Status.COMPLETED]: {
      icon: <CheckCircle width="22px" fill={colors.status.green} stroke="white" />,
      title: t('status.completed'),
      color: colors.status.green,
    },
    [Status.NOT_STARTED]: {
      icon: <AlertCircle width="22px" fill={colors.status.grey} stroke="white" />,
      title: t('status.not-started'),
      color: colors.status.grey,
    },
    [Status.IN_PROGRESS]: {
      icon: <CircleEllipsis width="22px" fill={colors.status.blue} stroke="white" />,
      title: t('status.in-progress'),
      color: colors.status.blue,
    }
  };

  const fallbackConfig = {
    icon: <AlertCircle width="22px" fill={colors.status.grey} stroke="white" />,
    title: t('status.unknown'),
    color: colors.status.grey,
  };

  const getStepTo = (key: string) => key === "identification" ? "." : key === "preferences" ? "preferences" : key === "payment" ? "payment" : "review";

  return (
    <List h="100px">
      {steps.map((step) => {
        // Safely cast for indexing
        const stepStatus = status[step.key as keyof typeof status] as StatusType;
        const config = statusConfig[stepStatus] ?? fallbackConfig;
        return (
          <Flex key={step.key} direction="column" gap="10px" pt="10px">
            <Flex direction="row" gap="10px" alignItems="center">
              {activeStep === step.key
                ? <RadioON style={{ width: "16px" }} />
                : <RadioOFF style={{ width: "16px" }} />}
              <Link
                as={RouterLink}
                to={getStepTo(step.key)}
                relative="path"                 // <-- important
                color={colors.theme.primary}
                fontWeight="semibold"
                // If you want to block forward nav until prior steps are done, keep this:
                style={{
                  pointerEvents: status[step.key as keyof typeof status] === Status.NOT_STARTED ? "none" : undefined,
                  opacity: status[step.key as keyof typeof status] === Status.NOT_STARTED ? 0.6 : 1,
                }}
              >
                {step.title}
              </Link>
            </Flex>
            <Flex ml="-2px" direction="row" alignItems="center" display={{ base: "none", md: "flex" }}>
              {config.icon}
              <Text size="sm" px="5px" color={config.color} fontWeight="semibold">
                {config.title}
              </Text>
            </Flex>
            <Divider />
          </Flex>
        );
      })}
    </List>
  );
}
