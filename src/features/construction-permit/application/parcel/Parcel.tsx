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
import { Application } from "../../../../rpc/types";
import StepStatus from "../overview/components/StepStatus";

export default function Parcel() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [mapOpened, setMapOpened] = useState(false);
  const [parcelId, setParcelId] = useState("");
  const [identificationDone, setIdentificationDone] = useState(false);
  const [idInProgress, setIdInProgress] = useState(false);
  const [application, setApplication] = useState<Application>({
    id: `${id}`,
    status: Status.DRAFT,
    parcelID: "",
    action: "inReview",
    identification: [],
    documents: [],
    pendingDocuments: [],
    inspectionDate: ""
  });
  const navigate = useNavigate();

  const storageApplication = localStorage.getItem("application");

  useEffect(() => {
    if (storageApplication) {
      const application = JSON.parse(storageApplication) as Application;
      setParcelId(application.parcelID);
      setApplication(application);
      const undoneID = application.identification.length > 0 && application.identification.length < 4;
      setIdInProgress(undoneID);
      setIdentificationDone(application.identification.length == 4);
    } else {
      navigate("../../construction-permit");
    }
  }, []);

const handleContinue = () => {
  if (application) application.parcelID = parcelId;
    setApplication(application);
    localStorage.setItem("application", JSON.stringify(application));

    if (application.identification.length < 1) navigate(`../${id}/identification`)
    else if(application.pendingDocuments.length > 0) navigate(`../${id}/documents`);
    else navigate(`../${id}`);
  }


const handleSave = () => {
  if (application) application.parcelID = parcelId;
    setApplication(application);
    localStorage.setItem("application", JSON.stringify(application));
    navigate(`../${id}`);
  }

  return (
    <>
      <Flex mb="30px" gap="20px" direction="column">
        <Grid
            gap="20px"
            templateAreas={{
              xs: `"heading" "parcel"`,
              sm: `"heading" "parcel"`,
              md: `"heading parcel"`,
            }}
          >
          <GridItem area="heading"
            gap="10px"
            flexDirection="column"
            display="flex">
            <Flex>
              <Text variant="title" size="md" mt="5px">
               {t('application.overview.title')}{" "}
                <span style={{ color: colors.secondary[600] }}>#{id}</span>
              </Text>
            </Flex>
            <Flex
              direction="column"
              alignSelf="bottom"
              display={{base: "none", md: "flex"}}>
              <StepStatus
                id={application.id}
                activeStep="parcel"
                status={
                  {
                    parcel: application.parcelID === "" ? Status.NOT_STARTED : Status.COMPLETED,
                    identification:
                      identificationDone?Status.COMPLETED:(idInProgress?Status.IN_PROGRESS:Status.NOT_STARTED),
                    documents: (
                      application.action === "documentsRequired" &&
                      application.pendingDocuments.length > 0
                        ? Status.IN_PROGRESS
                        : (application.documents.length == 0)
                        ? Status.NOT_STARTED
                        : (application.documents.length > 0 && application.pendingDocuments.length > 0)?Status.IN_PROGRESS:Status.COMPLETED)
                  }
                }
              />
            </Flex>
          </GridItem>
          <GridItem area="parcel" display="flex" flexDirection="column" gap="20px">
            <Heading size="md" variant="title">
              {t('application.parcel.title')}
            </Heading>
            <Text>{t('application.parcel.desc1')}</Text>
            <Text size="sm">
            {t('application.parcel.desc2')}
            </Text>
            <Flex direction="column" gap="10px">
              <FormLabel>{t('application.parcel.title')}</FormLabel>
              <Flex gap="10px" direction={{base:"column", md: "row"}}>
                <FormControl width={{base: "100%", md:"70%"}}>
                  <Input
                  maxLength={7}
                  defaultValue={parcelId}
                  onChange={(e) => setParcelId(e.target.value)}
                  placeholder={t('application.parcel.placeholder')} />
                </FormControl>
                <Button 
                width={{base: "100%", md:"30%"}}
                  onClick={() => setMapOpened(true)}
                  variant="outline"
                  colorScheme="admin"
                >
                  {t('application.parcel.select-from-map')}
                </Button>
              </Flex>
            </Flex>
            {
              (parcelId.length != 7) ? (
                <Flex
                  direction="column"
                  borderRadius="16px"
                  backgroundColor={colors.theme.light}
                  p="10px"
                >
                  <VStack spacing="10px" alignItems="left">
                    <Text variant="title" size="lg">
                    {t('application.parcel.parcel-info.title')}
                    </Text>
                    <Text>
                    {t('application.parcel.parcel-info.placeholder')}
                    </Text>
                  </VStack>
                </Flex>
              ) : (
                <>
                  <ListCard>
                    <Text variant="title" size="lg">
                    {t('application.parcel.parcel-info.title')}
                    </Text>
                    <HStack w="100%">
                      <dl style={{ width: "50%" }}>
                        <Text>{t('application.parcel.parcel-info.parcel-number')}</Text>
                      </dl>
                      <dd style={{ width: "50%" }}>
                        <Text>{parcelId}</Text>
                      </dd>
                    </HStack>
                    <HStack w="100%">
                      <dl style={{ width: "50%" }}>
                        <Text>{t('application.parcel.parcel-info.coordinates')}</Text>
                      </dl>
                      <dd style={{ width: "50%" }}>
                        <Text>{t('application.parcel.parcel-info.coordinates.crd1')}</Text>
                        <Text>{t('application.parcel.parcel-info.coordinates.crd2')}</Text>
                      </dd>
                    </HStack>
                    <HStack w="100%">
                      <dl style={{ width: "50%" }}>
                        <Text>{t('application.parcel.parcel-info.total-area')}</Text>
                      </dl>
                      <dd style={{ width: "50%" }}>
                        <Text>2784</Text>
                      </dd>
                    </HStack>
                    <HStack w="100%">
                      <dl style={{ width: "50%" }}>
                        <Text>{t('application.parcel.parcel-info.floor-area-ratio')}</Text>
                      </dl>
                      <dd style={{ width: "50%" }}>
                        <Text>1.5</Text>
                      </dd>
                    </HStack>
                    <HStack w="100%">
                      <dl style={{ width: "50%" }}>
                        <Text>{t('application.parcel.parcel-info.land-use-function.title')}</Text>
                      </dl>
                      <dd style={{ width: "50%" }}>
                        <Text>{t('application.parcel.parcel-info.land-use-function.use')}</Text>
                      </dd>
                    </HStack>
                    <HStack w="100%">
                      <dl style={{ width: "50%" }}>
                        <Text>{t('application.parcel.parcel-info.restrictions.title')}</Text>
                      </dl>
                      <dd style={{ width: "50%" }}>
                        <Text>{t('application.parcel.parcel-info.restrictions.restr1')}</Text>
                        <Text>{t('application.parcel.parcel-info.restrictions.restr2')}</Text>
                        <Text>{t('application.parcel.parcel-info.restrictions.restr3')}</Text>
                      </dd>
                    </HStack>
                  </ListCard>
                </>
              )
            }
            <Grid
                gap="10px"
                w="100%"
                gridAutoColumns={{base:"100%", md: "50%"}}
                templateAreas={{
                  base: `"a" "b"`,
                  md: `"b a"`
              }}>
              <Button gridArea="a" width="100%" colorScheme={(parcelId.length == 7)?"admin":"disabled"} disabled={(parcelId.length != 7)} onClick={() => (parcelId.length == 7)?handleContinue():""}>
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
