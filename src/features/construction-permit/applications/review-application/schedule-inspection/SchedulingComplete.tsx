import { PlusSquareIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Text
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";

interface scheduleProps {
  date: string;
  slot: number
}

export default function SchedulingComplete(
  {
    date,
    slot
  }:scheduleProps
  ) {
    const { t } = useTranslation();
  return (
    <>
      <Flex direction="column" gap="20px" mb="20px" flexGrow="1">
        <Heading size="md" variant="title">
          {t('application.inspection.schedule.title')}
        </Heading>
        <Text>
          {t('application.inspection.schedule.appointment-details')}
        </Text>
        <Box>
          <Text>
            {t('actions.inspection.upcoming.slot.date')}: <strong>{new Date(date).toLocaleString("en", { day: "2-digit"}) + "/" + (new Date(date).getMonth()+1) + "/" + new Date(date).getFullYear()}</strong>
          </Text>
          <Text>
            {t('actions.inspection.upcoming.slot.time')}: <strong>{slot == 1?"9:00 - 12:00":"13:00 - 16:00"}</strong>
          </Text>
        </Box>
        <Button
          width="min-content"
          colorScheme="admin"
          variant="ghost"
          leftIcon={<PlusSquareIcon />}
        >
          {t('button.add-to-calendar')}
        </Button>
        <Text>
          {t('application.inspection.schedule.description')}
        </Text>
        <Flex mt="auto" direction={{base: "column", md: "row"}}>
          <Grid
            gap="10px"
            w="100%"
            gridAutoColumns={{base:"100%", md: "50%"}}
            templateAreas={{
              base: `"a" "b"`,
              md: `"b a"`
            }}>
            <Button gridArea="a" colorScheme="admin" as={RouterLink} to="/">
              {t('button.home')}
            </Button>
            <Button
            gridArea="b"
              as={RouterLink}
              to="/housing/construction-permit/my-applications"
              colorScheme="admin"
              variant="outline"
            >
              {t('button.my-applications')}
            </Button>
          </Grid>
        </Flex>
      </Flex>
    </>
  );
}
