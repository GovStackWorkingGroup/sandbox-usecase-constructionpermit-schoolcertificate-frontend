import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Accordion,
    AccordionItem,
    AccordionPanel,
    AccordionButton,
    AccordionIcon,
    Button,
    Heading,
    Text,
    Flex,
    Box,
    Divider,
} from "@chakra-ui/react";
import { colors } from "../../../../chakra-overrides/colors";
import InquiryStatus, { Status } from "../../../../components/status/ApplicationStatus";
import { Inquiry, ROLE } from "../../../../rpc/types";
import { useTranslation } from "react-i18next";

type LocalInquiry = Inquiry & {
    studentFullName?: string | null;
    studentAddress?: string | null;
    paymentMethod?: "card" | "mobile_money" | "digital_wallet" | "bank_transfer" | "";
};

interface IdentificationReviewProps {
    isMobile: boolean;
}

export const IdentificationReview = ({ isMobile }: IdentificationReviewProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [inquiry, setInquiry] = useState<LocalInquiry | null>(null);

    // ---- Mocks for missing fields
    const mothersNameMock = "Mary";
    const mothersMaidenNameMock = "Anderson";
    const schoolNameMock = "Digital Island High School";
    const yearOfGraduationMock = "2021";
    const cityRegionMock = "Islandville";
    const zipCodeMock = "54321";
    const phoneNumberMock = "+987-654-3210";

    // ---- Fees (same as your Payment screen)
    const currency = "€";
    const generatingCertificate = 0.5;
    const printing = 0.5;
    const creationOfRecords = 4.5;
    const total = generatingCertificate + printing + creationOfRecords;

    // Load inquiry
    useEffect(() => {
        const raw = localStorage.getItem("inquiry");
        if (!raw) return;

        const parsed = JSON.parse(raw);

        const unwrap = (v: unknown) => {
            if (typeof v !== "string") return v;
            try {
                const p = JSON.parse(v);
                return typeof p === "string" ? p : v;
            } catch {
                return v;
            }
        };

        parsed.studentFullName = unwrap(parsed.studentFullName) ?? "";
        parsed.studentID = unwrap(parsed.studentID) ?? "";
        parsed.studentAddress = unwrap(parsed.studentAddress) ?? "";

        localStorage.setItem("inquiry", JSON.stringify(parsed));

        const safeInquiry: LocalInquiry = {
            id: parsed.id ?? "N/A",
            status: (parsed.status as Status) ?? Status.DRAFT,
            studentFullName: parsed.studentFullName,
            studentID: parsed.studentID,
            studentAddress: parsed.studentAddress,
            certificateID: parsed.certificateID ?? "",
            identificationStarted: parsed.identificationStarted ?? false,
            identification: parsed.identification ?? [],
            action: parsed.action ?? "",
            paymentMethod: parsed.paymentMethod ?? "",
        };

        if (
            safeInquiry.identification.length === 0 &&
            (safeInquiry.studentFullName || safeInquiry.studentID)
        ) {
            safeInquiry.identification = [
                {
                    role: ROLE.HIGHSCHOOL_GRADUATE,
                    data: {
                        name: safeInquiry.studentFullName || "",
                        idNumber: safeInquiry.studentID || "",
                    },
                },
            ];
        }

        setInquiry(safeInquiry);
    }, []);

    // Status
    const identificationStatus: Status = useMemo(() => {
        if (!inquiry) return Status.NOT_STARTED;
        if (!inquiry.identificationStarted && inquiry.identification.length === 0) {
            return Status.NOT_STARTED;
        }
        if (inquiry.identification.length === 0) return Status.IN_PROGRESS;
        return inquiry.identification.length >= 1 ? Status.COMPLETED : Status.IN_PROGRESS;
    }, [inquiry]);

    // Row helper
    const Row = ({ label, value }: { label: string; value?: string | null }) => (
        <>
            <Flex justify="space-between" gap={6} py={2}>
                <Text whiteSpace="nowrap">{label}</Text>
                <Text fontWeight="semibold" textAlign="right">
                    {value && String(value).trim() !== "" ? value : "—"}
                </Text>
            </Flex>
            <Divider />
        </>
    );

    // Fee row for the card
    const FeeRow = ({
        label,
        value,
        bold = false,
        dashed = false,
    }: {
        label: string;
        value: string;
        bold?: boolean;
        dashed?: boolean;
    }) => (
        <Box>
            <Flex py={2} align="center" justify="space-between">
                <Text fontWeight={bold ? "semibold" : "normal"}>{label}</Text>
                <Text fontWeight={bold ? "semibold" : "normal"}>{value}</Text>
            </Flex>
            <Divider
                borderStyle={dashed ? "dashed" : "solid"}
                borderColor="gray.300"
                opacity={dashed ? 1 : 0.6}
            />
        </Box>
    );

    // Label for payment method
    const paymentLabel =
        (inquiry?.paymentMethod === "card" && (t("inquiry.payment.options.online.debit.title") || "Debit/Credit Card")) ||
        (inquiry?.paymentMethod === "mobile_money" && (t("inquiry.payment.options.online.mobile.title") || "Mobile Money")) ||
        (inquiry?.paymentMethod === "digital_wallet" && (t("inquiry.payment.options.online.wallet.title") || "Digital Wallet")) ||
        (inquiry?.paymentMethod === "bank_transfer" && (t("inquiry.payment.options.bank-transfer.title") || "Bank Transfer Payment")) ||
        t("status.not-set") ||
        "Not set";

    // Values (from inquiry or mocks)
    const fullName = inquiry?.studentFullName || "";
    const studentId = inquiry?.studentID || "";
    const addressLine = inquiry?.studentAddress || "";

    return (
        <Flex direction="column" gap="20px" mb="20px" flexGrow={1}>
            <Flex alignItems="center" justifyContent="space-between">
                <Text>
                    {t("inquiry.inquiry-number")}
                    {inquiry?.id ?? "—"}
                </Text>
                <InquiryStatus status={inquiry?.status ?? Status.DRAFT} />
            </Flex>

            <Flex direction="column" gap="20px">
                <Text variant="title" size="lg">
                    {t("inquiry.inquiry-details")}
                </Text>

                <Accordion allowToggle>
                    {/* Identification */}
                    <AccordionItem>
                        <h3>
                            <AccordionButton px={0}>
                                <Text fontWeight="semibold" mb={2} flex="1" textAlign="left">
                                    {t("inquiry.identification.title")}
                                </Text>
                                <AccordionIcon />
                            </AccordionButton>
                        </h3>
                        <AccordionPanel px={0} pt={2}>
                            <Box borderRadius="lg" p={4} borderWidth="1px" borderColor="gray.200" bg="white">
                                <Row label={t("inquiry.identification.student.full-name")} value={fullName} />
                                <Row label={t("inquiry.identification.student.mother-name") || "Mother's Name"} value={mothersNameMock} />
                                <Row
                                    label={t("inquiry.identification.student.mother-maiden-name") || "Mother's Maiden Name"}
                                    value={mothersMaidenNameMock}
                                />
                                <Row label={t("inquiry.identification.student.school-name") || "School Name"} value={schoolNameMock} />
                                <Row label={t("inquiry.identification.student.id")} value={studentId} />
                                <Row label={t("inquiry.identification.student.year-of-graduation") || "Year of Graduation"} value={yearOfGraduationMock} />
                            </Box>

                            <Text color="blue.500" textDecoration="underline" as={Link} to={`/education/highschool-graduation-certificate/inquiry/${inquiry?.id}/identification`} mt={4} display="inline-block">
                                {t("inquiry.identification.edit")}
                            </Text>

                            <Text mt={3} fontSize="sm" color={colors.secondary[600]}>
                                {t("inquiry.identification.title")}: {identificationStatus}
                            </Text>
                        </AccordionPanel>
                    </AccordionItem>

                    {/* Preferences */}
                    <AccordionItem>
                        <h3>
                            <AccordionButton px={0}>
                                <Text fontWeight="semibold" mb={2} flex="1" textAlign="left">
                                    {t("inquiry.identification.preferences.title")}
                                </Text>
                                <AccordionIcon />
                            </AccordionButton>
                        </h3>
                        <AccordionPanel px={0} pt={2}>
                            <Text>{t("inquiry.certificate.desc1")}</Text>
                            <Box as="ul" pl={5} my={2}>
                                <li>Digital Certificate Only</li>
                                <li>Digital and Physical Copy</li>
                            </Box>
                            <Text>{t("inquiry.certificate.desc2")}</Text>

                            <Box borderRadius="lg" p={4} borderWidth="1px" borderColor="gray.200" bg="white" mt={3}>
                                <Text fontWeight="semibold" mb={2}>
                                    {t("inquiry.identification.student.to-home") || "To Home Address"}
                                </Text>
                                <Row label={t("inquiry.identification.student.street-apt") || "Street Address and Apartment Number"} value={addressLine || "456 Elm Avenue, Apartment 7C"} />
                                <Row label={t("inquiry.identification.student.city-region") || "City / Region"} value={cityRegionMock} />
                                <Row label={t("inquiry.identification.student.postal") || "Postal/ZIP code"} value={zipCodeMock} />
                                <Row label={t("inquiry.identification.student.email") || "e-Mail Address"} value={"john@email.com"} />
                                <Row label={t("inquiry.identification.student.phone") || "Phone Number"} value={phoneNumberMock} />
                            </Box>

                            <Text color="blue.500" textDecoration="underline" as={Link} to={`/education/highschool-graduation-certificate/inquiry/${inquiry?.id}/identification`} mt={4} display="inline-block">
                                {t("inquiry.identification.preferences.edit")}
                            </Text>

                            <Text mt={3} fontSize="sm" color={colors.secondary[600]}>
                                {t("inquiry.identification.preferences.title")}: {identificationStatus}
                            </Text>
                        </AccordionPanel>
                    </AccordionItem>

                    {/* Payment */}
                    <AccordionItem>
                        <h3>
                            <AccordionButton px={0}>
                                <Text fontWeight="semibold" mb={2} flex="1" textAlign="left">
                                    {t("inquiry.payment.title") || "Payment"}
                                </Text>
                                <AccordionIcon />
                            </AccordionButton>
                        </h3>
                        <AccordionPanel px={0} pt={2}>
                            {/* Selected method */}
                            <Box borderRadius="lg" p={4} borderWidth="1px" borderColor="gray.200" bg="white" mb={4}>
                                <Row label={t("inquiry.payment.method") || "Selected Method"} value={paymentLabel} />
                            </Box>

                            {/* Fees card */}
                            <Box bg="white" borderWidth="1px" borderColor="gray.200" borderRadius="lg" p={4}>
                                <FeeRow
                                    label={t("inquiry.payment.generate-certificate-fee") || "Generating Certificate"}
                                    value={`${generatingCertificate.toFixed(2)} ${currency}`}
                                    dashed
                                />
                                <FeeRow
                                    label={t("inquiry.payment.printing-fee") || "Printing"}
                                    value={`${printing.toFixed(2)} ${currency}`}
                                    dashed
                                />
                                <FeeRow
                                    label={t("inquiry.payment.creation-of-records") || "Creation of records"}
                                    value={`${creationOfRecords.toFixed(2)} ${currency}`}
                                    dashed={false}
                                />
                                <Box mt={2} />
                                <FeeRow
                                    label={t("inquiry.payment.total") || "Total"}
                                    value={`${total.toFixed(2)} ${currency}`}
                                    bold
                                />
                            </Box>

                            <Text color="blue.500" textDecoration="underline" as={Link} to={`/education/highschool-graduation-certificate/inquiry/${inquiry?.id}/identification/review/${inquiry?.id}/payment`} mt={4} display="inline-block">
                                {t("inquiry.payment.edit") || "Edit payment method"}
                            </Text>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>

                <Text mt={3} mb={3} fontSize="xl" textAlign="center" fontWeight="bold">
                    {t("inquiry.review.important")}
                </Text>
            </Flex>

            <Button colorScheme="admin" mt="auto" variant="outline" onClick={() => navigate(-1)}>
                {t("button.back")}
            </Button>
        </Flex>
    );
};

export default IdentificationReview;
