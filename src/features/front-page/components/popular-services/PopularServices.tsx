import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  Link,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { colors } from "../../../../chakra-overrides/colors";

export default function PopularServices() {
  const { t } = useTranslation();

  const popularServices = [
    [t('popular-services.construction-permit'), "/housing/construction-permit"],
    [t('popular-services.highschool-graduation-certificate'), "/education/highschool-graduation-certificate"],
    [t('popular-services.visa-application'), null],
    [t('popular-services.social-welfare'), null],
    [t('popular-services.residence-registration'), null],
    [t('popular-services.income-tax-returns'), null],
  ];

  return (
    <Flex direction="column" gap="10px" padding="10px 0">
      <Heading variant="headline">{t('popular-services.title')}</Heading>
      <List color={colors.theme.primary}>
        {popularServices.map(([name, pathname]) => (
          <ListItem key={name} display="flex" alignItems={"center"}>
            <ListIcon as={ArrowForwardIcon} />
            <Link as={RouterLink} to={pathname || "/"}>
              <Text>{name}</Text>
            </Link>
          </ListItem>
        ))}
      </List>
    </Flex>
  );
}
