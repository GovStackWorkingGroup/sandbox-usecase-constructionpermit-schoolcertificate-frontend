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

export default function InquirySent() {
  const { id } = useParams();
  const { t } = useTranslation();
  return (
    <Flex direction="column" flexGrow={1}>
      <Flex direction="column" gap="20px" mb="20px">
        <Heading variant="title" size="md">
          {t('inquiry.submitted.title')}
        </Heading>
        <Text variant="title" color={colors.secondary[600]}>
          {t('inquiry.inquiry-number')}{id}
        </Text>
        <Text>
          {t('inquiry.submitted.description')}
        </Text>
        <Text fontWeight="bold">{t('inquiry.documents.sent.next-steps')}</Text>
        <Accordion allowMultiple allowToggle>
          <AccordionItem title={t('inquiry.accordion.inquiry-review.title')}>
            <>
              <Text>
                {t('inquiry.accordion.inquiry-review.desc1')}<br /><br />
                {t('inquiry.accordion.inquiry-review.desc2')}{" "}
                <Link as={RouterLink} to="/" textColor={colors.theme.primary}>
                  {t('inquiry.permit-inquirys')}
                </Link>{" "}<br /><br />
                {t('inquiry.accordion.inquiry-review.desc3')}
              </Text>
            </>
          </AccordionItem>
          <AccordionItem title={t('inquiry.accordion.additional-requests.title')}>
            <>
              <Text>
                {t('inquiry.accordion.additional-requests.description')}
              </Text>
            </>
          </AccordionItem>
          <AccordionItem title={t('inquiry.accordion.required-fee.title')}>
            <>
              <Text>
                {t('inquiry.accordion.required-fee.desc1')}
              </Text>
              <br />
              <Text fontWeight="bold">{t('inquiry.accordion.required-fee.desc2')}</Text>
              <br />
              <Link as={RouterLink} to="/" textColor={colors.theme.primary}>
                {t('inquiry.accordion.required-fee.desc3')}
              </Link>
            </>
          </AccordionItem>
          <AccordionItem title={t('inquiry.accordion.outcome.title')}>
            <>
              <Text>
                {t('inquiry.accordion.outcome.description')}
              </Text>
            </>
          </AccordionItem>
        </Accordion>
      </Flex>
      <Flex padding="10px" marginTop="auto" direction={{ base: "column", md: "row" }}>
        <Grid
          gap="10px"
          w="100%"
          gridAutoColumns={{ base: "100%", md: "50%" }}
          templateAreas={{
            base: `"a" "b"`,
            md: `"b a"`
          }}>
          <Button gridArea="a" as={RouterLink} to="/" colorScheme="admin" variant="solid" w="100%">
            {t('button.home')}
          </Button>
          <Button
            gridArea="b"
            as={RouterLink}
            to="/education/highschool-graduation-certificate/my-inquiries"
            colorScheme="admin"
            variant="outline"
            w="100%"
          >
            {t('button.my-inquiries')}
          </Button>
        </Grid>
      </Flex>
    </Flex>
  );
}
