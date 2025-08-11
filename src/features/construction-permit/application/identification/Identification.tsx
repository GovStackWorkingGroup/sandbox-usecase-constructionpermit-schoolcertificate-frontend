import PlusIcon from "@assets/icons/plus.svg?react";
import { Button, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useMemo, useReducer, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { colors } from "../../../../chakra-overrides/colors";
import { Status } from "../../../../components/status/ApplicationStatus";
import { Application } from "../../../../rpc/types";
import StepStatus from "../overview/components/StepStatus";
import InitialIdentification from "./InitialIdentification";
import Overview from "./Overview";
import RoleForm from "./RoleForm";


export enum ROLE {
  PROPERTY_OWNER = "PROPERTY_OWNER",
  PRINCIPAL_CONTRACTOR = "PRINCIPAL_CONTRACTOR",
  LEAD_ARCHITECT_OR_ENGINEER = "LEAD_ARCHITECT_OR_ENGINEER",
  OTHER = "OTHER",
}

export interface RoleData {
  name: string | null;
  idNumber: string | null;
}

const initialState = {
  [ROLE.PROPERTY_OWNER]: { name: null, idNumber: null },
  [ROLE.PRINCIPAL_CONTRACTOR]: { name: null, idNumber: null },
  [ROLE.LEAD_ARCHITECT_OR_ENGINEER]: { name: null, idNumber: null },
  [ROLE.OTHER]: { name: null, idNumber: null },
};

type ActionType = "EDIT_ROLE";

export interface RoleAction {
  type: ActionType;
  role: ROLE;
  data: RoleData;
}

function rolesReducer(state = initialState, action: RoleAction) {
  switch (action.type) {
    case "EDIT_ROLE":
      return { ...state, [action.role]: action.data };
    default:
      return state;
  }
}

export default function Identification() {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [idNumber, setIdNumber] = useState<string>("9164993");
  const [name, setName] = useState<string>("Lewis Mumford");
  const [selectedRole, setSelectedRole] = useState<ROLE>(ROLE.PROPERTY_OWNER);
  const [identificationDone, setIdentificationDone] = useState(false);
  const [idInProgress, setIdInProgress] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [state, dispatch] = useReducer(rolesReducer, initialState);
  const handleRoleChange = (e: ChangeEvent) => {
    setSelectedRole((e.target as HTMLSelectElement).value as ROLE);
  };
  const application = {
    id: `${id}`,
    status: Status.DRAFT,
    parcelID: "",
    action: "inReview",
    identification: [],
    documents: [],
    pendingDocuments: [],
    inspectionDate: ""
  };

  const handleAddPerson = () => {
    console.log(t('application.overview.person-added'));
  };

  const handleSave = () => {
    const storage = localStorage.getItem("application");
    if (storage) {
      const application = JSON.parse(storage) as Application;
      Object.keys(state).map((key, index) => {
        if (Object.values(state)[index].name != null || key == ROLE.OTHER) application.identification = [...application.identification.filter((role) => role.role != key), { role: key as ROLE, data: Object.values(state)[index] }];
      });
      localStorage.setItem("application", JSON.stringify(application));
      navigate(`../${id}`);
    }
  };

  const handleContinue = () => {
    if (!isFinished) {
      dispatch({
        type: "EDIT_ROLE",
        role: selectedRole,
        data: { name, idNumber },
      });
      setIdNumber("");
      setName("");
      roleToFill && setSelectedRole(roleToFill);
    } else {
      const storage = localStorage.getItem("application");
      if (storage) {
        const application = JSON.parse(storage) as Application;
        Object.keys(state).map((key, index) => {
          application.identification = [
            ...application.identification.filter((role) => role.role != key),
            { role: key as ROLE, data: Object.values(state)[index] },
          ];
        });
        localStorage.setItem("application", JSON.stringify(application));
        if (application.identification.length < 1)
          navigate(`../${id}/identification`);
        else if (application.pendingDocuments.length > 0)
          navigate(`../${id}/documents`);
        else navigate(`../${id}`);
      } else {
        return navigate("../../construction-permit");
      }
    }
  };
  const isFirstIdentification = useMemo(() => {
    return !Object.values(state).some((el) => el.idNumber && el.name);
  }, [state]);
  const roleToFill = useMemo(() => {
    const role = Object.entries(state).find(
      ([key, val]) => !val.idNumber && !val.name,
    );
    if (role) {
      return role[0] as ROLE;
    }
    return null;
  }, [state]);

  const storageApplication = localStorage.getItem("application");

  useEffect(() => {
    if (roleToFill === ROLE.OTHER) {
      setIsFinished(true);
    }
    if (roleToFill && roleToFill !== ROLE.OTHER) {
      setSelectedRole(roleToFill);
    }

    if (storageApplication) {
      const application = JSON.parse(storageApplication) as Application;
      // setApplication(application);
      const undoneID = application.identification.length > 0 && application.identification.length < 4;
      setIdInProgress(undoneID);
      setIdentificationDone(application.identification.length == 4);
    } else {
      navigate("../../construction-permit");
    }

  }, [roleToFill]);
  return (
    <>
      <Flex gap="20px" direction="column">
        <Grid
          gap="20px"
          templateAreas={{
            base: `"heading" "identification" "buttons"`,
            md: `"heading identification"
              "heading buttons"`,
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
                activeStep="identification"
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
          <GridItem area="identification" gap="20px" display="flex" flexDirection="column" >
            <Heading size="md" variant="title">
              {t('application.identification.title')}
            </Heading>
            {isFinished ? (
              <>
                <Overview state={state} />
                <Flex
                  direction="row"
                  gap="20px"
                  cursor="pointer"
                  color={colors.theme.primary}
                  onClick={() => handleAddPerson()}
                >
                  <PlusIcon stroke={colors.theme.primary} />
                  <Text fontWeight="semibold">
                    {t('application.identification.add-person')}
                  </Text>
                </Flex>
              </>
            ) : (
              <>
                {isFirstIdentification ? (
                  <InitialIdentification
                    selectedRole={selectedRole}
                    handleRoleChange={handleRoleChange}
                  />
                ) : (
                  <RoleForm
                    name={name}
                    id={idNumber}
                    role={roleToFill ?? ROLE.LEAD_ARCHITECT_OR_ENGINEER}
                    setId={setIdNumber}
                    setName={setName}
                  />
                )}
              </>
            )}
            <Flex marginTop="auto" mb="20px" direction={{ base: "column", md: "row" }} w="100%" gap="10px">
              <Grid
                gap="10px"
                w="100%"
                gridAutoColumns={{ base: "100%", md: "50%" }}
                templateAreas={{
                  base: `"a" "b"`,
                  md: `"b a"`
                }}>
                <Button gridArea="a" width="100%" onClick={() => handleContinue()} colorScheme="admin">
                  {t('button.continue')}
                </Button>
                <Button
                  gridArea="b"
                  width="100%"
                  onClick={() => handleSave()}
                  variant="outline"
                  colorScheme="admin"
                >
                  {t('button.save-for-later')}
                </Button>
              </Grid>
            </Flex>
          </GridItem>
        </Grid>
      </Flex>
    </>
  );
}
