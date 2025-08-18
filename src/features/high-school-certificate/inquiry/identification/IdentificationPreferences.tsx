import { Box, FormLabel, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type Option = { value: string; label: string };

export default function IdentificationPreferences({
    value,
    onChange,
    options,
}: {
    value: string | null;
    onChange: (value: string) => void;
    options: Option[];
}) {
    const { t } = useTranslation();
    return (
        <>
            <FormLabel>{t('inquiry.identification.next3')}</FormLabel>
            <Box>
                <Text fontSize="xl" fontWeight="bold" mb={4}>
                    {t('inquiry.identification.preferences.question1')}
                </Text>
                <Text mb={2}>
                    {t('inquiry.identification.preferences.desc1')}
                </Text><br />
                <Text mb={4}>
                    {t('inquiry.identification.preferences.desc2')}
                </Text>
                <RadioGroup value={value || ""} onChange={onChange}>
                    <Stack spacing={3}>
                        {options.map((opt) => (
                            <Box
                                key={opt.value}
                                p={2}
                                borderRadius="md"
                                bg={value === opt.value ? "gray.50" : undefined}
                                border={value === opt.value ? "1px solid #e2e8f0" : undefined}
                                _hover={{ bg: "gray.100" }}
                            >
                                <Radio
                                    value={opt.value}
                                    isDisabled={opt.value !== "office"}
                                    colorScheme="blue"
                                    size="lg"
                                >
                                    <Text>{opt.label}</Text>
                                </Radio>
                            </Box>
                        ))}
                    </Stack>
                </RadioGroup>
            </Box>
        </>
    );
}
