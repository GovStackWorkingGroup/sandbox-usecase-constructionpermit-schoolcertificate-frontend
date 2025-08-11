import DownloadIcon from "@assets/icons/download.svg?react";
import DeleteIcon from "@assets/icons/trash.svg?react";
import UploadIcon from "@assets/icons/upload.svg?react";
import {
  Button,
  CircularProgress,
  Flex,
  Grid,
  GridItem,
  Heading,
  Link,
  ListItem,
  Text,
  UnorderedList
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { colors } from "../../chakra-overrides/colors";
import { Status } from "../../components/status/ApplicationStatus";
import { RPCContext } from "../../rpc/rpc";
import { Application } from "../../rpc/types";
import StepStatus from "../construction-permit/application/overview/components/StepStatus";

export default function FileUpload() {
  const { id } = useParams();
  const { t } = useTranslation();
  const rpc = useContext(RPCContext);
  const navigate = useNavigate();
  const [identificationDone, setIdentificationDone] = useState(false);
  const [idInProgress, setIdInProgress] = useState(false);

  const [application, setApplication] = useState<Application>({
    id: `${id}`,
    status: Status.DRAFT,
    action: "inReview",
    parcelID: "",
    identification: [],
    documents: [],
    pendingDocuments: [],
    inspectionDate: ""
  });

  const [documents, setDocuments] =
    useState<{
      name: string,
      progress: number,
      url: string
    }[]>(application.documents);

  const { data: applications } = useQuery(
    `applications`,
    rpc.getApplications,
    {
      onSuccess: (applications) => {
        const onGoingApplication = applications.find((application: Application) => application.id === id);
        const localApplication = localStorage.getItem("application");
        if (localApplication && JSON.parse(localApplication).id == id) {
          const application = localStorage.getItem("application");
          if (application && JSON.parse(application).id == id) {
            const app = JSON.parse(application) as Application;
            setApplication(app);
            setDocuments(app.documents);
          } else {
            localStorage.setItem("application", JSON.stringify(application));
          }
        } else if (onGoingApplication) {
          localStorage.setItem("application", JSON.stringify(onGoingApplication));
          setApplication(onGoingApplication);
        } else {
          navigate("../../construction-permit");
        }
      }
    }
  );

  function mockUpload() {
    if (application.pendingDocuments.length > 0) {
      let uploadedDocs: { name: string, progress: number, url: string }[] = [];
      application.pendingDocuments.forEach((document) => {
        uploadedDocs.push({ name: document.name, progress: 100, url: "" });
      });
      setDocuments([...documents, ...uploadedDocs]);
      application.documents = [...documents, ...uploadedDocs];
      application.pendingDocuments = [];
      localStorage.setItem("application", JSON.stringify(application));
    } else {
      alert("All required documents are uploaded!");
    }
  }

  function handleChange(event: any) {
    const prevDoc = documents.find(document => document.progress < 100);
    if (prevDoc) prevDoc.progress = prevDoc.progress + 50;

    const documentName = event.target.files[0].name;
    const doc = documents.find(document => document.name == documentName);
    if (!doc) {
      setDocuments(
        [
          ...documents,
          {
            name: documentName,
            progress: 50,
            url: ""
          }
        ]);
    }
  }

  const handleSave = () => {
    if (application.action == "documentsRequired") {
      navigate(`../../construction-permit/my-applications`);
    } else {
      application.documents = documents;
      localStorage.setItem("application", JSON.stringify(application));
      navigate(`../../construction-permit/application/${id}`);
    }
  }

  const handleRemove = (event: any) => {
    const removedFile = documents.find((document) => document.name == event.name);
    if (removedFile) application.pendingDocuments.push({ name: removedFile.name, extensions: "" });
    setDocuments(documents.filter((document) => document.name != event.name));
    application.documents = documents.filter((document) => document.name != event.name);
    localStorage.setItem("application", JSON.stringify(application));
  }

  const handleUpload = () => {
    if (application.documents.length != 0 && application.pendingDocuments.length == 0) {
      application.documents = documents;
      localStorage.setItem("application", JSON.stringify(application));

      if (application.action == "documentsRequired") {
        if (applications) {
          application.action = "inReview";
          application.status = Status.IN_REVIEW;
          rpc.forceSetData(
            "applications",
            JSON.stringify([
              ...applications.filter((appl) => appl.id != application.id),
              application,
            ]),
          );
          return navigate('./sent');
        }
      }

      if (application.identification.length < 1) navigate(`../${id}/identification`);
      else if ((application.parcelID ?? "").length < 1) navigate(`../${id}/parcel`);
      else navigate(`../${id}`);
    } else {
      alert(t('application.documents.upload.all-documents-uploaded'));
    }
  }

  const storageApplication = localStorage.getItem("application");

  useEffect(() => {
    if (storageApplication) {
      const application = JSON.parse(storageApplication) as Application;
      setApplication(application);
      const undoneID = application.identification.length > 0 && application.identification.length < 4;
      setIdInProgress(undoneID);
      setIdentificationDone(application.identification.length == 4);
    }
  }
  );

  return (
    <Grid
      gap="20px"
      templateAreas={{
        xs: `"heading" "documents"`,
        sm: `"heading" "documents"`,
        md: `"heading documents"`,
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
          display={{ base: "none", md: "flex" }}>
          <StepStatus
            id={application.id}
            activeStep="documents"
            status={
              {
                parcel: application.parcelID === "" ? Status.NOT_STARTED : Status.COMPLETED,
                identification:
                  identificationDone ? Status.COMPLETED : (idInProgress ? Status.IN_PROGRESS : Status.NOT_STARTED),
                documents: (
                  application.action === "documentsRequired" &&
                    application.pendingDocuments.length > 0
                    ? Status.IN_PROGRESS
                    : (application.documents.length == 0)
                      ? Status.NOT_STARTED
                      : (application.documents.length > 0 && application.pendingDocuments.length > 0) ? Status.IN_PROGRESS : Status.COMPLETED)
              }
            }
          />
        </Flex>
      </GridItem>
      <GridItem area="documents">
        <Flex direction="column" gap="20px" flexGrow={1}>
          <Heading variant="headline">{t('application.documents.upload.title')}</Heading>
          <Text >
            {t('application.documents.upload.desc1')}
          </Text>
          <>
            <UnorderedList px="10px">
              {
                application.pendingDocuments.map((document, index) =>
                  <ListItem key={index}>
                    {document.name} ({document.extensions})
                  </ListItem>
                )
              }
            </UnorderedList>
          </>
          <Text>
            {t('application.documents.upload.desc2')}
            <Link as={RouterLink} to="" style={{ color: colors.theme.primary }}>{t('application.documents.upload.digitally-signed')} </Link>
            {t('application.documents.upload.desc3')}
          </Text>
        </Flex><br />
        <Flex>
          {/* <Input
            type="file"
            id="fileUpload"
            display="none"
            // accept='.pdf .jpg'
            onChange={handleChange} /> */}
          <Flex
            direction="row"
            gap="30px"
            padding="25px"
            alignContent="center"
            justifyContent="center"
            border="2px dashed grey"
            w="100%"
            borderRadius="10px"
            onClick={() => mockUpload()}>
            {/* onClick={() => document.getElementById("fileUpload")?.click()}> */}
            <UploadIcon stroke="grey" height="2rem" width="2rem" />
            <Text color="grey" size="lg" alignSelf="center">{t('application.documents.upload.select-file')}</Text>
          </Flex>
        </Flex><br />
        <Flex
          borderRadius="10px"
          padding="10px"
          background={colors.theme.light}
          direction="column">
          <Text fontWeight="semibold">
            {t('application.documents.upload.uploaded-documents')}
          </Text><br />
          {
            (documents.length > 0) ? (documents.map((document, index) =>
              <React.Fragment key={index}>
                <Flex direction="row" padding="0.3rem" flexGrow={1}>
                  <Text maxW="20rem" alignSelf="center">{document.name}</Text>
                  {
                    (document.progress < 100) ? (
                      <>
                        <Flex direction="row" gap="15px" flexGrow={1}>
                          <Text px="10px" color="lightgray">({t('application.documents.upload.uploading')})</Text>
                          <CircularProgress
                            marginStart="auto"
                            size="1.3rem"
                            value={document.progress}
                            color={colors.theme.primary} />
                        </Flex>
                      </>
                    ) : (
                      <>
                        <Flex direction="row" gap="15px" marginStart="auto">
                          <DownloadIcon onClick={undefined} />
                          <DeleteIcon onClick={() => handleRemove(document)} />
                        </Flex>
                      </>
                    )
                  }
                </Flex>
              </React.Fragment>
            )) : (
              <Text>{t('application.documents.upload.no-documents')}</Text>
            )
          }
        </Flex>
        <Flex padding="10px" marginTop="auto" width="100%" direction={{ base: "column", md: "row" }}>
          <Grid
            w="100%"
            gap="10px"
            templateAreas={{
              xs: `"a" "b"`,
              sm: `"a" "b"`,
              md: `"b a"`,
            }}
          >
            <Button gridArea="a" width="100%" onClick={() => handleUpload()} colorScheme="admin" variant="solid" w="100%">
              {(application.action == "documentsRequired") ? (t('button.save')) : (t('button.continue'))}
            </Button>
            <Button gridArea="b" width="100%" onClick={() => handleSave()} colorScheme="admin" variant="outline" w="100%">
              {(application.action == "documentsRequired") ? (t('button.back')) : (t('button.save-for-later'))}
            </Button>
          </Grid>
        </Flex>
      </GridItem>
    </Grid>
  );
}
