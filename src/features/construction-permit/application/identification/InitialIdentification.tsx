import { FormControl, HStack, Select, Text } from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import ListCard from "../../../../components/list-card/ListCard";
import { ROLE } from "./Identification";

export default function InitialIdentification({
  selectedRole,
  handleRoleChange,
}: {
  selectedRole: ROLE;
  handleRoleChange: (e: ChangeEvent) => void;
}) {
  const { t } = useTranslation();
  return (
    <>
      <FormControl gap="10px" display="flex" flexDirection="column">
        <Text variant="title" size="lg">
          {t('application.identification.roles.role')}
        </Text>
        <Select value={selectedRole} onChange={handleRoleChange}>
          <option disabled>{t('application.identification.roles.select-role')}</option>
          <option value={ROLE.PROPERTY_OWNER}>{t('application.identification.roles.property-owner.role')}</option>
          <option value={ROLE.PRINCIPAL_CONTRACTOR}>
            {t('application.identification.roles.principal-contractor.role')}
          </option>
          <option value={ROLE.LEAD_ARCHITECT_OR_ENGINEER}>
            {t('application.identification.roles.lead-architect-engineer.role')}
          </option>
          <option value={ROLE.OTHER}>{t('application.identification.roles.other.add-explanation')}</option>
        </Select>
      </FormControl>
      <Text variant="title" size="lg">
        {t('application.identification.contact-information.title')}
      </Text>
      <Text>
        {t('application.identification.contact-information.description')}
      </Text>
      <ListCard>
        <HStack>
          <dl style={{ width: "50%" }}>
            <Text size="sm" fontWeight="500">
              {t('application.identification.contact-information.name')}
            </Text>
          </dl>
          <dd style={{ width: "50%" }}>
            <Text>Lewis Mumford</Text>
          </dd>
        </HStack>
        <HStack>
          <dl style={{ width: "50%" }}>
            <Text size="sm" fontWeight="500">
              {t('application.identification.contact-information.id')}
            </Text>
          </dl>
          <dd style={{ width: "50%" }}>
            <Text>9164993</Text>
          </dd>
        </HStack>

        <HStack>
          <dl style={{ width: "50%" }}>
            <Text size="sm" fontWeight="500">
              {t('application.identification.contact-information.email')}
            </Text>
          </dl>
          <dd style={{ width: "50%" }}>
            <Text>lewis.mumford@email.com</Text>
          </dd>
        </HStack>

        <HStack>
          <dl style={{ width: "50%" }}>
            <Text size="sm" fontWeight="500">
              {t('application.identification.contact-information.phone')}
            </Text>
          </dl>
          <dd style={{ width: "50%" }}>
            <Text>(123) 123 123 123</Text>
          </dd>
        </HStack>
      </ListCard>
    </>
  );
}
