import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { colors } from "../../../../chakra-overrides/colors";
import { useTranslation } from "react-i18next";

export default function Topics() {
  const { t } = useTranslation();
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
      title: t('topics.education.title'),
      description:
        t('topics.education.description'),
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
  const handleClick = () => {
    alert(t('inactive-page'));
  }

  return (
    <Flex direction="column" padding="10px 0" marginRight="20px" gap="20px">
      <Heading variant="headline">{t('topics.title')}</Heading>
      {topics.map((topic) => (
        <Link
          key={topic.title}
          borderLeft={`2px solid ${colors.secondary[800]} `}
          _hover={{
            textDecoration: "none",
            borderColor: colors.theme.primary,
            backgroundColor: colors.secondary[50],
          }}
          padding="8px 10px"
          display="flex"
          alignItems="center"
          gap="8px"
          justifyContent={"space-between"}
          onClick={() => handleClick()}
        // as={RouterLink}
        // to={topic.url}
        >
          <Flex>
            <Box>
              <Text variant="title" size="md">
                {topic.title}
              </Text>
              <Text variant="body" size="xs">
                {topic.description}
              </Text>
            </Box>
          </Flex>
          <ChevronRightIcon w="24px" h="24px" />
        </Link>
      ))}
    </Flex>
  );
}
