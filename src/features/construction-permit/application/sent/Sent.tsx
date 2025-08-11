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
import { colors } from "../../../../chakra-overrides/colors";
import Accordion from "../../../../components/accordion/Accordion";
import AccordionItem from "../../../../components/accordion/AccordionItem";

export default function ApplicationSent() {
  const { id } = useParams();
  const { t } = useTranslation();
  return (
    <Flex direction="column" flexGrow={1}>
      <Flex direction="column" gap="20px" mb="20px">
        <Heading variant="title" size="md">
          {t('application.submitted.title')}
        </Heading>
        <Text variant="title" color={colors.secondary[600]}>
          {t('application.application-number')}{id}
        </Text>
        <Text>
          {t('application.submitted.description')}
        </Text>
        <Text fontWeight="bold">{t('application.documents.sent.next-steps')}</Text>
        <Accordion allowMultiple allowToggle>
          <AccordionItem title={t('application.accordion.application-review.title')}>
            <>
              <Text>
              {t('application.accordion.application-review.desc1')}<br /><br />
                {t('application.accordion.application-review.desc2')}{" "}
                <Link as={RouterLink} to="/" textColor={colors.theme.primary}>
                  {t('application.permit-applications')}
                </Link>{" "}<br /><br />
                {t('application.accordion.application-review.desc3')}
              </Text>
            </>
          </AccordionItem>
          <AccordionItem title={t('application.accordion.additional-requests.title')}>
            <>
              <Text>
              {t('application.accordion.additional-requests.description')}
              </Text>
            </>
          </AccordionItem>
          <AccordionItem title={t('application.accordion.required-fee.title')}>
            <>
              <Text>
              {t('application.accordion.required-fee.desc1')}
              </Text>
              <br />
              <Text fontWeight="bold">{t('application.accordion.required-fee.desc2')}</Text>
              <br />
              <Link as={RouterLink} to="/" textColor={colors.theme.primary}>
              {t('application.accordion.required-fee.desc3')}
              </Link>
            </>
          </AccordionItem>
          <AccordionItem title={t('application.accordion.outcome.title')}>
            <>
              <Text>
              {t('application.accordion.outcome.description')}
              </Text>
            </>
          </AccordionItem>
        </Accordion>
      </Flex>
      <Flex padding="10px" marginTop="auto" direction={{base: "column", md: "row"}}>
        <Grid
          gap="10px"
          w="100%"
          gridAutoColumns={{base:"100%", md: "50%"}}
          templateAreas={{
            base: `"a" "b"`,
            md: `"b a"`
          }}>
          <Button gridArea="a" as={RouterLink} to="/" colorScheme="admin"variant="solid" w="100%">
            {t('button.home')}
          </Button>
          <Button
            gridArea="b"
            as={RouterLink}
            to="/housing/construction-permit/my-applications"
            colorScheme="admin"
            variant="outline"
            w="100%"
          >
            {t('button.my-applications')}
          </Button>
        </Grid>
      </Flex>
    </Flex>
  );
}
