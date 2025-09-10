import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Text,
  Textarea
} from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import FeedbackRating from "./FeedbackRatingRadio";
import FeedbackSent from "./FeedbackSent";

export default function FeedbackCertificate() {
  const { t } = useTranslation();
  const [feedbackSent, setFeedbackSent] = useState(false);

  if (feedbackSent) {
    return <FeedbackSent />;
  }

  return (
    <>
      <Flex mt="80px" gap="20px" paddingBottom="20px">
        <Flex gap="10px" direction="column" w="100%">
          <Heading as="h1" size="md" variant="display">
            {t('inquiry.feedback.title')}
          </Heading>

          <FormControl marginTop="1rem" isRequired>
            <FormLabel>{t('inquiry.feedback.description')}</FormLabel>
            <Flex justifyContent="center">
              <FeedbackRating />
            </Flex>
          </FormControl>

          <FormControl marginTop="1rem">
            <FormLabel>{t('inquiry.feedback.experience')}</FormLabel>
            <Text size="md">
              {t('inquiry.feedback.experience-description')}
            </Text>
            <Textarea marginTop="1rem" placeholder="(Optional)" />
          </FormControl>

          {/* Buttons right under the input */}
          <Flex mt="1rem" w="100%" direction={{ base: "column", md: "row" }}>
            <Grid
              gap="10px"
              w="100%"
              gridAutoColumns={{ base: "100%", md: "50%" }}
              templateAreas={{
                base: `"a" "b"`,
                md: `"b a"`
              }}
            >
              <Button
                gridArea="a"
                onClick={() => setFeedbackSent(true)}
                colorScheme="admin"
                variant="solid"
                width="100%"
              >
                {t('button.submit')}
              </Button>
              <Button
                gridArea="b"
                as={RouterLink}
                to="/"
                colorScheme="admin"
                variant="outline"
                width="100%"
              >
                {t('button.skip-and-home')}
              </Button>
            </Grid>
          </Flex>
        </Flex>
      </Flex>

    </>
  );
}
