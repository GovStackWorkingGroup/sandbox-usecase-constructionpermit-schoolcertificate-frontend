import { Box, FormLabel, Select, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function IdentificationAddressPreferences({
    selectedOfficeAddress,
    setSelectedOfficeAddress,
    addresses
}: {
    selectedOfficeAddress: string | null;
    setSelectedOfficeAddress: (addr: string) => void;
    addresses: string[];
}) {
    const { t } = useTranslation();

    function updateInquiryField(field: string, value: string) {
        const inquiry = JSON.parse(localStorage.getItem('inquiry') || '{}');
        inquiry[field] = value;
        localStorage.setItem('inquiry', JSON.stringify(inquiry));
    }

    return (
        <>
            <Text as="h2" fontSize="xl" fontWeight="bold" mb={2}>
                {t('inquiry.identification.preferences.question2')}
            </Text>
            <Text m="4">{t('inquiry.identification.preferences.desc3')}</Text>

            <Box>
                <FormLabel>{t('inquiry.identification.preferences.selectbox') || "Select Ministry Office Address"}</FormLabel>
                <Select
                    placeholder={t('inquiry.identification.preferences.select') || "Select an office address"}
                    value={selectedOfficeAddress || ""}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setSelectedOfficeAddress(e.target.value);
                        updateInquiryField('studentAddress', e.target.value);
                    }}
                >
                    {addresses.map((address) => (
                        <option key={address} value={address}>
                            {address}
                        </option>
                    ))}
                </Select>
            </Box>
        </>
    );
}