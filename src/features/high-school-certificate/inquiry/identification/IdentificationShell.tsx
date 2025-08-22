// IdentificationShell.tsx
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Box, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import StepStatus from "../overview/components/StepStatus";
import { Status } from "../../../../components/status/ApplicationStatus";
import { colors } from "../../../../chakra-overrides/colors";

type StepKey = "identification" | "preferences" | "payment" | "review";

export default function IdentificationShell() {
    const { id } = useParams();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    // active step: use includes, not endsWith
    const activeStep: StepKey =
        pathname.includes("/preferences") ? "preferences" :
            pathname.includes("/payment") ? "payment" :
                pathname.includes("/review") ? "review" :
                    "identification";


    const inquiry = (() => {
        try { return JSON.parse(localStorage.getItem("inquiry") || "{}"); }
        catch { return {}; }
    })();

    const hasId = !!inquiry.studentID || !!inquiry.studentFullName;
    // if user chose "office", require address before considering preferences “done”
    const prefChoice = inquiry.preferencesValue;
    const hasPrefs =
        !!prefChoice && (prefChoice !== "office" || !!inquiry.studentAddress);
    const hasPayment = !!inquiry.paymentMethod;

    // optional nicer title
    const isAddressSubstep = pathname.endsWith("/preferences/address");


    const status = {
        identification: hasId
            ? (activeStep === "identification" ? Status.IN_PROGRESS : Status.COMPLETED)
            : Status.NOT_STARTED,

        preferences: hasPrefs
            ? (activeStep === "preferences" ? Status.IN_PROGRESS : Status.COMPLETED)
            : (hasId ? Status.NOT_STARTED : Status.NOT_STARTED),

        payment: hasPayment
            ? (activeStep === "payment" ? Status.IN_PROGRESS : Status.COMPLETED)
            : (hasPrefs ? Status.NOT_STARTED : Status.NOT_STARTED),

        review: activeStep === "review" ? Status.IN_PROGRESS : Status.NOT_STARTED,
    } as const;

    const title =
        activeStep === "identification" ? "Identification" :
            activeStep === "preferences" ? (isAddressSubstep ? "Address Preferences" : "Certificate Preferences") :
                activeStep === "payment" ? "Payment" :
                    "Review";

    const onStepClick = (key: StepKey) => {
        const to = key === "identification" ? "." : key;
        navigate(to, { relative: "path" as any });
    };

    return (
        <Flex gap="20px" direction="column">
            <Grid
                gap="20px"
                templateAreas={{
                    base: `"heading" "content"`,
                    md: `"heading content"`,
                }}
                templateColumns={{ base: "1fr", md: "360px 1fr" }}
            >
                {/* Left rail */}
                <GridItem area="heading" gap="10px" flexDirection="column" display="flex">
                    <Flex>
                        <Text variant="title" size="md" mt="5px">
                            Inquiry <span style={{ color: colors.secondary[600] }}>#{id}</span>
                        </Text>
                    </Flex>

                    <Flex direction="column" alignSelf="bottom" display={{ base: "none", md: "flex" }}>
                        <StepStatus
                            id={id as string}
                            activeStep={activeStep}
                            status={status}
                        />
                    </Flex>
                </GridItem>

                {/* Right content */}
                <GridItem area="content" gap="20px" display="flex" flexDirection="column">
                    <Heading size="md" variant="title">{title}</Heading>
                    <Box>
                        <Outlet />
                    </Box>
                </GridItem>
            </Grid>
        </Flex>
    );
}
