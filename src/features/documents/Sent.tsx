import {
  Button,
  Flex,
  Heading,
  Link,
  Text,
  VStack
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { colors } from "../../chakra-overrides/colors";
import Accordion from "../../components/accordion/Accordion";
import AccordionItem from "../../components/accordion/AccordionItem";

export default function FilesSent() {
  const { t } = useTranslation();
  return (
    <Flex direction="column" flexGrow={1}>
      <Flex direction="column" gap="20px">
        <Heading variant="headline">{t('application.documents.sent.title')}</Heading>
        <Text >
        {t('application.documents.sent.description')}
        </Text>
        <Text fontWeight="bold">
        {t('application.documents.sent.next-steps')}
        </Text>
        <Accordion allowMultiple allowToggle>
          <AccordionItem title={t('application.accordion.application-review.title')}>
            <>
              <Text>
              {t('application.accordion.application-review.desc1')}<br /><br />
              {t('application.accordion.application-review.desc2')}<Link as={RouterLink} to="/housing/construction-permit/my-applications" textColor={colors.theme.primary}>{t('application.documents.sent.permit-applications')}</Link>.<br /><br />
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
              </Text><br/>
              <Text fontWeight="bold">{t('application.accordion.required-fee.desc2')}</ Text><br/>
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
      <Flex padding="10px" marginTop="auto">
        <VStack w="100%">
          <Button as={RouterLink} to="/" colorScheme="admin" variant="solid" w="100%">
          {t('button.home')}
          </Button>
          <Button as={RouterLink} to="/housing/construction-permit/my-applications"  colorScheme="admin" variant="outline" w="100%">
          {t('button.my-applications')}
          </Button>
        </VStack>
      </Flex>
    </Flex>
  );
}
