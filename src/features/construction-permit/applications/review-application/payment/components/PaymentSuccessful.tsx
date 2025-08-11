import DownloadIcon from "@assets/icons/download.svg?react";
import {
  Button,
  Flex,
  Grid,
  Heading,
  Text
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { colors } from "../../../../../../chakra-overrides/colors";

export default function PaymentSuccessful() {
  const { t } = useTranslation();
  return (
    <>
      <Flex
        gap="20px"
        margin="0 -20px"
        direction="column"
        paddingTop="40px"
        paddingBottom="20px"
        paddingX="20px"
        height="100%"
        flexGrow={1}
      >
        <Heading as="h1" size="md" variant="display">
          {t('application.payment.successful.title')}
        </Heading>
        <Text>
          {t('application.payment.successful.desc1')}
          <br />
          <br />
          {t('application.payment.successful.allow')}{" "}
          <span style={{ fontWeight: "bold", color: colors.theme.primary }}>
            {t('application.payment.successful.desc2')}
          </span>{" "}
          {t('application.payment.successful.desc2')}
          <br />
          <br />
          {t('application.payment.successful.thank-you')}
        </Text>
        <Button
          variant="link"
          colorScheme="admin"
          justifyContent="start"
          leftIcon={<DownloadIcon />}
        >
          {t('button.download-invoice')}
        </Button>

        <Flex padding="10px" marginTop="auto" w="100%" direction={{base: "column", md: "row"}}>
          <Grid
            gap="10px"
            w="100%"
            gridAutoColumns={{base:"100%", md: "50%"}}
            templateAreas={{
              base: `"a" "b"`,
              md: `"b a"`
          }}>
            <Button gridArea="a" as={RouterLink} to="/" colorScheme="admin"  variant="solid" w="100%">
              {t('button.home')}
            </Button>
            <Button gridArea="b" colorScheme="admin" variant="outline" w="100%">
              {t('button.download-invoice')}
            </Button>
          </Grid>
        </Flex>
      </Flex>
    </>
  );
}
