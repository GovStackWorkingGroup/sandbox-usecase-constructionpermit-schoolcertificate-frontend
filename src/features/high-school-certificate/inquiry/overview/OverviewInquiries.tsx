import DownloadIcon from "@assets/icons/download.svg?react";
import {
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Link,
  ListItem,
  Text,
  useMediaQuery
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { Link as RouterLink, useNavigate, useParams, Outlet } from "react-router-dom";
import { colors } from "../../../../chakra-overrides/colors";
import { Status } from "../../../../components/status/ApplicationStatus";
import { RPCContext } from "../../../../rpc/rpc";
import { Inquiry } from "../../../../rpc/types";
import { ROLE } from "../../../../rpc/types";
import Action from "./components/Action";
import StepStatus from "./components/StepStatus";

export default function OverviewInquiries() {
  const { id } = useParams();
  const { t } = useTranslation();

  const rpc = useContext(RPCContext);
  const navigate = useNavigate();

  const [inquiry, setInquiry] = useState<Inquiry>({
    id: `${id}`,
    status: Status.DRAFT,
    identificationStarted: false,
    action: "",
    certificateID: "",
    identification: [],
  });

  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const { data: inquiries } = useQuery(`inquiries`, rpc.getApplications, {
    onSuccess: (inquiries) => {
      const existingInquiry = inquiries?.find(
        (inquiry) => inquiry.id === id,
      );
      const storageApplication = localStorage.getItem("inquiry");

      if (
        (existingInquiry && !storageApplication) ||
        (existingInquiry &&
          storageApplication &&
          JSON.parse(storageApplication).id !== existingInquiry?.id)
      ) {
        localStorage.setItem(
          "inquiry",
          JSON.stringify(existingInquiry),
        );
        setInquiry(existingInquiry);
      } else if (
        (!existingInquiry &&
          storageApplication &&
          JSON.parse(storageApplication).id !== id) ||
        (!existingInquiry && !storageApplication)
      ) {
        localStorage.setItem("inquiry", JSON.stringify(inquiry));
        setInquiry(inquiry);
      } else {
        if (storageApplication) setInquiry(JSON.parse(storageApplication));
      }
    },
  });

  async function handleDelete(): Promise<string> {
    return "handleDelete";
  }

  async function saveDraft(): Promise<string> {
    return "saveDraft";
  }

  const handleCreate = () => {
    // Set a flag to mark started
    inquiry.action = "inReview";
    inquiry.status = Status.IN_REVIEW;
    inquiry.identificationStarted = true; // <-- Add this field!

    localStorage.setItem("inquiry", JSON.stringify(inquiry));

    if (inquiries) {
      rpc.forceSetData(
        "inquiries",
        JSON.stringify([
          ...inquiries.filter((appl) => appl.id != inquiry.id),
          inquiry,
        ]),
      );
    } else {
      rpc.forceSetData("inquiries", JSON.stringify([inquiry]));
    }
    navigate(`/education/highschool-graduation-certificate/inquiry/${id}/identification`);
  };

  // --- Here is the new status logic:
  const identificationStatus =
    inquiry.identification.length === 0
      ? (inquiry.identificationStarted ? Status.IN_PROGRESS : Status.NOT_STARTED)
      : inquiry.identification.length < 4
        ? Status.IN_PROGRESS
        : Status.COMPLETED;

  return (
    <Flex mb="30px" gap="20px" direction="column" flexGrow={1}>
      <Grid
        gap="30px"
        templateAreas={{
          base: `"heading" "actions"`,
          md: `"heading actions"`,
        }}
      >
        <GridItem
          area="actions" gap="20px" display="flex" flexDirection="column" mb="30px">
          <Heading size="md" variant="title">
            {t('inquiry.overview.title')}
          </Heading>
          <Text>
            {t('inquiry.overview.description')}
          </Text>
          <Divider />
          <Action
            title={t('inquiry.identification.title')}
            showStatus={isMobile}
            status={identificationStatus}
            action={
              <Link
                as={RouterLink}
                to="identification"
                textDecoration="underline"
                color={colors.theme.primary}
              >
              </Link>
            }
          >
            <Text>
              {t('inquiry.identification.description')}
            </Text>
          </Action>
          <Divider />
          <Action
            title={t('inquiry.certificate.preferences.title')}
            showStatus={isMobile}
            status={identificationStatus}
            action={
              <Link
                as={RouterLink}
                to="payment"
                textDecoration="underline"
                color={colors.theme.primary}
              >

              </Link>
            }
          >
            <Text>
              {t('inquiry.certificate.desc1')}
            </Text><br />
            <li>
              Digital Certificate Only
            </li>
            <li>
              Digital and Physical Copy
            </li><br />
            <Text>
              {t('inquiry.certificate.desc2')}
            </Text>
          </Action>
          <Divider />
          <Action
            title={t('inquiry.payment.title')}
            showStatus={isMobile}
            status={identificationStatus}
            action={
              <Link
                as={RouterLink}
                to="payment"
                textDecoration="underline"
                color={colors.theme.primary}
              >

              </Link>
            }
          >
            <>
              <Text>
                {t('inquiry.overview.payment-fee')}
              </Text>

            </>
          </Action>

          <Flex marginTop="auto"
            mb="20px"
            gap="20px"
            direction={{ base: "column", md: "row" }}>
            <Grid
              autoColumns="30%"
              gap="20px"
              width="100%"
              templateColumns="auto"
              templateAreas={{
                xs: `"a" "b" "c"`,
                sm: `"a" "b" "c"`,
                md: `"c b a"`,
              }}>
              <Button gridArea="a" width="100%" colorScheme={"admin"} onClick={() => handleCreate()}>
                {t('button.start')}
              </Button>
              <Button gridArea="b" width="100%" onClick={() => saveDraft()} as={RouterLink} to="/" variant="outline" colorScheme="admin">
                {t('button.back-to-home')}
              </Button>
              <Button gridArea="c" width="100%" onClick={() => handleDelete()} variant="plain" color={colors.theme.info}>
                {t('button.cancel')}
              </Button>
            </Grid>
          </Flex>
        </GridItem>
      </Grid>
      <Outlet />
    </Flex>
  );
}
