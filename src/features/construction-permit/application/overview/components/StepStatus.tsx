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

interface StepProps {
  id: string,
  activeStep: "parcel" | "identification" | "documents" | "overview",
  status: {
    parcel: Status.NOT_STARTED | Status.IN_PROGRESS | Status.COMPLETED,
    identification: Status.NOT_STARTED | Status.IN_PROGRESS | Status.COMPLETED,
    documents: Status.NOT_STARTED | Status.IN_PROGRESS | Status.COMPLETED,
  }
}

export default function StepStatus(
  {
    id,
    activeStep,
    status
  }:
  StepProps,
) {
  const { t } = useTranslation();

  const steps = {
    parcel: {
      step: "parcel",
      title: t('application.parcel.title')
    },
    identification: {
      step: "identification",
      title: t('application.identification.title')
    },
    documents: {
      step: "documents",
      title: t('application.documents.title')
    },
  }

  const statusConfig = {
    [Status.COMPLETED]: {
      icon: <CheckCircle width="22px" fill={colors.status.green} stroke="white"/>,
      title: t('status.completed'),
      color: colors.status.green,
    },
    [Status.NOT_STARTED]: {
      icon: <AlertCircle width="22px" fill={colors.status.grey} stroke="white"/>,
      title: t('status.not-started'),
      color: colors.status.grey,
    },
    [Status.IN_PROGRESS]: {
      icon: <CircleEllipsis width="22px" fill={colors.status.blue} stroke="white"/>,
      title: t('status.in-progress'),
      color: colors.status.blue,
    }
  }

  return (
    <List h="100px">
      {
      Object.entries(status).map((step) => (
        <Flex direction="column" gap="10px" pt="10px">
          <Flex direction="row" gap="10px" alignItems="center">
            {activeStep == step[0]?<RadioON style={{width: "16px"}}/>:<RadioOFF style={{width: "16px"}}/>}
              <Link
                as={RouterLink}
                to={`../${id}/${step[0]}`}
                color={colors.theme.primary} fontWeight="semibold">{
                (step[0] == "parcel" ||
                step[0] == "identification" ||
                step[0] == "documents")?
              steps[step[0]].title:""}
              </Link>
          </Flex>
          <Flex ml="-2px" direction="row" alignItems="center" display={{base: "none", md: "flex"}}>
            {statusConfig[step[1]].icon}
            <Text
              size="sm"
              px="5px"
              color={statusConfig[step[1]].color}
              fontWeight="semibold"
            >
              {statusConfig[step[1]].title}
            </Text>
          </Flex>
          <Divider />
        </Flex>
      ))
    }
    </List>
  );
}
