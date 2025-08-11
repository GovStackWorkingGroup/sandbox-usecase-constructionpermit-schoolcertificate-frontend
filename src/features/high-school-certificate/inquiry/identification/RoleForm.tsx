import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { ROLE } from "../../../../rpc/types"; // Ensure this import matches your project structure

export default function RoleForm({
  role,
  name,
  id,
  setName,
  setId,
}: {
  role: ROLE;
  name: string | null;
  id: string | null;
  setName: Dispatch<SetStateAction<string>>;
  setId: Dispatch<SetStateAction<string>>;
}) {

  const { t } = useTranslation();
  function getRoleFormData(role: ROLE) {
    switch (role) {
      case ROLE.HIGHSCHOOL_GRADUATE:
        return {
          role: t('inquiry.identification.roles.highschool-graduate.role'),
          description: t('inquiry.identification.roles.highschool-graduate.description'),
          name: t('inquiry.identification.roles.highschool-graduate.name'),
          id: t('inquiry.identification.roles.highschool-graduate.id')
        }
      default:
        return {
          role: t('inquiry.identification.roles.default.role'),
          description: t('inquiry.identification.roles.default.description'),
          name: t('inquiry.identification.roles.default.name'),
          id: t('inquiry.identification.roles.default.id')
        }
    }
  }

  const roleData = getRoleFormData(role);

  return (
    <>
      <Text fontWeight='bold'>{roleData.role}</Text>
      <Text>{t(`Please provide the ${roleData.description} following information.`)}</Text>
      <FormControl>
        <FormLabel>{roleData.name}</FormLabel>
        <Input value={name ?? ""} onChange={(e) => setName(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>{roleData.id}</FormLabel>
        <Input value={id ?? ""} onChange={(e) => setId(e.target.value)} />
      </FormControl>
    </>
  );
}
