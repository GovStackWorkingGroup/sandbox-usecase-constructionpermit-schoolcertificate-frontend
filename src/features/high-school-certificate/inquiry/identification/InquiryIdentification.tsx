// features/high-school-certificate/inquiry/identification/InquiryIdentification.tsx
import { Button, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import InitialIdentification from "./InitialIdentification";
import { ROLE } from "../../../../rpc/types";

export default function InquiryIdentification() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Step 1 local state
  const [name, setName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [selectedRole, setSelectedRole] = useState<ROLE>(ROLE.HIGHSCHOOL_GRADUATE);

  // Rehydrate when user comes back to this step
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("inquiry") || "{}");
      if (saved.studentFullName) setName(saved.studentFullName);
      if (saved.studentID) setIdNumber(saved.studentID);
      if (saved.selectedRole) setSelectedRole(saved.selectedRole as ROLE);
    } catch { /* ignore */ }
  }, []);

  const onContinue = () => {
    // Persist and go to step 2 (relative to :id/identification)
    const saved = (() => {
      try { return JSON.parse(localStorage.getItem("inquiry") || "{}"); }
      catch { return {}; }
    })();

    saved.studentFullName = name;
    saved.studentID = idNumber;
    saved.selectedRole = selectedRole;
    saved.identificationStarted = true;

    localStorage.setItem("inquiry", JSON.stringify(saved));
    navigate("preferences");
  };

  return (
    <Flex direction="column" gap="16px">
      <Text>{t("inquiry.identification.next1")}</Text>

      <InitialIdentification
        selectedRole={selectedRole}
        handleRoleChange={(e) =>
          setSelectedRole((e.target as HTMLSelectElement).value as ROLE)
        }
        name={name}
        idNumber={idNumber}
        setName={setName}
        setIdNumber={setIdNumber}
      />

      <Button
        width="100%"
        colorScheme="admin"
        onClick={onContinue}
        // disable until both fields have values
        isDisabled={!name || !idNumber}
      >
        {t("button.continue")}
      </Button>
    </Flex>
  );
}
