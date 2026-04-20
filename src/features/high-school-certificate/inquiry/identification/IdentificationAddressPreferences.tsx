import { Box, Button, Flex, FormLabel, Select, Text } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function IdentificationAddressPreferences({
    selectedOfficeAddress,
    setSelectedOfficeAddress,
    addresses,
}: {
    selectedOfficeAddress?: string | null;                 // props optional now
    setSelectedOfficeAddress?: (addr: string) => void;
    addresses?: string[];
}) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // default list if not provided
    const defaultAddresses = useMemo(
        () => [
            "Ministry of Education, Central Office, Main Street 1",
            "Ministry of Education, North Branch, Green Avenue 23",
            "Ministry of Education, South Branch, River Road 12",
            "Ministry of Education, East Branch, Lake Street 7",
        ],
        []
    );
    const addrList = addresses ?? defaultAddresses;

    const [localSel, setLocalSel] = useState<string | null>(null);

    // rehydrate
    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem("inquiry") || "{}");
            if (saved.studentAddress) setLocalSel(saved.studentAddress as string);
        } catch { }
    }, []);

    const current = selectedOfficeAddress ?? localSel ?? "";

    const update = (val: string) => {
        setSelectedOfficeAddress?.(val);
        setLocalSel(val);
        try {
            const saved = JSON.parse(localStorage.getItem("inquiry") || "{}");
            saved.studentAddress = val;
            localStorage.setItem("inquiry", JSON.stringify(saved));
        } catch { }
    };

    const handleContinue = () => {
        if (!current) return;
        // go to payment next
        navigate("../../payment", { relative: "path" }); // from /preferences/address -> /payment
    };

    return (
        <Flex direction="column" gap={4}>
            <Text as="h2" fontSize="xl" fontWeight="bold">
                {t("inquiry.identification.preferences.question2")}
            </Text>
            <Text>{t("inquiry.identification.preferences.desc3")}</Text>

            <Box>
                <FormLabel>
                    {t("inquiry.identification.preferences.selectbox") || "Select Ministry Office Address"}
                </FormLabel>
                <Select
                    placeholder={t("inquiry.identification.preferences.select") || "Select an office address"}
                    value={current}
                    onChange={(e) => update(e.target.value)}
                >
                    {addrList.map((address) => (
                        <option key={address} value={address}>
                            {address}
                        </option>
                    ))}
                </Select>
            </Box>

            <Button width="100%" colorScheme="admin" onClick={handleContinue} isDisabled={!current}>
                {t("button.continue")}
            </Button>
        </Flex>
    );
}
