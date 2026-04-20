import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  Text,
  VStack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { colors } from "../../../../chakra-overrides/colors";
import ListCard from "../../../../components/list-card/ListCard";
import { Status } from "../../../../components/status/ApplicationStatus";
import { Inquiry } from "../../../../rpc/types";
import StepStatus from "../overview/components/StepStatus";

export default function Certificate() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [mapOpened, setMapOpened] = useState(false);
  const [certificateId, setcertificateId] = useState("");
  const [identificationDone, setIdentificationDone] = useState(false);
  const [idInProgress, setIdInProgress] = useState(false);
  const [inquiry, setInquiry] = useState<Inquiry>({
    id: `${id}`,
    status: Status.DRAFT,
    certificateID: "",
    action: "inReview",
    identification: [],
  });
  const navigate = useNavigate();

  const storageinquiry = localStorage.getItem("inquiry");

  useEffect(() => {
    if (storageinquiry) {
      const inquiry = JSON.parse(storageinquiry) as Inquiry;
      setcertificateId(inquiry.certificateID ?? "");
      setInquiry(inquiry);
      const undoneID = inquiry.identification.length > 0 && inquiry.identification.length < 4;
      setIdInProgress(undoneID);
      setIdentificationDone(inquiry.identification.length == 4);
    }
    // else {
    //   navigate("../../construction-permit");
    // }
  }, []);

  const handleContinue = () => {
    if (inquiry) inquiry.certificateID = certificateId;
    setInquiry(inquiry);
    localStorage.setItem("inquiry", JSON.stringify(inquiry));

    if (inquiry.identification.length < 1) navigate(`../${id}/identification`)
    else navigate(`../${id}`);
  }


  const handleSave = () => {
    if (inquiry) inquiry.certificateID = certificateId;
    setInquiry(inquiry);
    localStorage.setItem("inquiry", JSON.stringify(inquiry));
    navigate(`../${id}`);
  }

  return (
    <>
      <Flex mb="30px" gap="20px" direction="column">
        <Grid
          gap="20px"
          templateAreas={{
            xs: `"heading" "certificate"`,
            sm: `"heading" "certificate"`,
            md: `"heading certificate"`,
          }}
        >
          <GridItem area="heading"
            gap="10px"
            flexDirection="column"
            display="flex">
            <Flex>
              <Text variant="title" size="md" mt="5px">
                {t('inquiry.overview.title')}{" "}
                <span style={{ color: colors.secondary[600] }}>#{id}</span>
              </Text>
            </Flex>
            <Flex
              direction="column"
              alignSelf="bottom"
              display={{ base: "none", md: "flex" }}>
              <StepStatus
                id={inquiry.id}
                activeStep="preferences"
                status={{
                  preferences: inquiry.certificateID === "" ? Status.NOT_STARTED : Status.COMPLETED,
                  identification:
                    identificationDone ? Status.COMPLETED : (idInProgress ? Status.IN_PROGRESS : Status.NOT_STARTED),
                  review: Status.NOT_STARTED,
                  payment: Status.NOT_STARTED,
                }}
              />
            </Flex>
          </GridItem>
          <GridItem area="certificate" display="flex" flexDirection="column" gap="20px">
            <Heading size="md" variant="title">
              {t('inquiry.certificate.title')}
            </Heading>
            <Text>{t('inquiry.certificate.desc1')}</Text>
            <Text size="sm">
              {t('inquiry.certificate.desc2')}
            </Text>
            <Flex direction="column" gap="10px">
              <FormLabel>{t('inquiry.certificate.title')}</FormLabel>
              <Flex gap="10px" direction={{ base: "column", md: "row" }}>
                <FormControl width={{ base: "100%", md: "70%" }}>
                  <Input
                    maxLength={7}
                    defaultValue={certificateId}
                    onChange={(e) => setcertificateId(e.target.value)}
                    placeholder={t('inquiry.certificate.placeholder')} />
                </FormControl>
                <Button
                  width={{ base: "100%", md: "30%" }}
                  onClick={() => setMapOpened(true)}
                  variant="outline"
                  colorScheme="admin"
                >
                  {t('inquiry.certificate.select-from-map')}
                </Button>
              </Flex>
            </Flex>
            {
              (certificateId.length != 7) ? (
                <Flex
                  direction="column"
                  borderRadius="16px"
                  backgroundColor={colors.theme.light}
                  p="10px"
                >
                  <VStack spacing="10px" alignItems="left">
                    <Text variant="title" size="lg">
                      {t('inquiry.certificate.certificate-info.title')}
                    </Text>
                    <Text>
                      {t('inquiry.certificate.certificate-info.placeholder')}
                    </Text>
                  </VStack>
                </Flex>
              ) : (
                <>
                  <ListCard>
                    <Text variant="title" size="lg">
                      {t('inquiry.certificate.certificate-info.title')}
                    </Text>
                    <HStack w="100%">
                      <dl style={{ width: "50%" }}>
                        <Text>{t('inquiry.certificate.certificate-info.certificate-number')}</Text>
                      </dl>
                      <dd style={{ width: "50%" }}>
                        <Text>{certificateId}</Text>
                      </dd>
                    </HStack>
                    <HStack w="100%">
                      <dl style={{ width: "50%" }}>
                        <Text>{t('inquiry.certificate.certificate-info.coordinates')}</Text>
                      </dl>
                      <dd style={{ width: "50%" }}>
                        <Text>{t('inquiry.certificate.certificate-info.coordinates.crd1')}</Text>
                        <Text>{t('inquiry.certificate.certificate-info.coordinates.crd2')}</Text>
                      </dd>
                    </HStack>
                    <HStack w="100%">
                      <dl style={{ width: "50%" }}>
                        <Text>{t('inquiry.certificate.certificate-info.total-area')}</Text>
                      </dl>
                      <dd style={{ width: "50%" }}>
                        <Text>2784</Text>
                      </dd>
                    </HStack>
                    <HStack w="100%">
                      <dl style={{ width: "50%" }}>
                        <Text>{t('inquiry.certificate.certificate-info.floor-area-ratio')}</Text>
                      </dl>
                      <dd style={{ width: "50%" }}>
                        <Text>1.5</Text>
                      </dd>
                    </HStack>
                    <HStack w="100%">
                      <dl style={{ width: "50%" }}>
                        <Text>{t('inquiry.certificate.certificate-info.land-use-function.title')}</Text>
                      </dl>
                      <dd style={{ width: "50%" }}>
                        <Text>{t('inquiry.certificate.certificate-info.land-use-function.use')}</Text>
                      </dd>
                    </HStack>
                    <HStack w="100%">
                      <dl style={{ width: "50%" }}>
                        <Text>{t('inquiry.certificate.certificate-info.restrictions.title')}</Text>
                      </dl>
                      <dd style={{ width: "50%" }}>
                        <Text>{t('inquiry.certificate.certificate-info.restrictions.restr1')}</Text>
                        <Text>{t('inquiry.certificate.certificate-info.restrictions.restr2')}</Text>
                        <Text>{t('inquiry.certificate.certificate-info.restrictions.restr3')}</Text>
                      </dd>
                    </HStack>
                  </ListCard>
                </>
              )
            }
            <Grid
              gap="10px"
              w="100%"
              gridAutoColumns={{ base: "100%", md: "50%" }}
              templateAreas={{
                base: `"a" "b"`,
                md: `"b a"`
              }}>
              <Button gridArea="a" width="100%" colorScheme={(certificateId.length == 7) ? "admin" : "disabled"} disabled={(certificateId.length != 7)} onClick={() => (certificateId.length == 7) ? handleContinue() : ""}>
                {t('button.continue')}
              </Button>
              <Button gridArea="b" width="100%" onClick={() => handleSave()} variant="outline" colorScheme="admin">
                {t('button.save-for-later')}
              </Button>
            </Grid>
          </GridItem>
        </Grid>
      </Flex>
    </>
  );
}
