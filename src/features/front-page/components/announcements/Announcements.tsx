import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  Link,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { colors } from "../../../../chakra-overrides/colors";

export default function Announcements() {
  const { t } = useTranslation();

  const announcements = [
    {
      title: t('announcements.ann1'),
      date: "15.05.2023",
    },
    {
      title: t('announcements.ann2'),
      date: "11.05.2023",
    },
    {
      title: t('announcements.ann3'),
      date: "05.05.2023",
    },
    {
      title: t('announcements.ann4'),
      date: "02.05.2023",
    },
    {
      title: t('announcements.ann5'),
      date: "26.04.2023",
    },
  ];

  return (
    <Flex padding="10px 0" gap="10px" direction="column">
      <Heading variant="headline">{t('announcements.title')}</Heading>
      <List
        color={colors.theme.dark}
        display="flex"
        flexDirection="column"
        gap="10px"
      >
        {announcements.map((announcement) => (
          <ListItem key={announcement.title} display="flex" alignItems="center">
            <ListIcon as={ArrowForwardIcon} />
            <Link>
              <Box>
                <Text variant="label" size="md">
                  {announcement.title}
                </Text>
                <Text size="xs">{announcement.date}</Text>
              </Box>
            </Link>
          </ListItem>
        ))}
      </List>
      <Link textDecor="underline">
        <Text size="xxs">{t('announcements.previous')}</Text>
      </Link>
    </Flex>
  );
}
