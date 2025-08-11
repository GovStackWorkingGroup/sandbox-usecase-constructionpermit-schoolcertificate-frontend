import AlertCircle from "@assets/icons/alert-circle.svg?react";
import CheckCircle from "@assets/icons/check-circle-2.svg?react";
import CircleEllipsis from "@assets/icons/circle-ellipsis.svg?react";
import PauseCircle from "@assets/icons/pause-circle.svg?react";
import XCircle from "@assets/icons/x-circle.svg?react";
import { Flex, Text } from "@chakra-ui/react";
import { colors } from "../../chakra-overrides/colors";
import { useTranslation } from "react-i18next";

export enum Status {
  COMPLETED = "COMPLETED",
  NOT_STARTED = "NOT STARTED",
  IN_PROGRESS = "IN PROGRESS",
  REJECTED = "REJECTED",
  IN_REVIEW = "IN REVIEW",
  ACTION_NEEDED = "ACTION NEEDED",
  DRAFT = "DRAFT",
  APPROVED = "APPROVED",
}



interface ApplicationStatusProps {
  status: Status;
}

export default function ApplicationStatus({ status }: ApplicationStatusProps) {
  const { t } = useTranslation();

  const statusConfig = {
    [Status.COMPLETED]: {
      icon: <CheckCircle fill={colors.status.green} stroke="white"/>,
      title: t('status.completed'),
      color: colors.status.green,
    },
    [Status.NOT_STARTED]: {
      icon: <AlertCircle fill={colors.status.grey} stroke="white"/>,
      title: t('status.not-started'),
      color: colors.status.grey,
    },
    [Status.IN_PROGRESS]: {
      icon: <CircleEllipsis fill={colors.status.blue} stroke="white"/>,
      title: t('status.in-progress'),
      color: colors.status.blue,
    },
    [Status.REJECTED]: {
      icon: <XCircle fill={colors.status.red} stroke="white"/>,
      title: t('status.rejected'),
      color: colors.status.red,
    },
    [Status.IN_REVIEW]: {
      icon: <CircleEllipsis fill={colors.status.yellow} stroke="white"/>,
      title: t('status.in-review'),
      color: colors.status.yellow,
    },
    [Status.ACTION_NEEDED]: {
      icon: <AlertCircle fill={colors.status.red} stroke="white"/>,
      title: t('status.action-needed'),
      color: colors.status.red,
    },
    [Status.DRAFT]: {
      icon: <PauseCircle fill={colors.status.grey} stroke="white"/>,
      title: t('status.draft'),
      color: colors.status.grey,
    },
    [Status.APPROVED]: {
      icon: <CheckCircle fill={colors.status.green} stroke="white"/>,
      title: t('status.approved'),
      color: colors.status.green,
    },
  };
  return (
    <>
      <Flex direction="row" p="5px" alignItems="center">
        {statusConfig[status].icon}
        <Text
          size="sm"
          px="5px"
          color={statusConfig[status].color}
          fontWeight="semibold"
        >
          {statusConfig[status].title}
        </Text>
      </Flex>
    </>
  );
}
