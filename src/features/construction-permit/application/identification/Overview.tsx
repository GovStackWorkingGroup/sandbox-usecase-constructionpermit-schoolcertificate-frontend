import EditIcon from "@assets/icons/edit.svg?react";
import { Flex, HStack, Spacer, Stack, StackDivider, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { colors } from "../../../../chakra-overrides/colors";
import { ROLE, RoleData } from "./Identification";

export default function Overview({ state }: { state: Record<ROLE, RoleData> }) {
  const editRole = (role: ROLE) => { }
  const { t } = useTranslation();
  return (
    <>
      <Text>{t('application.identification.overview.title')}</Text>
      <Flex
        backgroundColor={colors.secondary[50]}
        direction="column"
        gap="20px"
        p="10px"
        borderRadius="16px"
      >
        <Stack divider={<StackDivider />} spacing="10px">
          <Flex direction="row">
            <Text variant="title" size="lg">
              {t('application.identification.roles.property-owner.role')}
            </Text>
            <Spacer />
            <Flex gap="10px" onClick={() => editRole(ROLE.PROPERTY_OWNER)}>
              <Text color={colors.theme.primary} fontWeight="semibold">{t('button.edit')}</Text>
              <EditIcon stroke={colors.theme.primary} />
            </Flex>
          </Flex>
          <HStack w="100%">
            <dl style={{ width: "50%" }}>
              <Text>{t('application.identification.contact-information.name')}</Text>
            </dl>
            <dd style={{ width: "50%" }}>
              <Text>{state[ROLE.PROPERTY_OWNER].name}</Text>
            </dd>
          </HStack>
          <HStack w="100%">
            <dl style={{ width: "50%" }}>
              <Text>{t('application.identification.contact-information.id')}</Text>
            </dl>
            <dd style={{ width: "50%" }}>
              <Text>{state[ROLE.PROPERTY_OWNER].idNumber}</Text>
            </dd>
          </HStack>
          <HStack w="100%">
            <dl style={{ width: "50%" }}>
              <Text>{t('application.identification.contact-information.email')}</Text>
            </dl>
            <dd style={{ width: "50%" }}>
              <Text>{ROLE.PROPERTY_OWNER.toLowerCase()}@email.com</Text>
            </dd>
          </HStack>
          <HStack w="100%">
            <dl style={{ width: "50%" }}>
              <Text>{t('application.identification.contact-information.phone')}</Text>
            </dl>
            <dd style={{ width: "50%" }}>
              <Text>(122) 181 292</Text>
            </dd>
          </HStack>
        </Stack>
        <Stack divider={<StackDivider />} spacing="10px">
          <Flex direction="row" onClick={() => editRole(ROLE.PRINCIPAL_CONTRACTOR)}>
            <Text variant="title" size="lg">
              {t('application.identification.roles.principal-contractor.role')}
            </Text>
            <Spacer />
            <Flex gap="10px">
              <Text color={colors.theme.primary} fontWeight="semibold">Edit</Text>
              <EditIcon stroke={colors.theme.primary} />
            </Flex>
          </Flex>
          <HStack w="100%">
            <dl style={{ width: "50%" }}>
              <Text>{t('application.identification.contact-information.name')}</Text>
            </dl>
            <dd style={{ width: "50%" }}>
              <Text>{state[ROLE.PRINCIPAL_CONTRACTOR].name}</Text>
            </dd>
          </HStack>
          <HStack w="100%">
            <dl style={{ width: "50%" }}>
              <Text>{t('application.identification.contact-information.id')}</Text>
            </dl>
            <dd style={{ width: "50%" }}>
              <Text>{state[ROLE.PRINCIPAL_CONTRACTOR].idNumber}</Text>
            </dd>
          </HStack>
          <HStack w="100%">
            <dl style={{ width: "50%" }}>
              <Text>{t('application.identification.contact-information.email')}</Text>
            </dl>
            <dd style={{ width: "50%" }}>
              <Text>{ROLE.PRINCIPAL_CONTRACTOR.toLowerCase()}@email.com</Text>
            </dd>
          </HStack>
          <HStack w="100%">
            <dl style={{ width: "50%" }}>
              <Text>{t('application.identification.contact-information.phone')}</Text>
            </dl>
            <dd style={{ width: "50%" }}>
              <Text>(422) 182 152</Text>
            </dd>
          </HStack>
        </Stack>
        <Stack divider={<StackDivider />} spacing="10px">
          <Flex direction="row">
            <Text variant="title" size="lg">
              {t('application.identification.roles.lead-architect-engineer.role')}
            </Text>
            <Spacer />
            <Flex gap="10px" onClick={() => editRole(ROLE.LEAD_ARCHITECT_OR_ENGINEER)}>
              <Text color={colors.theme.primary} fontWeight="semibold">Edit</Text>
              <EditIcon stroke={colors.theme.primary} />
            </Flex>
          </Flex>
          <HStack w="100%">
            <dl style={{ width: "50%" }}>
              <Text>{t('application.identification.contact-information.name')}</Text>
            </dl>
            <dd style={{ width: "50%" }}>
              <Text>{state[ROLE.LEAD_ARCHITECT_OR_ENGINEER].name}</Text>
            </dd>
          </HStack>
          <HStack w="100%">
            <dl style={{ width: "50%" }}>
              <Text>{t('application.identification.contact-information.id')}</Text>
            </dl>
            <dd style={{ width: "50%" }}>
              <Text>{state[ROLE.LEAD_ARCHITECT_OR_ENGINEER].idNumber}</Text>
            </dd>
          </HStack>
          <HStack w="100%">
            <dl style={{ width: "50%" }}>
              <Text>{t('application.identification.contact-information.email')}</Text>
            </dl>
            <dd style={{ width: "50%" }}>
              <Text>{ROLE.LEAD_ARCHITECT_OR_ENGINEER.toLowerCase()}@email.com</Text>
            </dd>
          </HStack>
          <HStack w="100%">
            <dl style={{ width: "50%" }}>
              <Text>{t('application.identification.contact-information.phone')}</Text>
            </dl>
            <dd style={{ width: "50%" }}>
              <Text>(512) 212 953</Text>
            </dd>
          </HStack>
        </Stack>
      </Flex>
    </>
  );
}
