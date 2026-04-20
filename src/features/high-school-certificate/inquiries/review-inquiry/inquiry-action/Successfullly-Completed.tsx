import React from "react";
import {
    Box,
    Flex,
    Heading,
    Text,
    Link as ChakraLink,
    Button,
    Icon,
    Grid,
} from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function SuccessfullyCompleted({
    applicationId,
}: {
    applicationId: string;
}) {
    const navigate = useNavigate();
    const inquiry = JSON.parse(localStorage.getItem("inquiry") || "{}");
    const feedbackPath = `/education/highschool-graduation-certificate/inquiries/review-inquiry/${inquiry.id}/feedback`;
    const { t } = useTranslation();

    return (
        <>
            <Flex mt="10rem" w="100%" direction={{ base: "column", md: "row" }}>
                <Box maxW="560px" mx="auto" p={4}>
                    <Heading as="h2" size="lg" mb={3}>
                        {t('inquiry.certificate.results.title')}
                        <br />
                        {t('inquiry.certificate.results.status-succeeded')}
                    </Heading>

                    <Text mb={4}>
                        {t('inquiry.certificate.results.succeeded-msg1')}
                    </Text>

                    <Text mb={6}>
                        {t('inquiry.certificate.results.succeeded-msg2')}
                    </Text>

                    <Flex align="center" gap={2} mb={6}>
                        <Icon as={DownloadIcon} color="blue.600" />
                        <ChakraLink
                            as="button"
                            onClick={() => {
                                // Simulate download – replace with actual file URL if you have one.
                                // window.location.href = "/path/to/certificate.pdf";
                            }}
                            color="blue.600"
                            textDecoration="underline"
                            fontWeight="semibold"
                        >
                            {t('inquiry.certificate.results.download-certificate')}
                        </ChakraLink>
                    </Flex>

                    <Text mb={8}>
                        {t('inquiry.certificate.results.succeeded-msg3')}
                    </Text>
                </Box>
            </Flex>
            <Flex mt="5rem" w="100%" direction={{ base: "column", md: "row" }}>
                <Grid
                    gap="10px"
                    w="100%"
                    gridAutoColumns={{ base: "100%", md: "50%" }}
                    templateAreas={{
                        base: `"a" "b"`,
                        md: `"b a"`
                    }}>
                    <Button
                        colorScheme="admin"
                        width={{ base: "100%", md: "auto" }}
                        onClick={() => navigate(feedbackPath)}
                    >
                        {t('button.continue')}
                    </Button>
                    <Button
                        as={RouterLink}
                        to="/"
                        variant="outline"
                        colorScheme="admin"
                        width={{ base: "100%", md: "auto" }}
                    >
                        {t('button.back-to-home')}
                    </Button>
                </Grid>
            </Flex>
        </>
    );
}