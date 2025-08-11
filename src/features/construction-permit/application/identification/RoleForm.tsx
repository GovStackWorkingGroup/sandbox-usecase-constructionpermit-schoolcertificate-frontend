import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { ROLE } from "../../../../rpc/types";

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
  function RoleFormData(role: ROLE) {
    switch (role) {
      case ROLE.PROPERTY_OWNER:
        return {
          role: t('application.identification.roles.property-owner.role'),
          description: t('application.identification.roles.property-owner.description'),
          name: t('application.identification.roles.property-owner.name'),
          id: t('application.identification.roles.property-owner.id')
        }
      case ROLE.LEAD_ARCHITECT_OR_ENGINEER:
        return {
          role: t('application.identification.roles.lead-architect-engineer.role'),
          description: t('application.identification.roles.lead-architect-engineer.description'),
          name: t('application.identification.roles.lead-architect-engineer.name'),
          id: t('application.identification.roles.lead-architect-engineer.id')
        }
      case ROLE.PRINCIPAL_CONTRACTOR:
        return {
          role: t('application.identification.roles.principal-contractor.role'),
          description: t('application.identification.roles.principal-contractor.description'),
          name: t('application.identification.roles.principal-contractor.name'),
          id: t('application.identification.roles.principal-contractor.id')
        }
      case ROLE.OTHER:
        return {
          role: t('application.identification.roles.other.role'),
          description: t('application.identification.roles.other.description'),
          name: t('application.identification.roles.other.name'),
          id: t('application.identification.roles.other.id')
        }
    }
  }
  return (
    <>
      <Text fontWeight='bold'>{RoleFormData(role)?.role}</Text>
      <Text>{t(`Please provide the ${RoleFormData(role)?.description} following information.`)}</Text>
      <FormControl>
        <FormLabel>{RoleFormData(role)?.name}</FormLabel>
        <Input value={name ?? ""} onChange={(e) => setName(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>{RoleFormData(role)?.id}</FormLabel>
        <Input value={id ?? ""} onChange={(e) => setId(e.target.value)} />
      </FormControl>
    </>
  );
}
