import {
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";

export default function FeedbackSent() {
  const { t } = useTranslation();
  return (
    <>
      <Flex
        gap="20px"
        margin="80px -20px 0 -20px"
        direction="column"
        paddingX="20px"
        pb="20px"
        flexGrow={1}
      >
        <Flex direction="column" gap="10px">
          <Heading as="h1" size="md" variant="display">
            {t('application.feedback.feedback-sent.thank-you')}
          </Heading>
          <Text size="md">
            {t('application.feedback.feedback-sent.desc1')}
            <br /> <br />
            {t('application.feedback.feedback-sent.desc2')}
          </Text>
        </Flex>
        <Flex mt="15rem" w="100%" direction={{ base: "column", md: "row" }}>

          <Button
            as={RouterLink}
            to="/"
            colorScheme="admin"
            variant="outline"
            w={{ base: "100%" }}
          >
            {t('button.home')}
          </Button>
        </Flex>

      </Flex>
    </>
  );
}
