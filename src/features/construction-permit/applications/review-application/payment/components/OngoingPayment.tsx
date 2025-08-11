import { Box, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { colors } from "../../../../../../chakra-overrides/colors";
import { useTranslation } from "react-i18next";

export default function OngoingPayment() {
  const { t } = useTranslation();
  return (
    <Flex
      mt="auto"
      mb="auto"
      flexDirection="column"
      gap="20px"
      alignItems="center"
    >
      <Spinner size="lg" color={colors.theme.primary} />
      <Heading variant="headline" size="lg">
        {t('application.payment.ongoing.title')}
      </Heading>
      <Box textAlign="center">
        <Text size="lg">{t('application.payment.ongoing.please-wait')}</Text>
        <Text size="lg">{t('application.payment.ongoing.process-time')}</Text>
      </Box>
    </Flex>
  );
}
