import AlertIcon from "@assets/icons/alert-circle.svg?react";
import PlusIcon from "@assets/icons/plus.svg?react";
import {
  Button,
  Flex,
  ListItem,
  Spacer,
  Text,
  UnorderedList
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { colors } from "../../../../../chakra-overrides/colors";
import { Application } from "../../../../../rpc/types";

export default function ApplicationAction({
  action,
  id,
  application,
}: {
  action:
  | "inReview"
  | "scheduleInspection"
  | "upcomingInspection"
  | "documentsRequired"
  | "paymentRequired"
  | string;
  id?: string;
  application: Application;
}) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  switch (action) {
    case "paymentRequired":
      return (
        <>
          <Flex
            direction="column"
            p="20px"
            mr="-20px"
            ml="-20px"
            gap="20px"
            bg={colors.secondary[50]}
          >
            <Text variant="title" size="lg">
              {t('actions.payment.title')}
            </Text>
            <Text>
              {t('actions.payment.description')}
            </Text>
            <Button colorScheme="admin" as={RouterLink} to={`payment`}>
              {t('application.payment.title')}
            </Button>
          </Flex>
        </>
      );

    case "scheduleInspection":
      return (
        <>
          <Flex
            direction="column"
            p="20px"
            mr="-20px"
            ml="-20px"
            gap="20px"
            bg={colors.secondary[50]}
          >
            <Flex direction="row" gap="20px" alignItems="center">
              <Text variant="title" size="lg">
                {t('actions.inspection.schedule.title')}
              </Text>{" "}
              <Spacer />
              <AlertIcon stroke="black" />
            </Flex>
            <Text>
              {t('actions.inspection.schedule.desc1')}<br />
              {t('actions.inspection.schedule.desc2')}
            </Text>
            <Button w="100%" onClick={() => navigate("./schedule-inspection")} colorScheme="admin" variant="solid">
              {t('actions.inspection.schedule.select-date')}
            </Button>
          </Flex>
        </>
      );

    case "upcomingInspection":
      return (
        <>
          <Flex
            direction="column"
            p="20px"
            mr="-20px"
            ml="-20px"
            gap="20px"
            bg={colors.secondary[50]}
          >
            <Flex direction="row" gap="20px" alignItems="center">
              <Text variant="title" size="lg">
                {t('actions.inspection.upcoming.title')}
              </Text>{" "}
              <Spacer />
              <AlertIcon stroke="black" />
            </Flex>
            <Text>
              {t('actions.inspection.upcoming.description')}.
            </Text>
            <Text>
              {t('actions.inspection.upcoming.slot.date')}: <span style={{ fontWeight: "bold" }}>17/08/2023</span>
              <br />
              {t('actions.inspection.upcoming.slot.time')}: <span style={{ fontWeight: "bold" }}>9:00 - 12:00</span>
            </Text>
            <Flex
              direction="row"
              gap="20px"
              p="10px"
              color={colors.theme.primary}
            >
              <PlusIcon stroke={colors.theme.primary} />
              <Text fontWeight="semibold">{t('button.add-to-calendar')}</Text>
            </Flex>
            <Text>
              {t('actions.inspection.upcoming.change-date-text')}{" "}
              <span style={{ color: colors.theme.primary }}>{t('construction-permit.approved.support')}</span>.
            </Text>
          </Flex>
        </>
      );

    case "documentsRequired":
      return (
        <>
          <Flex
            direction="column"
            p="20px"
            mr="-20px"
            ml="-20px"
            gap="20px"
            bg={colors.secondary[50]}
          >
            <Flex direction="row" gap="20px" alignItems="center">
              <Text variant="title" size="lg">
                {t('actions.documents.title')}
              </Text>{" "}
              <Spacer />
              <AlertIcon stroke="black" />
            </Flex>
            <Text>{t('actions.documents.description')}</Text>
            <Text>{t('actions.documents.requested-documents')}:</Text>
            <UnorderedList color={colors.theme.primary} paddingX="10px">
              {application?.pendingDocuments.map((document) => (
                <>
                  <ListItem>
                    <Text fontWeight="bold">{document.name}</Text>
                  </ListItem>
                </>
              ))}
            </UnorderedList>
            <Button
              w="100%"
              colorScheme="admin"
              variant="solid"
              onClick={() =>
                navigate(
                  `../../construction-permit/application/${application?.id}/documents`,
                )
              }
            >
              {t('application.documents.upload.title')}
            </Button>
          </Flex>
        </>
      );

    default:
      return (
        <>
          <Flex
            direction="column"
            p="20px"
            mr="-20px"
            ml="-20px"
            gap="20px"
            bg={colors.secondary[50]}
          >
            <Text variant="title" size="lg">
              {t('actions.in-review.title')}
            </Text>
            <Text>
              {t('actions.in-review.desc1')}
            </Text>
            <Text>
              {t('actions.in-review.desc2')}
            </Text>
          </Flex>
        </>
      );
  }
}
