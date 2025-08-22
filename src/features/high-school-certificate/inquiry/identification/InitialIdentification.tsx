import { Flex, FormControl, FormLabel, Input, Link, Text } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ROLE } from "../../../../rpc/types";

interface InitialIdentificationProps {
  selectedRole: ROLE;
  handleRoleChange: (e: ChangeEvent<Element>) => void;
  name: string;
  idNumber: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setIdNumber: React.Dispatch<React.SetStateAction<string>>;
}

export default function InitialIdentification({
  selectedRole,
  handleRoleChange,
  name,
  idNumber,
  setName,
  setIdNumber,
}: InitialIdentificationProps) {
  const { t } = useTranslation();
  const placeholderFullName = t('inquiry.certificate.placeholder1');
  const placeholderIdNumber = t('inquiry.certificate.placeholder2');

  // Use refs to clear placeholder text on first focus
  const fullNameInputRef = useRef<HTMLInputElement>(null);
  const idNumberInputRef = useRef<HTMLInputElement>(null);

  const handleFullNameFocus = () => {
    if (name === placeholderFullName && fullNameInputRef.current) {
      setName('');
    }
  };
  const handleIdNumberFocus = () => {
    if (idNumber === placeholderIdNumber && idNumberInputRef.current) {
      setIdNumber('');
    }
  };

  function updateInquiryField(field: string, value: string) {
    const inquiry = JSON.parse(localStorage.getItem('inquiry') || '{}');
    inquiry[field] = value;
    localStorage.setItem('inquiry', JSON.stringify(inquiry));
  }

  useEffect(() => {
    const inquiry = JSON.parse(localStorage.getItem('inquiry') || '{}');
    if (inquiry.studentFullName) setName(inquiry.studentFullName);
    if (inquiry.studentID) setIdNumber(inquiry.studentID);
  }, []);

  return (
    <>
      <Text mb={2}>
        {t('inquiry.identification.desc2')}{" "}
        <Text as={Link} size="xs" color="blue.500">
          {t('inquiry.certificate.preferences.option2')}
        </Text>
      </Text>
      <FormControl width={{ base: "100%", md: "70%" }}>
        {/* Full Name Input */}
        <Text>{t('inquiry.identification.student.full-name')}</Text>
        <Input
          ref={fullNameInputRef}
          maxLength={64}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            updateInquiryField('studentFullName', e.target.value); // <-- add this line
          }}
          onFocus={handleFullNameFocus}
          placeholder={placeholderFullName}
          mb={4}
        />
        {/* Student ID Input */}
        <Text mt={2}>{t('inquiry.identification.student.id')}</Text>
        <Input
          ref={idNumberInputRef}
          maxLength={32}
          value={idNumber}
          onChange={(e) => {
            setIdNumber(e.target.value);
            updateInquiryField('studentID', e.target.value); // <-- add this line
          }}
          onFocus={handleIdNumberFocus}
          placeholder={placeholderIdNumber}
          mb={2}
        />
      </FormControl>
      <Text fontSize="sm" color="red.500" mb={2}>
        {t('inquiry.identification.alert')}
        <Text as={Link} size="xs" color="red.500" mb={2}>
          ({t('inquiry.certificate.preferences.option2')})
        </Text>
      </Text>
    </>
  );
}
