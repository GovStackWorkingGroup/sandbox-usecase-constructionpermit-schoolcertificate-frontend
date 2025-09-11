import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Link,
  ListItem,
  Text,
  UnorderedList
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { colors } from "../../chakra-overrides/colors";
import Accordion from "../../components/accordion/Accordion";
import AccordionItem from "../../components/accordion/AccordionItem";
import Breadcrumbs, {
  BreadcrumbPaths,
} from "../../components/breadcrumbs/Breadcrumbs";
import Protected from "../../components/protected/Protected";
import { RPCContext } from "../../rpc/rpc";
import { useAuthentication } from "../../utilities/useAuthentication";
import { Status } from "../../components/status/ApplicationStatus";

export default function HighSchoolGraduationCertificate() {
  const { t } = useTranslation();
  const breadcrumbs: BreadcrumbPaths = [
    [t('topics.education.title'), null],
    [t('popular-services.highschool-graduation-certificate'), "/education/highschool-graduation-certificate"],
  ];
  const { isAuthenticated } = useAuthentication();
  const rpc = useContext(RPCContext);
  const path = useLocation().pathname.substring(1);

  const navigate = useNavigate();
  if (isAuthenticated()) {
    const { data: activity } = useQuery(`recent-activity`, rpc.getRecentActivity);
    useEffect(() => {
      if (activity) {
        if (activity.findIndex((activity) => activity.name == `High School Graduation Certificate Inquiry`) != 0) {
          rpc.setRecentActivity(JSON.stringify([...activity.slice(-5).filter((activity) => activity.name != `High School Graduation Certificate Inquiry`), { name: `High School Graduation Certificate Inquiry`, path: `./education/highschool-graduation-certificate` }]));
        }
      }
    }, []);
  }

  function handleStart() {
    // Generate a random 6-digit id (or whatever logic you want)
    const id = String(Math.floor(Math.random() * (999999 - 100000)) + 100000);
    // Optionally: Store the new inquiry in localStorage
    // (you can extend this to push to an API/backend if needed)
    const inquiry = {
      id,
      status: Status.DRAFT,
      action: "",
      studentFullName: "",
      studentAddress: "",
      certificateID: "",
      identification: [],
    };
    localStorage.setItem("inquiry", JSON.stringify(inquiry));

    // Navigate to the new inquiry
    navigate(`/education/highschool-graduation-certificate/inquiry/${id}`);
  }

  return (
    <Flex direction="column" flexGrow={1}>
      <Grid
        templateAreas={{
          xs: `"breadcrumbs" "heading" "highschool-graduation-certificate" "apply-section"`,
          sm: `"breadcrumbs" "heading" "highschool-graduation-certificate" "apply-section"`,
          md: `"breadcrumbs breadcrumbs"
        "highschool-graduation-certificate apply-section"
        "highschool-graduation-certificate -"`,
        }}
      >
        <GridItem area="breadcrumbs">
          <Breadcrumbs path={breadcrumbs} />
        </GridItem>
        <GridItem area="highschool-graduation-certificate" gap="20px">
          <Heading variant="headline">{t('popular-services.highschool-graduation-certificate')}</Heading><br />
          <Text>
            {t('highschool-graduation-certificate.description')}
          </Text><br />
          <Text>
            {t('highschool-graduation-certificate.desc1')}
          </Text><br />
          <Accordion>
            <AccordionItem title={t('highschool-graduation-certificate.tabs.required-documents.title')}>
              <Box as="ul" pl={4} style={{ listStyleType: 'disc' }}>
               <li>
                <Text>
                  {t('inquiry.identification.title')}
                </Text>
                </li>
                 <li>
                <Text>
                  {t('inquiry.identification.preferences.selection')}
                </Text>
                </li>
              </Box>
            </AccordionItem>
            <AccordionItem title={t('highschool-graduation-certificate.tabs.required-fees.title')}>
              <Box as="ul" pl={4} style={{ listStyleType: 'disc' }}>
    <li>
      <Text>{t('highschool-graduation-certificate.tabs.required-fees.generate-certificate')}</Text>
    </li>
    <li>
      <Text>{t('highschool-graduation-certificate.tabs.required-fees.printing-fee')}</Text>
    </li>
    <li>
      <Text>{t('highschool-graduation-certificate.tabs.required-fees.creation-records')}</Text>
    </li>
    <li>
      <Text>{t('highschool-graduation-certificate.tabs.required-fees.shipment-fee')}</Text>
    </li>
  </Box>
            </AccordionItem>
            <AccordionItem title={t('highschool-graduation-certificate.tabs.alternative-access-support.title')}>
              <>
                <Text>
                  {t('highschool-graduation-certificate.tabs.alternative-access-support.desc1')}
                </Text>
              </>
            </AccordionItem>
            <AccordionItem title={t('highschool-graduation-certificate.tabs.similar-services.title')}>
              <>{t('highschool-graduation-certificate.tabs.similar-services.description')}</>
            </AccordionItem>
          </Accordion>
        </GridItem>
        <Flex
          gridArea="apply-section"
          background={colors.secondary[50]}
          mr={{ base: "-20px", md: "20px", lg: "5px" }}
          ml={{ base: "-20px", md: "20px", lg: "5px" }}
          p="30px"
          gap="20px"
          direction="column"
          borderRadius={{ md: "20px" }}
          width={{ md: "350px" }}
          height="auto"
        >
          <Protected
            authorized={
              <>
                <Box>
                  <Heading variant="title" size="sm" as="h3">
                    {t('highschool-graduation-certificate.apply-online')}
                  </Heading>
                </Box>
                <Text size="sm">{t('highschool-graduation-certificate.desc2')}</Text>
                <Button colorScheme="admin" onClick={handleStart}>
                  {t('button.generate-certificate')}
                </Button>
              </>
            }
            unauthorized={
              <>
                <Box>
                  <Heading variant="title" size="sm" as="h3">
                    {t('highschool-graduation-certificate.apply-online')}
                  </Heading>
                  <Text size="sm">{t('highschool-graduation-certificate.login-to-access-service')}</Text>
                </Box>
                <Button as={RouterLink} to={`/login?referrer=${path}`} colorScheme="admin">
                  {t('button.login')}
                </Button>
              </>
            }
          ></Protected>
        </Flex>
      </Grid>
    </Flex>
  );
}
