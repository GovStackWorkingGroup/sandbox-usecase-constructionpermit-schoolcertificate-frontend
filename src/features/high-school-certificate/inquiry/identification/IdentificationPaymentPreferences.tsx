import React, { useEffect, useState, useMemo } from "react";
import {
    Box, Button, Flex, Heading, Text, UnorderedList, ListItem, Divider, Radio
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type PaymentMethod = "card" | "mobile_money" | "digital_wallet" | "bank_transfer";

interface IdentificationPaymentPreferencesProps {
    selectedPaymentMethod?: PaymentMethod | null;
    setSelectedPaymentMethod?: (method: PaymentMethod | null) => void;
}

export default function IdentificationPaymentPreferences({
    selectedPaymentMethod,
    setSelectedPaymentMethod,
}: IdentificationPaymentPreferencesProps) {

    const inquiry = JSON.parse(localStorage.getItem("inquiry") || "{}");
    
    const feedbackPath = `/education/highschool-graduation-certificate/inquiries/review-inquiry/${inquiry.id}/feedback`;
    const { t } = useTranslation();
    
    const navigate = useNavigate();

    // ---- fees (unchanged)
    const currency = "€";
    const generatingCertificate = 0.5;
    const printing = 0.5;
    const creationOfRecords = 4.5;
    const total = generatingCertificate + printing + creationOfRecords;

    const bankName = "D.I. Bank";
    const accountHolder = "Digital Island Ministry of Finance";
    const accountNumber = "DI23456789123474";
    const reference = inquiry.id || "N/A";

    // ---- storage helpers
    const readInquiry = () => {
        try { const raw = localStorage.getItem("inquiry"); return raw ? JSON.parse(raw) : {}; }
        catch { return {}; }
    };
    const writeInquiry = (obj: any) => localStorage.setItem("inquiry", JSON.stringify(obj));
    const updateInquiryField = (field: string, value: any) => {
        const inquiry = readInquiry();
        inquiry[field] = value;
        writeInquiry(inquiry);
    };

    // ---- local fallback state so component works without props
    const [localMethod, setLocalMethod] = useState<PaymentMethod | null>(null);
    const currentMethod = selectedPaymentMethod ?? localMethod;

    // Rehydrate from storage on mount
    useEffect(() => {
        const inquiry = readInquiry();
        const m = inquiry.paymentMethod as PaymentMethod | undefined;
        if (m) {
            setLocalMethod(m);
            setSelectedPaymentMethod?.(m);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Row UI bits
    const IconBox = ({ children }: { children: React.ReactNode }) => (
        <Flex align="center" justify="center" w="36px" h="36px" border="1px solid" borderColor="gray.300" borderRadius="md">
            {children}
        </Flex>
    );
    const CardIcon = () => (
        <svg width="20" height="14" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="1.5" y="2.5" width="21" height="11" rx="2" />
            <line x1="2.5" y1="6" x2="21.5" y2="6" />
            <line x1="4" y1="11" x2="10" y2="11" />
        </svg>
    );
    const MobileMoneyIcon = () => (
        <svg width="16" height="20" viewBox="0 0 18 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="1.5" width="14" height="21" rx="2" />
            <line x1="6" y1="6" x2="12" y2="6" />
            <text x="9" y="14" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fill="currentColor" stroke="none">$</text>
        </svg>
    );
    const WalletIcon = () => (
        <svg width="20" height="16" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="1.5" y="3" width="21" height="10.5" rx="2" />
            <path d="M16 6.75h5v3.5h-5a2 2 0 0 1-2-2v-.5a1 1 0 0 1 1-1z" />
            <circle cx="18.8" cy="8.5" r="0.9" fill="currentColor" stroke="none" />
        </svg>
    );

    const FeeRow = ({
        label, value, bold = false, dashed = false,
    }: { label: string; value: string; bold?: boolean; dashed?: boolean }) => (
        <Box>
            <Flex py={2} align="center" justify="space-between">
                <Text fontWeight={bold ? "semibold" : "normal"}>{label}</Text>
                <Text fontWeight={bold ? "semibold" : "normal"}>{value}</Text>
            </Flex>
            <Divider borderStyle={dashed ? "dashed" : "solid"} borderColor="gray.300" opacity={dashed ? 1 : 0.6} />
        </Box>
    );

    const selectMethod = (m: PaymentMethod, disabled?: boolean) => {
        if (disabled) return;
        setLocalMethod(m);
        setSelectedPaymentMethod?.(m);
        updateInquiryField("paymentMethod", m);
    };

    const handleContinue = () => {
        if (!currentMethod) return;
        // persist again (defensive), then go to review
        updateInquiryField("paymentMethod", currentMethod);
        navigate("../review", { relative: "path" }); // from /identification/payment -> /identification/review
    };

    const OptionRow = ({
        title, desc, method, icon, topDivider = false, isDisabled = false,
    }: {
        title: string; desc: string; method: PaymentMethod; icon: React.ReactNode;
        topDivider?: boolean; isDisabled?: boolean;
    }) => {
        const isChecked = currentMethod === method;
        return (
            <Box>
                {topDivider && <Divider opacity={0.2} />}
                <Flex
                    role="button"
                    aria-label={title}
                    aria-disabled={isDisabled}
                    tabIndex={isDisabled ? -1 : 0}
                    align="center"
                    justify="space-between"
                    py={3}
                    gap={4}
                    cursor={isDisabled ? "not-allowed" : "pointer"}
                    opacity={isDisabled ? 0.5 : 1}
                    onClick={() => selectMethod(method, isDisabled)}
                    onKeyDown={(e) => {
                        if (isDisabled) return;
                        if (e.key === "Enter" || e.key === " ") selectMethod(method);
                    }}
                    _hover={{ bg: isDisabled ? undefined : "gray.50" }}
                >
                    <Flex align="center" gap={3}>
                        <IconBox>{icon}</IconBox>
                        <Flex direction="column" gap={0.5}>
                            <Text fontWeight="semibold">{title}</Text>
                            <Text fontSize="sm" color="gray.600">{desc}</Text>
                        </Flex>
                    </Flex>
                    <Radio isChecked={isChecked} isDisabled={isDisabled} colorScheme="blue" />
                </Flex>
            </Box>
        );
    };

    return (
        <Flex direction="column" gap={6}>
            <Text>{t("inquiry.payment.desc")}</Text>
            <Text>{t("inquiry.payment.review.desc1")}</Text>

            <Box bg="white" borderWidth="1px" borderColor="gray.200" borderRadius="lg" p={4}>
                <FeeRow label={t("inquiry.payment.generate-certificate-fee") || "Generating Certificate"} value={`${generatingCertificate.toFixed(2)} ${currency}`} dashed />
                <FeeRow label={t("inquiry.payment.printing-fee") || "Printing"} value={`${printing.toFixed(2)} ${currency}`} dashed />
                <FeeRow label={t("inquiry.payment.creation-of-records") || "Creation of records"} value={`${creationOfRecords.toFixed(2)} ${currency}`} />
                <Box mt={2} />
                <FeeRow label={t("inquiry.payment.total") || "Total"} value={`${total.toFixed(2)} ${currency}`} bold />
            </Box>

            <Heading size="md" variant="title">
                {t("inquiry.payment.options.title") || "Payment Options"}
            </Heading>
            <Text>{t("inquiry.payment.options.desc") || "Please select a payment option to proceed."}</Text>

            <Box bg="white" borderWidth="1px" borderColor="gray.200" borderRadius="lg" p={2}>
                <Text fontSize="sm" color="gray.600" px={2} pt={2} pb={1}>
                    {t("inquiry.payment.options.online.title") || "Online Payment Methods"}
                </Text>

                <OptionRow
                    title={t("inquiry.payment.options.online.debit.title") || "Debit/Credit Card"}
                    desc={t("inquiry.payment.options.online.debit.description") || "Enter your bank details for payment."}
                    method="card"
                    icon={<CardIcon />}
                    topDivider
                />
                <OptionRow
                    title={t("inquiry.payment.options.online.mobile.title") || "Mobile Money"}
                    desc={t("inquiry.payment.options.online.mobile.description") || "Enter your mobile money details for payment."}
                    method="mobile_money"
                    icon={<MobileMoneyIcon />}
                    isDisabled
                    topDivider
                />
                <OptionRow
                    title={t("inquiry.payment.options.online.wallet.title") || "Digital Wallet"}
                    desc={t("inquiry.payment.options.online.wallet.description") || "Enter your digital wallet details for payment."}
                    method="digital_wallet"
                    icon={<WalletIcon />}
                    isDisabled
                    topDivider
                />
            </Box>

            <Box bg="white" borderWidth="1px" borderColor="gray.200" borderRadius="lg" p={4}>
                <Text fontSize="sm" color="gray.600" mb={2}>
                    {t("inquiry.payment.options.bank-transfer.title") || "Bank Transfer Payment"}
                </Text>
                <Text mb={2}>
                    {t("inquiry.payment.options.bank-transfer.desc") ||
                        "For bank transfer payments, use the following account details:"}
                </Text>
                <UnorderedList spacing={2}>
                    <ListItem><Text as="span" fontWeight="semibold">{t("inquiry.payment.options.bank-transfer.bank-name") || "Bank Name"}:</Text> {bankName}</ListItem>
                    <ListItem><Text as="span" fontWeight="semibold">{t("inquiry.payment.options.bank-transfer.account-holder") || "Account Holder"}:</Text> {accountHolder}</ListItem>
                    <ListItem><Text as="span" fontWeight="semibold">{t("inquiry.payment.options.bank-transfer.account-number") || "Account Number"}:</Text> {accountNumber}</ListItem>
                    <ListItem><Text as="span" fontWeight="semibold">{t("inquiry.payment.options.bank-transfer.reference") || "Reference"}:</Text> {reference}</ListItem>
                </UnorderedList>
                <Text mt={3}>
                    {t("inquiry.payment.options.bank-transfer.desc1") ||
                        "Please use your Application ID as the payment reference."}
                </Text>
            </Box>

            {/* Continue */}
            <Button
                width="100%"
                colorScheme="admin"
                onClick={handleContinue}
                isDisabled={!currentMethod}
            >
                {t("button.continue")}
            </Button>
        </Flex>
    );
}
