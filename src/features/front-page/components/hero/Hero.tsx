import { Flex, Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { colors } from "../../../../chakra-overrides/colors";
import Search from "../../../../components/search/Search";

export default function Hero() {
  const { t } = useTranslation();
  return (
    <Flex
      backgroundColor={colors.secondary[50]}
      gap="20px"
      margin="0 -20px"
      direction="column"
      paddingTop="40px"
      paddingBottom="20px"
      paddingX="20px"
    >
      <Heading as="h1" size="lg" variant="display">
        {t('hero.title')}
      </Heading>
      <Heading size="sm" variant="title">
        {t('hero.Description')}
      </Heading>
      <Search colorScheme="admin" />
    </Flex>
  );
}
