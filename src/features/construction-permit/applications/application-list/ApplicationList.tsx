import { ArrowRightIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Heading,
  Link,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { Link as RouterLink } from "react-router-dom";
import { colors } from "../../../../chakra-overrides/colors";
import Breadcrumbs, {
  BreadcrumbPaths,
} from "../../../../components/breadcrumbs/Breadcrumbs";
import ApplicationStatus, {
  Status,
} from "../../../../components/status/ApplicationStatus";
import { RPCContext } from "../../../../rpc/rpc";
import { Application } from "../../../../rpc/types";

export default function ApplicationList() {
  const { t } = useTranslation();
  const rpc = useContext(RPCContext);

  const { data: data } = useQuery(`applications`, rpc.getApplications);
  const breadcrumbs: BreadcrumbPaths = [
    [t('popular-services.construction-permit'), "/housing/construction-permit"],
    [t('button.my-applications'), `/housing/construction-permit/my-applications`],
  ];

  if (data) {
    const completed = (data.length > 0)?(
      data.filter(
        (application: Application) =>
          application.status === Status.APPROVED ||
          application.status === Status.COMPLETED ||
          application.status === Status.REJECTED,
      )
    ):[];

    const inProgress = (data.length > 0)?(
      data.filter(
        (application: Application) =>
          application.status !== Status.APPROVED &&
          application.status !== Status.COMPLETED &&
          application.status !== Status.REJECTED,
      )
    ):[];
    return (
      <>
        <Breadcrumbs path={breadcrumbs} />
        <Flex direction="column" gap="20px" mb="20px" flexGrow="1">
          <Heading variant="headline">{t('button.my-applications')}</Heading>
          <Text>
           {t('applications-list.description')}
          </Text>
          <Flex direction="column" gap="10px">
            <Text variant="title" size="lg">
            {t('applications-list.ongoing-applications')}
            </Text>
            {data.length > 0?(
              <Table mr="-20px" ml="-24px">
                <Thead>
                  <Tr>
                    <Th>{t('application.application-id')}</Th>
                    <Th>{t('status.title')}</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {inProgress.map((application: any) => (
                    <Tr key={application.id}>
                      <Td w="50%">
                        <Flex alignItems="center" gap="8px">
                          <ArrowRightIcon
                            color={colors.theme.primary}
                            boxSize="10px"
                          />
                          <Text color={colors.theme.primary} variant="label">
                            <Link
                              as={RouterLink}
                              to={(application.status !== Status.DRAFT)?(`./review/${application.id}`):(`../construction-permit/application/${application.id}`)}
                            >
                              {application.id}
                            </Link>
                          </Text>
                        </Flex>
                      </Td>
                      <Td w="50%">
                        <ApplicationStatus
                          status={application.status as Status}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            ):(
            <Text>
              {t('applications-list.no-ongoing-applications')}
            </Text>
            )}
            <Text size="sm" variant="label" fontWeight="500">
              <Link
                to={`./../application/${
                  Math.floor(Math.random() * (999999 - 100000)) + 100000
                }`}
                as={RouterLink}
                color={colors.theme.primary}
                textDecoration="underline"
              >
                {t('button.create-new')}
              </Link>
            </Text>
          </Flex>
          <Flex direction="column" gap="10px">
            <Text variant="title" size="lg">
            {t('applications-list.completed-applications')}
            </Text>
            {completed.length > 0?(
            <Table mr="-20px" ml="-24px">
              <Thead>
                <Tr>
                  <Th>{t('application.application-id')}</Th>
                  <Th>{t('status.title')}</Th>
                </Tr>
              </Thead>
              <Tbody>
                {completed.map((application: any) => (
                  <Tr key={application.id}>
                    <Td w="50%">
                      <Flex alignItems="center" gap="8px">
                        <ArrowRightIcon
                          color={colors.theme.primary}
                          boxSize="10px"
                        />
                        <Text color={colors.theme.primary} variant="label">
                          <Link
                            as={RouterLink}
                            to={`./review/${application.id}/approved`}
                          >
                            {application.id}
                          </Link>
                        </Text>
                      </Flex>
                    </Td>
                    <Td w="50%">
                      <ApplicationStatus status={application.status} />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            ):(
              <Text>
                {t('applications-list.no-completed-applications')}
              </Text>
            )}
          </Flex>
          <Button mt="auto" variant="outline" colorScheme="admin" as={RouterLink} to="../construction-permit">
            {t('button.back')}
          </Button>
        </Flex>
      </>
    );
  }
}
