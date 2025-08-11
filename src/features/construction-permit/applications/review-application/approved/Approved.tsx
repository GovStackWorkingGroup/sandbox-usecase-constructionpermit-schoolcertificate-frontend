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
    [t('topics.housing.title'), null],
    [t('popular-services.construction-permit'), "/housing/construction-permit"],
    [t('button.my-applications'), `/housing/construction-permit/my-applications`],
    [
      `#${id}`,
      `/housing/construction-permit/my-applications/review/${id}`,
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
        {t('construction-permit.approved.congratulations')} <br />
        {t('construction-permit.approved.approved-permit')}
        </Heading>
        <Text>
        {t('construction-permit.approved.description')}
        </Text>
        <Button
          variant="link"
          colorScheme="admin"
          justifyContent="start"
          leftIcon={<DownloadIcon />}
        >
          {t('construction-permit.approved.download-permit')}
        </Button>
        <Text>
        {t('construction-permit.approved.desc1')}.<br /><br />
        {t('construction-permit.approved.desc2')}{" "}
          <Link
            as={RouterLink}
            to="/login"
            style={{ color: colors.theme.primary }}
          >
           {t('button.my-applications')}
          </Link>
          .<br />
          <br />
          {t('construction-permit.approved.desc3')}{" "}
          <span style={{ color: colors.theme.primary }}>{t('construction-permit.approved.support')} </span>
          {t('construction-permit.approved.team')}.
        </Text>
        <Flex marginTop="auto" direction={{base: "column", md: "row"}}>
          <Grid
            gap="10px"
            w="100%"
            gridAutoColumns={{base:"100%", md: "50%"}}
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
