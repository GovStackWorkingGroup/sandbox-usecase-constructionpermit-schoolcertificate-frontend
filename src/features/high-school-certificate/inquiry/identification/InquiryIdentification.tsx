import PlusIcon from "@assets/icons/plus.svg?react";
import { Box, Button, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useMemo, useReducer, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { colors } from "../../../../chakra-overrides/colors";
import { Status } from "../../../../components/status/ApplicationStatus";
import StepStatus from "../overview/components/StepStatus";
import InitialIdentification from "./InitialIdentification";
import Overview from "./Overview";
import IdentificationPreferences from "./IdentificationPreferences"; // <- NEW COMPONENT!
import RoleForm from "./RoleForm";
import { ROLE, RoleData } from "../../../../rpc/types";
import IdentificationAddressPreferences from "./IdentificationAddressPreferences";
import { IdentificationReview } from "./IdentificationReview";
import IdentificationPaymentPreferences from "./IdentificationPaymentPreferences";
import Inquiry from "../Inquiry";

export type RolesState = {
  [key in ROLE]: RoleData;
};

const initialState: RolesState = {
  [ROLE.HIGHSCHOOL_GRADUATE]: { name: null, idNumber: null },
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

function rolesReducer(state: RolesState, action: RoleAction): RolesState {
  switch (action.type) {
    case "EDIT_ROLE":
      return { ...state, [action.role]: action.data };
    default:
      return state;
  }
}

type PaymentMethod = "card" | "mobile_money" | "digital_wallet" | "bank_transfer";

export default function InquiryIdentification() {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1 = InitialIdentification, 2 = Preferences, 3 = AddressPreferences, 4 = Review
  const [preferencesValue, setPreferencesValue] = useState<string | null>(null);
  const [selectedOfficeAddress, setSelectedOfficeAddress] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const [showAddressSubStep, setShowAddressSubStep] = useState(false);

  type StepKey = "identification" | "preferences" | "review" | "payment";
  type StatusType = typeof Status.COMPLETED | typeof Status.NOT_STARTED | typeof Status.IN_PROGRESS;
  const inquiry = JSON.parse(localStorage.getItem('inquiry') || '{}');
  const activeStep: StepKey =
    step === 1 ? "identification" :
      step === 2 ? "preferences" :
        step === 3 ? "payment" :
          "review";

  const getStepStatus = (
    step: number,
  ): Record<StepKey, StatusType> => {
    return {
      identification: step === 1 ? Status.IN_PROGRESS : Status.COMPLETED,

      preferences:
        step > 2
          ? Status.COMPLETED
          : step === 2
            ? Status.IN_PROGRESS
            : Status.NOT_STARTED,

      // Review is step 4 in your flow
      review:
        step === 4
          ? Status.COMPLETED
          : step > 4
            ? Status.COMPLETED
            : Status.NOT_STARTED,

      // Payment is step 3 in your flow
      payment:
        step === 3
          ? Status.IN_PROGRESS
          : step > 3
            ? Status.COMPLETED
            : Status.NOT_STARTED,
    };
  };


  const statusObj = getStepStatus(step);

  function updateInquiryField(field: string, value: string) {

    inquiry[field] = value;
    localStorage.setItem('inquiry', JSON.stringify(inquiry));
  }

  const officeAddresses = [
    "Ministry of Education, Central Office, Main Street 1",
    "Ministry of Education, North Branch, Green Avenue 23",
    "Ministry of Education, South Branch, River Road 12",
    "Ministry of Education, East Branch, Lake Street 7",
  ];

  // ...other state and reducer logic as before
  const [idNumber, setIdNumber] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<ROLE>(ROLE.HIGHSCHOOL_GRADUATE);
  const [state, dispatch] = useReducer(rolesReducer, initialState);



  // Handle Next for step 1
  const handleContinue = () => {
    if (step === 1) {
      dispatch({
        type: "EDIT_ROLE",
        role: selectedRole,
        data: { name, idNumber },
      });
      setStep(2);   // Now step = 2, meaning Identification is done!
    }
  };

  // Handle Preferences save
  const handlePreferencesContinue = () => {
    if (preferencesValue === "office") {
      setShowAddressSubStep(true);
    } else {
      // Go to overview or next
      // navigate("/education/highschool-graduation-certificate/identification/overview");

    }
  };

  // Handle Address continue
  // const handleAddressContinue = () => {
  //   if (selectedOfficeAddress) {
  //     // Go to overview, and you can pass state if you use react-router location state
  //     // navigate(`/education/highschool-graduation-certificate/inquiries/review-inquiry/${id}`);
  //     // navigate(`/education/highschool-graduation-certificate/identification/`);
  //     //navigate(`/education/highschool-graduation-certificate/inquiry/identification/review`);

  //   }
  // };

  const handleAddressContinue = () => {
    if (selectedOfficeAddress) {
      setShowAddressSubStep(false);
      setStep(3); // Now go to Review step
      //navigate(`/education/highschool-graduation-certificate/inquiry/identification/review`);
      //navigate(`/education/highschool-graduation-certificate/inquiry/identification/review`);
    }
  };

  const handleReviewContinue = () => {
    // finishing step 3 (Payment Preferences) -> go to Review screen
    updateInquiryField('status', Status.COMPLETED);
    setStep(4); // you’re now on the Review step in the wizard
  };

  // Step 4 -> Payment route
  const handleGoToPayment = () => {
    navigate(`/education/highschool-graduation-certificate/inquiries/review-inquiry/payment`);
  };

  // Preferences options (use translation keys as needed)
  const preferencesOptions = [
    { value: "home", label: t('inquiry.identification.preferences.option1') || "Yes, to my home address." },
    { value: "office", label: t('inquiry.identification.preferences.option2') || "Yes, from the nearest Ministry of Education office." },
    { value: "digital", label: t('inquiry.identification.preferences.option3') || "No, I prefer to receive a digital copy only." },
  ];

  return (
    <Flex gap="20px" direction="column">
      <Grid
        gap="20px"
        templateAreas={{
          base: `"heading" "identification" "buttons"`,
          md: `"heading identification"
               "heading buttons"`,
        }}
      >
        {/* Heading & Status */}
        <GridItem area="heading" gap="10px" flexDirection="column" display="flex">
          <Flex>
            <Text variant="title" size="md" mt="5px">
              {t('inquiry.overview.heading')}{" "}
              <span style={{ color: colors.secondary[600] }}>#{id}</span>
            </Text>
          </Flex>
          <Flex
            direction="column"
            alignSelf="bottom"
            display={{ base: "none", md: "flex" }}>
            <StepStatus
              id={id as string}
              activeStep={activeStep}
              status={statusObj}
            />
          </Flex>
        </GridItem>

        {/* Main Step Content */}
        <GridItem area="identification" gap="20px" display="flex" flexDirection="column" >
          <Heading size="md" variant="title">
            {step === 1
              ? t('inquiry.identification.title')
              : step === 2
                ? t('inquiry.identification.preferences.title')
                : step === 3
                  ? t('inquiry.payment.title')
                  : step === 4
                    ? t('inquiry.review.title')
                    : t('inquiry.identification.default.title')
            }

          </Heading>
          {step === 1 && (
            <>
              <Text>{t('inquiry.identification.next1')}</Text>
              <InitialIdentification
                selectedRole={selectedRole}
                handleRoleChange={(e) => setSelectedRole((e.target as HTMLSelectElement).value as ROLE)}
                name={name}
                idNumber={idNumber}
                setName={setName}
                setIdNumber={setIdNumber}
              />
            </>
          )}
          {step === 2 && (
            showAddressSubStep ? (
              <>
                <Text>{t('inquiry.identification.next4')}</Text>
                <IdentificationAddressPreferences
                  selectedOfficeAddress={selectedOfficeAddress}
                  setSelectedOfficeAddress={setSelectedOfficeAddress}
                  addresses={officeAddresses}
                />

              </>
            ) : (
              <>
                <Text>{t('inquiry.identification.next3')}</Text>
                <IdentificationPreferences
                  value={preferencesValue}
                  onChange={setPreferencesValue}
                  options={preferencesOptions}
                />
              </>
            )
          )}
          {step === 3 && (
            <>
              <Text>{t('inquiry.identification.next2')}</Text>
              <IdentificationPaymentPreferences
                selectedPaymentMethod={selectedPaymentMethod}
                setSelectedPaymentMethod={setSelectedPaymentMethod}
              />
            </>
          )}
          {step === 4 && (
            <>
              <IdentificationReview
                isMobile={false}
              />

            </>

          )}
        </GridItem>

        {/* Bottom Buttons */}
        {/* Fixed action bar */}
        <Flex
          maxW="container.lg"
          mx="auto"
          gap="10px"
          direction={{ base: "column", md: "row" }}
          w="100%"
        >
          {step === 1 && (
            <Button
              width="100%"
              onClick={handleContinue}
              isDisabled={!name && !idNumber}
              colorScheme="admin"
            >
              {t("button.continue")}
            </Button>
          )}
          {step === 2 && (
            showAddressSubStep ? (
              <Button
                width="100%"
                onClick={handleAddressContinue}
                colorScheme="admin"
                isDisabled={!selectedOfficeAddress}
              >
                {t("button.continue")}
              </Button>
            ) : (
              <Button
                width="100%"
                onClick={handlePreferencesContinue}
                colorScheme="admin"
                isDisabled={!preferencesValue}
              >
                {t("button.continue")}
              </Button>
            )
          )}
          {step === 3 && (
            <Button
              width="100%"
              onClick={handleReviewContinue}
              colorScheme="admin"
              isDisabled={!selectedPaymentMethod}
            >
              {t("button.continue")}
            </Button>
          )}
          {step === 4 && (
            <Button
              width="100%"
              onClick={handleGoToPayment}
              colorScheme="admin"
              isDisabled={!selectedOfficeAddress}
            >
              {t("button.continue")}
            </Button>
          )}
        </Flex>
      </Grid>


    </Flex>
  );
}
