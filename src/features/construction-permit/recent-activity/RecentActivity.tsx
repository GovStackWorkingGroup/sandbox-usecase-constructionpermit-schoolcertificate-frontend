import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Flex, Heading, Link, List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { Link as RouterLink } from "react-router-dom";
import { colors } from "../../../chakra-overrides/colors";
import { RPCContext } from "../../../rpc/rpc";


export default function RecentActivity() {
  const { t } = useTranslation();
  const rpc = useContext(RPCContext);
  const {data: recentActivity, isFetching } = useQuery(`recent-activity`, rpc.getRecentActivity);
  return (
    <Flex direction="column" gap="10px" padding="10px 0">
      <Heading variant="headline">{t('recent-activity.title')}</Heading>
      {(recentActivity?(
        recentActivity.length != 0?(
          <List color={colors.theme.primary}>
            {recentActivity
              .toReversed()
              .map((activity, index) => (
                <ListItem key={index} display="flex" alignItems={"center"}>
                  <ListIcon as={ArrowForwardIcon} />
                  <Link as={RouterLink} to={activity.path || "/"}>
                    <Text>{activity.name}</Text>
                  </Link>
                </ListItem>
              ))
            }
          </List>
        ):(t('recent-activity.no-activity'))
      ):(
        isFetching && (t('recent-activity.fetch-error'))
      ))}
    </Flex>
  );
}
