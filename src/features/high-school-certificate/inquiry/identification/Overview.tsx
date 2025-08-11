import EditIcon from "@assets/icons/edit.svg?react";
import { Flex, HStack, Spacer, Stack, StackDivider, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { colors } from "../../../../chakra-overrides/colors";
import { ROLE, RoleData } from "../../../../rpc/types"; // Ensure this import matches your project structure

export default function Overview({ state }: { state: Record<ROLE, RoleData> }) {
  const editRole = (role: ROLE) => { }
  const { t } = useTranslation();
  return (
    <>
      <Text>{t('inquiry.identification.overview.title')}</Text>
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
              {t('inquiry.identification.roles.property-owner.role')}
            </Text>
            <Spacer />
            <Flex gap="10px" onClick={() => editRole(ROLE.HIGHSCHOOL_GRADUATE)}>
              <Text color={colors.theme.primary} fontWeight="semibold">{t('button.edit')}</Text>
              <EditIcon stroke={colors.theme.primary} />
            </Flex>
          </Flex>
          <HStack w="100%">
            <dl style={{ width: "50%" }}>
              <Text>{t('inquiry.identification.contact-information.name')}</Text>
            </dl>
            <dd style={{ width: "50%" }}>
              <Text>{state[ROLE.HIGHSCHOOL_GRADUATE].name}</Text>
            </dd>
          </HStack>
          <HStack w="100%">
            <dl style={{ width: "50%" }}>
              <Text>{t('inquiry.identification.contact-information.id')}</Text>
            </dl>
            <dd style={{ width: "50%" }}>
              <Text>{state[ROLE.HIGHSCHOOL_GRADUATE].idNumber}</Text>
            </dd>
          </HStack>
          <HStack w="100%">
            <dl style={{ width: "50%" }}>
              <Text>{t('inquiry.identification.contact-information.email')}</Text>
            </dl>
            <dd style={{ width: "50%" }}>
              <Text>{ROLE.HIGHSCHOOL_GRADUATE.toLowerCase()}@email.com</Text>
            </dd>
          </HStack>
          <HStack w="100%">
            <dl style={{ width: "50%" }}>
              <Text>{t('inquiry.identification.contact-information.phone')}</Text>
            </dl>
            <dd style={{ width: "50%" }}>
              <Text>(122) 181 292</Text>
            </dd>
          </HStack>
        </Stack>
      </Flex>
    </>
  );
}
