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

export default function PopularServices() {
  const { t } = useTranslation();

  const popularServices: [string, string | null][] = [
    [t("popular-services.construction-permit"), "/housing/construction-permit"],
    [
      t("popular-services.highschool-graduation-certificate"),
      "/education/highschool-graduation-certificate",
    ],
    [t("popular-services.visa-application"), null],
    [t("popular-services.social-welfare"), null],
    [t("popular-services.residence-registration"), null],
    [t("popular-services.income-tax-returns"), null],
  ];

  const highlightedPaths = [
    "/housing/construction-permit",
    "/education/highschool-graduation-certificate",
  ];

  return (
    <Flex direction="column" gap="10px" padding="10px 0">
      <Heading variant="headline">{t("popular-services.title")}</Heading>
      <List>
        {popularServices.map(([name, pathname]) => {
          const isLink = pathname && highlightedPaths.includes(pathname);
          return (
            <ListItem key={name} display="flex" alignItems="center">
              <ListIcon as={ArrowForwardIcon} />
              {isLink ? (
                <Link
                  as={RouterLink}
                  to={pathname}
                  fontWeight="bold"
                  color="blue.500"
                >
                  {name}
                </Link>
              ) : (
                <Text color="black">{name}</Text>
              )}
            </ListItem>
          );
        })}
      </List>
    </Flex>
  );
}
