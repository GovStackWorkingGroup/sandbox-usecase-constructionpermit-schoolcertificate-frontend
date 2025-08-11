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
import { Link as RouterLink, useLocation } from "react-router-dom";
import { colors } from "../../chakra-overrides/colors";
import Accordion from "../../components/accordion/Accordion";
import AccordionItem from "../../components/accordion/AccordionItem";
import Breadcrumbs, {
  BreadcrumbPaths,
} from "../../components/breadcrumbs/Breadcrumbs";
import Protected from "../../components/protected/Protected";
import { RPCContext } from "../../rpc/rpc";
import { useAuthentication } from "../../utilities/useAuthentication";

export default function ConstructionPermit() {
  const { t } = useTranslation();
  const breadcrumbs: BreadcrumbPaths = [
    [t('topics.housing.title'), null],
    [t('popular-services.construction-permit'), "/housing/construction-permit"],
  ];

  const { isAuthenticated } = useAuthentication();
  const rpc = useContext(RPCContext);
  const path = useLocation().pathname.substring(1);

  if (isAuthenticated()) {
    const { data: activity } = useQuery(`recent-activity`, rpc.getRecentActivity);
    useEffect(() => {
      if (activity) {
        if (activity.findIndex((activity) => activity.name == `Construction Permit`) != 0) {
          rpc.setRecentActivity(JSON.stringify([...activity.slice(-5).filter((activity) => activity.name != `Construction Permit`), { name: `Construction Permit`, path: `./housing/construction-permit` }]));
        }
      }
    }, []);
  }
  return (
    <Flex direction="column" flexGrow={1}>
      <Grid
        templateAreas={{
          xs: `"breadcrumbs" "heading" "construction-permit" "apply-section"`,
          sm: `"breadcrumbs" "heading" "construction-permit" "apply-section"`,
          md: `"breadcrumbs breadcrumbs"
        "construction-permit apply-section"
        "construction-permit -"`,
        }}
      >
        <GridItem area="breadcrumbs">
          <Breadcrumbs path={breadcrumbs} />
        </GridItem>
        <GridItem area=" construction-permit" gap="20px">
          <Heading variant="headline">{t('popular-services.construction-permit')}</Heading><br />
          <Text>
            {t('construction-permit.description')}
          </Text><br />
          <Accordion>
            <AccordionItem title={t('construction-permit.tabs.required-documents.title')}>
              <>
                <Text>
                  {t('construction-permit.tabs.required-documents.description')}:
                </Text>
                <UnorderedList>
                  <ListItem>
                    <Text>{t('application.parcel.parcel-info.parcel-number')}</Text>
                  </ListItem>
                  <ListItem>
                    <Text>
                      {t('construction-permit.tabs.required-documents.item1')}
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text>
                      Block/Site Plan (Document format can be .dwg, .dxf, .dgn,
                      .rfa or .pln)
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text>
                      Detailed Plans Scale 1:50 (Document format can be .dwg,
                      .dxf, .dgn, .rfa or .pln)
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text>Estimate time and cost of the projects</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Property Title</Text>
                  </ListItem>
                </UnorderedList>
              </>
            </AccordionItem>
            <AccordionItem title={t('construction-permit.tabs.required-fees.title')}>
              <>
                <Text>
                  {t('construction-permit.tabs.required-fees.desc1')}
                </Text>
                <Text>
                  <strong>{t('application.accordion.required-fee.desc2')}</strong>
                </Text>
                <Link href="#">{t('construction-permit.tabs.required-fees.payment-fee')}</Link>
              </>
            </AccordionItem>
            <AccordionItem title={t('construction-permit.tabs.alternative-access-support.title')}>
              <>
                <Text>
                  {t('construction-permit.tabs.alternative-access-support.desc1')}
                </Text>
                <Text>
                  {t('construction-permit.tabs.alternative-access-support.desc2')}
                </Text>

                <Text>{t('construction-permit.tabs.alternative-access-support.service-providers.title')}:</Text>
                <Text>
                  <strong>{t('construction-permit.tabs.alternative-access-support.service-providers.city-planning-dept')}</strong>
                </Text>
                <UnorderedList>
                  <ListItem>
                    <Text>{t('construction-permit.tabs.alternative-access-support.service-providers.address')}: 456 Park Avenue, Metropolisville</Text>
                  </ListItem>
                  <ListItem>
                    <Text>{t('application.identification.contact-information.phone')}: (555) 987-6543</Text>
                  </ListItem>
                  <ListItem>
                    <Text>{t('application.identification.contact-information.email')}: planningdept@metropolisville.gov</Text>
                  </ListItem>
                  <ListItem>
                    <Text>{t('construction-permit.tabs.alternative-access-support.service-providers.website')}: www.metropolisville.gov/planning</Text>
                  </ListItem>
                  <ListItem>
                    <Text>
                      {t('construction-permit.tabs.alternative-access-support.service-providers.service-area')}: East Metropolisville, West Metropolisville,
                      and Green Meadows
                    </Text>
                  </ListItem>
                </UnorderedList>
                <Text>
                  <strong>{t('construction-permit.tabs.alternative-access-support.service-providers.city-planning-dept')}</strong>
                </Text>
                <UnorderedList>
                  <ListItem>
                    <Text>{t('construction-permit.tabs.alternative-access-support.service-providers.address')}: 456 Park Avenue, Metropolisville</Text>
                  </ListItem>
                  <ListItem>
                    <Text>{t('application.identification.contact-information.phone')}: (555) 987-6543</Text>
                  </ListItem>
                  <ListItem>
                    <Text>{t('application.identification.contact-information.email')}: planningdept@metropolisville.gov</Text>
                  </ListItem>
                  <ListItem>
                    <Text>{t('construction-permit.tabs.alternative-access-support.service-providers.website')}: www.metropolisville.gov/planning</Text>
                  </ListItem>
                  <ListItem>
                    <Text>
                      {t('construction-permit.tabs.alternative-access-support.service-providers.service-area')}: East Metropolisville, West Metropolisville,
                      and Green Meadows
                    </Text>
                  </ListItem>
                </UnorderedList>
                <Text>
                  <strong>{t('construction-permit.tabs.alternative-access-support.service-providers.city-planning-dept')}</strong>
                </Text>
                <UnorderedList>
                  <ListItem>
                    <Text>{t('construction-permit.tabs.alternative-access-support.service-providers.address')}: 456 Park Avenue, Metropolisville</Text>
                  </ListItem>
                  <ListItem>
                    <Text>{t('application.identification.contact-information.phone')}: (555) 987-6543</Text>
                  </ListItem>
                  <ListItem>
                    <Text>{t('application.identification.contact-information.email')}: planningdept@metropolisville.gov</Text>
                  </ListItem>
                  <ListItem>
                    <Text>{t('construction-permit.tabs.alternative-access-support.service-providers.website')}: www.metropolisville.gov/planning</Text>
                  </ListItem>
                  <ListItem>
                    <Text>
                      {t('construction-permit.tabs.alternative-access-support.service-providers.service-area')}: East Metropolisville, West Metropolisville,
                      and Green Meadows
                    </Text>
                  </ListItem>
                </UnorderedList>
              </>
            </AccordionItem>
            <AccordionItem title={t('construction-permit.tabs.similar-services.title')}>
              <></>
            </AccordionItem>
          </Accordion>
        </GridItem>
        <Flex
          gridArea="apply-section"
          background={colors.secondary[50]}
          mr={{ base: "-20px", md: "20px", lg: "20px" }}
          ml={{ base: "-20px", md: "20px", lg: "20px" }}
          p="20px"
          gap="20px"
          direction="column"
          borderRadius={{ md: "20px" }}
          width={{ md: "300px" }}
          height="auto"
        >
          <Protected
            authorized={
              <>
                <Box>
                  <Heading variant="title" size="sm" as="h3">
                    {t('construction-permit.apply-online')}
                  </Heading>
                </Box>
                <Button
                  as={RouterLink}
                  to={`application/${Math.floor(Math.random() * (999999 - 100000)) + 100000
                    }`}
                  colorScheme="admin"
                >
                  {t('button.create-application')}
                </Button>
                <Button
                  variant="outline"
                  as={RouterLink}
                  to="my-applications"
                  colorScheme="admin"
                >
                  {t('button.my-applications')}
                </Button>
              </>
            }
            unauthorized={
              <>
                <Box>
                  <Heading variant="title" size="sm" as="h3">
                    {t('construction-permit.apply-online')}
                  </Heading>
                  <Text size="sm">{t('construction-permit.login-to-access-service')}</Text>
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
