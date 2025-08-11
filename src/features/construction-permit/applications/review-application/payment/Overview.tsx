import CreditCard from "@assets/icons/credit-card.svg?react";
import DigitalWallet from "@assets/icons/digital-wallet.svg?react";
import MobilePayment from "@assets/icons/mobile-payment.svg?react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { colors } from "../../../../../chakra-overrides/colors";

export default function PaymentOverview() {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <Heading variant="headline">Payment</Heading>
      <Text>{t('application.application-number')}{id}</Text>
      <Text>
        {t('application.payment.overview.description')}
      </Text>
      <Text>{t('application.payment.overview.review-details.title')}:</Text>
      <Flex
        p="10px"
        flexDirection="column"
        backgroundColor={colors.secondary[50]}
      >
        <Flex
          p="10px 20px"
          justifyContent="space-between"
          borderBottom="1px dashed #000"
        >
          <Text>{t('application.payment.overview.review-details.site-visit')}</Text>
          <Text>240 €</Text>
        </Flex>
        <Flex
          p="10px 20px"
          borderBottom="1px dashed #000"
          justifyContent="space-between"
        >
          <Text>{t('application.payment.overview.review-details.certificate-validation')}</Text>
          <Text>120 €</Text>
        </Flex>
        <Flex p="10px 20px" justifyContent="space-between">
          <Text>{t('application.payment.overview.review-details.record-creation')}</Text>
          <Text>120 €</Text>
        </Flex>
        <Flex
          borderTop="1px solid #000"
          p="10px 20px"
          justifyContent="space-between"
        >
          <Text>{t('application.payment.overview.review-details.total')}</Text> <Text>480 €</Text>
        </Flex>
      </Flex>
      <Text variant="title">{t('application.payment.overview.payment-options.title')}</Text>
      <Text>{t('application.payment.overview.payment-options.description')}</Text>
      <Text variant="label" color={colors.secondary[700]} size="sm">
      {t('application.payment.overview.payment-options.online.title')}
      </Text>
      <Flex flexDirection="column">
        <Button
          height="auto"
          p="10px"
          borderRadius="0"
          textAlign="left"
          backgroundColor={colors.secondary[0]}
          gap="10px"
          as={RouterLink}
          to="bank-payment"
        >
          <CreditCard stroke={colors.secondary[1000]} />
          <Flex w="100%" alignItems="center">
            <Box>
              <Text>{t('application.payment.overview.payment-options.online.debit.title')}</Text>
              <Text whiteSpace="break-spaces">{t('application.payment.overview.payment-options.online.debit.description')}</Text>
            </Box>
            <ChevronRightIcon marginLeft="auto" viewBox="24px 24px" />
          </Flex>
        </Button>
        <Button
          height="auto"
          p="10px"
          borderRadius="0"
          textAlign="left"
          backgroundColor={colors.secondary[0]}
          gap="10px"
        >
          <MobilePayment stroke={colors.secondary[1000]} />

          <Flex w="100%" alignItems="center">
            <Box>
              <Text>{t('application.payment.overview.payment-options.online.mobile.title')}</Text>
              <Text whiteSpace="break-spaces">{t('application.payment.overview.payment-options.online.mobile.description')}</Text>
            </Box>
            <ChevronRightIcon marginLeft="auto" viewBox="24px 24px" />
          </Flex>
        </Button>
        <Button
          height="auto"
          p="10px"
          borderRadius="0"
          textAlign="left"
          backgroundColor={colors.secondary[0]}
          gap="10px"
        >
          <DigitalWallet stroke={colors.secondary[1000]} />

          <Flex w="100%" alignItems="center">
            <Box>
              <Text>{t('application.payment.overview.payment-options.online.wallet.title')}</Text>
              <Text whiteSpace="break-spaces">{t('application.payment.overview.payment-options.online.wallet.description')}</Text>
            </Box>
            <ChevronRightIcon marginLeft="auto" viewBox="24px 24px" />
          </Flex>
        </Button>
      </Flex>
      <Text variant="label" color={colors.secondary[700]} size="sm">
      {t('application.payment.overview.payment-options.bank-transfer.title')}
      </Text>
      <Text>
      {t('application.payment.overview.payment-options.bank-transfer.description')}:
      </Text>
      <UnorderedList>
        <ListItem>{t('application.payment.overview.payment-options.bank-transfer.bank-name')}</ListItem>
        <ListItem>
        {t('application.payment.overview.payment-options.bank-transfer.account-holder')}
        </ListItem>
        <ListItem>{t('application.payment.overview.payment-options.bank-transfer.account-number')}</ListItem>
        <ListItem>{t('application.payment.overview.payment-options.bank-transfer.reference')}</ListItem>
      </UnorderedList>
      <Text>{t('application.payment.overview.payment-options.bank-transfer.desc1')}</Text>
      <Text>{t('application.payment.overview.payment-options.bank-transfer.desc2')}</Text>
      <Button colorScheme="admin" mt="20px" variant="outline" onClick={() => navigate(-1)}>
        {t('button.back')}
      </Button>
    </>
  );
}
