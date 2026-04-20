import { Box, Button, Flex, FormLabel, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type Option = { value: string; label: string };

export default function IdentificationPreferences({
    value, onChange, options,
}: { value?: string | null; onChange?: (v: string) => void; options?: Option[] }) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const defaultOptions = useMemo<Option[]>(
        () => [
            { value: "home", label: t("inquiry.identification.preferences.option1") || "Yes, to my home address." },
            { value: "office", label: t("inquiry.identification.preferences.option2") || "Yes, from the nearest Ministry of Education office." },
            { value: "digital", label: t("inquiry.identification.preferences.option3") || "No, I prefer to receive a digital copy only." },
        ],
        [t]
    );
    const opts = options ?? defaultOptions;

    const [localValue, setLocalValue] = useState<string | null>(null);

    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem("inquiry") || "{}");
            if (saved.preferencesValue) setLocalValue(saved.preferencesValue as string);
        } catch { }
    }, []);

    const current = value ?? localValue ?? "";

    const handleChange = (v: string) => {
        onChange?.(v);
        setLocalValue(v);
        try {
            const saved = JSON.parse(localStorage.getItem("inquiry") || "{}");
            saved.preferencesValue = v;
            localStorage.setItem("inquiry", JSON.stringify(saved));
        } catch { }
    };

    const handleContinue = () => {
        try {
            const saved = JSON.parse(localStorage.getItem("inquiry") || "{}");
            saved.preferencesValue = current;
            localStorage.setItem("inquiry", JSON.stringify(saved));
        } catch { }
        if (current === "office") {
            navigate("address");       // -> /preferences/address
        } else {
            navigate("../payment");    // -> /payment
        }
    };

    return (
        <Flex direction="column" gap={4}>
            <FormLabel>{t("inquiry.identification.next3")}</FormLabel>

            <Box>
                <Text fontSize="xl" fontWeight="bold" mb={4}>
                    {t("inquiry.identification.preferences.question1")}
                </Text>
                <Text mb={2}>{t("inquiry.identification.preferences.desc1")}</Text>
                <br />
                <Text mb={4}>{t("inquiry.identification.preferences.desc2")}</Text>

                <RadioGroup value={current} onChange={handleChange}>
                    <Stack spacing={3}>
                        {opts.map((opt) => (
                            <Box
                                key={opt.value}
                                p={2}
                                borderRadius="md"
                                bg={current === opt.value ? "gray.50" : undefined}
                                border={current === opt.value ? "1px solid #e2e8f0" : undefined}
                                _hover={{ bg: "gray.100" }}
                            >
                                <Radio
                                    value={opt.value}
                                    // keep or remove this rule as you wish
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

            <Button width="100%" colorScheme="admin" onClick={handleContinue} isDisabled={!current}>
                {t("button.continue")}
            </Button>
        </Flex>
    );
}
