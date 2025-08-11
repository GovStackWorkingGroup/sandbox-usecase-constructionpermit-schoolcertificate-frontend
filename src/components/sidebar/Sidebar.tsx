import { ChevronRightIcon, MoonIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Fade,
  Flex,
  Link,
  List,
  ListItem,
  Text
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { colors } from "../../chakra-overrides/colors";
import { useAuthentication } from "../../utilities/useAuthentication";
import Protected from "../protected/Protected";
import Search from "../search/Search";

export default function Sidebar() {
  const { logout } = useAuthentication();
  const { t, i18n } = useTranslation();

  const handleClick = () => {
    alert(t('inactive-page'));
  }


  const topics = [
    {
      url: "/healthcare",
      title: t('topics.healthcare.title'),
      description:
        t('topics.healthcare.description'),
    },
    {
      url: "/housing/construction-permit",
      title: t('topics.housing.title'),
      description:
        t('topics.housing.description'),
    },
    {
      url: "/education/highschool-graduation-certificate",
      title: t('topics.housing.title'),
      description:
        t('topics.housing.description'),
    },
    {
      url: "/benefits-and-social-services",
      title: t('topics.benefits-social-services.title'),
      description:
        t('topics.benefits-social-services.description'),
    },
    {
      url: "/identity-and-family",
      title: t('topics.identity-family.title'),
      description:
        t('topics.identity-family.description'),
    },
    {
      url: "/business-and-labour",
      title: t('topics.business-labor.title'),
      description:
        t('topics.business-labor.description'),
    },
    {
      url: "/travel-and-transformation",
      title: t('topics.travel-transformation.title'),
      description:
        t('topics.travel-transformation.description'),
    },
    {
      url: "/money-and-property",
      title: t('topics.money-property.title'),
      description:
        t('topics.money-property.description'),
    },
    {
      url: "/crime-justice-and-law",
      title: t('topics.crime-justice-law.title'),
      description:
        t('topics.crime-justice-law.description'),
    }
  ];


  const changeLanguage = (lng: any) => {
    i18n.changeLanguage(lng);
  };

  const isActiveLanguage = (language: string) => {
    return i18n.language == language;
  }

  return (
    <Flex
      backgroundColor={colors.secondary[0]}
      zIndex={2}
      position="absolute"
      right="0"
      top="calc(100% + 1px)"
      padding="10px 20px 70px 20px"
      direction="column"
      width="100%"
      height="100vh"
      maxWidth="32rem"
      boxShadow="5px 5px 10px 1px rgba(0,0,0,0.2)"
      overflow="scroll"
    >
      <Fade in={true}>
        <Flex mb="20px" gap="20px">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 8L11 14"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 14L10 8L12 5"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 5H14"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 2H8"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 22L17 12L12 22"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 18H20"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <Text variant="title" size="md" cursor="pointer" onClick={() => changeLanguage("en")} color={isActiveLanguage("en") ? colors.theme.primary : colors.black}>
            {t('en')}
          </Text>
          <Text variant="title" size="md" cursor="pointer" onClick={() => changeLanguage("de")} color={isActiveLanguage("de") ? colors.theme.primary : colors.black}>
            {t('de')}
          </Text>
          <Text variant="title" size="md" cursor="pointer" onClick={() => changeLanguage("fr")} color={isActiveLanguage("fr") ? colors.theme.primary : colors.black}>
            {t('fr')}
          </Text>
          <Text variant="title" size="md" cursor="pointer" onClick={() => changeLanguage("est")} color={isActiveLanguage("est") ? colors.theme.primary : colors.black}>
            {t('est')}
          </Text>
        </Flex>
        <Box mb="20px">
          <Search colorScheme="black" />
        </Box>
        <Flex direction="column" gap="10px">
          <Text variant="title" size="md" color={colors.secondary[900]}>
            {t('sidebar.self-service')}
          </Text>
          <List as="nav" ml="-20px" mr="-20px">
            <ListItem>
              <Link
                display="flex"
                alignItems="center"
                gap="20px"
                padding="10px 20px"
                w="100%"
                as={NavLink}
                to="/"
                _activeLink={{
                  background: colors.secondary[50],
                  color: colors.primary[500],
                }}
              >
                <MoonIcon />
                <Text variant="title" size="md">
                  {t('button.home')}
                </Text>
              </Link>
            </ListItem>
            <ListItem>
              <Link
                display="flex"
                alignItems="center"
                gap="20px"
                padding="10px 20px"
                w="100%"
                onClick={() => handleClick()}
                // as={NavLink}
                // to="/accessibility"
                _activeLink={{
                  background: colors.secondary[50],
                  color: colors.primary[500],
                }}
              >
                <MoonIcon />
                <Text variant="title" size="md">
                  {t('sidebar.accessibility-settings')}
                </Text>
              </Link>
            </ListItem>
            <ListItem>
              <Link
                display="flex"
                alignItems="center"
                gap="20px"
                padding="10px 20px"
                w="100%"
                // as={NavLink}
                // to="/settings"
                onClick={() => handleClick()}
                _activeLink={{
                  background: colors.secondary[50],
                  color: colors.primary[500],
                }}
              >
                <MoonIcon />
                <Text variant="title" size="md">
                  {t('sidebar.settings')}
                </Text>
              </Link>
            </ListItem>
            <ListItem>
              <Link
                display="flex"
                alignItems="center"
                gap="20px"
                padding="10px 20px"
                w="100%"
                // as={NavLink}
                // to="/help"
                onClick={() => handleClick()}
                _activeLink={{
                  background: colors.secondary[50],
                  color: colors.primary[500],
                }}
              >
                <MoonIcon />
                <Text variant="title" size="md">
                  {t('sidebar.help')}
                </Text>
              </Link>
            </ListItem>
            <ListItem>
              <Protected
                authorized={
                  <Link
                    display="flex"
                    alignItems="center"
                    gap="20px"
                    padding="10px 20px"
                    w="100%"
                    onClick={() => logout()}
                  >
                    <MoonIcon />
                    <Text variant="title" size="md">
                      {t('button.logout')}
                    </Text>
                  </Link>
                }
                unauthorized={
                  <Link
                    display="flex"
                    alignItems="center"
                    gap="20px"
                    padding="10px 20px"
                    w="100%"
                    as={NavLink}
                    to="/login"
                    _activeLink={{
                      background: colors.secondary[50],
                      color: colors.primary[500],
                    }}
                  >
                    <MoonIcon />
                    <Text variant="title" size="md">
                      {t('button.login')}
                    </Text>
                  </Link>
                }
              ></Protected>
            </ListItem>
          </List>
        </Flex>
        <Divider w="auto" mr="-20px" ml="-20px" mt="10px" mb="20px" />
        <Flex direction="column" gap="20px">
          <Text variant="title" size="md" color={colors.secondary[900]}>
            {t('topics.title')}
          </Text>
          <List display="flex" flexDir="column">
            {topics.map((topic) => {
              return (
                <ListItem key={topic.title}>
                  <Link
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    padding="10px 20px"
                    _hover={{
                      backgroundColor: colors.secondary[50],
                    }}
                    _activeLink={{
                      background: colors.secondary[50],
                      color: colors.primary[500],
                    }}
                    // as={NavLink}
                    // to={topic.url}
                    onClick={() => handleClick()}
                  >
                    <Text variant="label" size="md">
                      {topic.title}
                    </Text>
                    <ChevronRightIcon />
                  </Link>
                </ListItem>
              );
            })}
          </List>
        </Flex>
      </Fade>
    </Flex>
  );
}
