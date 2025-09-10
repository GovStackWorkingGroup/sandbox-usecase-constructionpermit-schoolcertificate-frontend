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
import jsPDF from "jspdf";

export default function SuccessfullyCompleted({
    applicationId,
}: {
    applicationId: string;
}) {
    const navigate = useNavigate();
    const inquiry = JSON.parse(localStorage.getItem("inquiry") || "{}");
    const feedbackPath = `/education/highschool-graduation-certificate/inquiries/review-inquiry/${inquiry.id}/feedback`;
    const { t } = useTranslation();

    const handleDownloadCertificate = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("High School Graduation Certificate", 20, 20);
        doc.setFontSize(12);
        doc.text(`Name: ${inquiry.studentFullName || "N/A"}`, 20, 40);
        doc.text(`Student ID: ${inquiry.studentID || "N/A"}`, 20, 50);
        doc.text(`Certificate ID: ${inquiry.id || "N/A"}`, 20, 60);
        doc.text(`Graduation Year: ${inquiry.graduationYear || "2019"}`, 20, 70);
        doc.text(`Status: Successfully Completed`, 20, 80);
        // Add more fields as needed

        doc.save(`${inquiry.studentFullName}-graduation-certificate.pdf`);
    };

    return (
        <>
            <Flex mt="2rem" w="100%" direction={{ base: "column", md: "row" }} >
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
                            onClick={handleDownloadCertificate}
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
            <Flex mb="5rem" w="100%" direction={{ base: "column", md: "row" }}>
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