import DownloadIcon from "@assets/icons/download.svg?react";
import {
  Button,
  Flex,
  Grid,
  Heading,
  Link,
  Text
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink, useParams } from "react-router-dom";
import { colors } from "../../../../../chakra-overrides/colors";
import Breadcrumbs, {
  BreadcrumbPaths,
} from "../../../../../components/breadcrumbs/Breadcrumbs";

export default function Approved() {
  const { id } = useParams();
  const { t } = useTranslation();

  const breadcrumbs: BreadcrumbPaths = [
    [t('topics.education.title'), null],
    [t('popular-services.highschool-graduation-certificate'), "/education/highschool-graduation-certificate"],
    [t('button.my-inquiries'), `/education/highschool-graduation-certificate/my-inquiries`],
    [
      `#${id}`,
      `/education/highschool-graduation-certificate/my-inquiries/review/${id}`,
    ],
  ];
  return (
    <>
      <Breadcrumbs path={breadcrumbs} />

      <Flex
        gap="20px"
        direction="column"
        paddingBottom="20px"
        height="100%"
        flexGrow={1}
      >
        <Heading as="h1" size="md" variant="display">
          {t('highschool-graduation-certificate.approved.congratulations')} <br />
          {t('highschool-graduation-certificate.approved.approved-permit')}
        </Heading>
        <Text>
          {t('highschool-graduation-certificate.approved.description')}
        </Text>
        <Button
          variant="link"
          colorScheme="admin"
          justifyContent="start"
          leftIcon={<DownloadIcon />}
        >
          {t('highschool-graduation-certificate.approved.download-permit')}
        </Button>
        <Text>
          {t('highschool-graduation-certificate.approved.desc1')}.<br /><br />
          {t('highschool-graduation-certificate.approved.desc2')}{" "}
          <Link
            as={RouterLink}
            to="/login"
            style={{ color: colors.theme.primary }}
          >
            {t('button.my-inquiries')}
          </Link>
          .<br />
          <br />
          {t('highschool-graduation-certificate.approved.desc3')}{" "}
          <span style={{ color: colors.theme.primary }}>{t('highschool-graduation-certificate.approved.support')} </span>
          {t('highschool-graduation-certificate.approved.team')}.
        </Text>
        <Flex marginTop="auto" direction={{ base: "column", md: "row" }}>
          <Grid
            gap="10px"
            w="100%"
            gridAutoColumns={{ base: "100%", md: "50%" }}
            templateAreas={{
              base: `"a" "b"`,
              md: `"b a"`
            }}>
            <Button gridArea="a" as={RouterLink} to="./../feedback" colorScheme="admin" variant="solid" w="100%">
              {t('button.continue')}
            </Button>
            <Button gridArea="b" colorScheme="admin" variant="outline" w="100%">
              {t('button.download-permit')}
            </Button>
          </Grid>
        </Flex>
      </Flex>
    </>
  );
}
