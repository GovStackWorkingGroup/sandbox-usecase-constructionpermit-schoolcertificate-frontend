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
import InquirieStatus, {
  Status,
} from "../../../../components/status/ApplicationStatus";
import { RPCContext } from "../../../../rpc/rpc";
import { Inquiry } from "../../../../rpc/types";

export default function InquiryList() {
  const { t } = useTranslation();
  const rpc = useContext(RPCContext);

  const { data: data } = useQuery(`inquiries`, rpc.getInquiries);
  const breadcrumbs: BreadcrumbPaths = [
    [t('popular-services.highschool-graduation-certificate'), "/education/highschool-graduation-certificate"],
    [t('button.my-inquiries'), `/education/highschool-graduation-certificate/my-inquiries`],
  ];

  if (data) {
    const completed = (data.length > 0) ? (
      data.filter(
        (inquiry: Inquiry) =>
          inquiry.status === Status.APPROVED ||
          inquiry.status === Status.COMPLETED ||
          inquiry.status === Status.REJECTED,
      )
    ) : [];

    const inProgress = (data.length > 0) ? (
      data.filter(
        (inquiry: Inquiry) =>
          inquiry.status !== Status.APPROVED &&
          inquiry.status !== Status.COMPLETED &&
          inquiry.status !== Status.REJECTED,
      )
    ) : [];
    return (
      <>
        <Breadcrumbs path={breadcrumbs} />
        <Flex direction="column" gap="20px" mb="20px" flexGrow="1">
          <Heading variant="headline">{t('button.my-inquiries')}</Heading>
          <Text>
            {t('inquiries-list.description')}
          </Text>
          <Flex direction="column" gap="10px">
            <Text variant="title" size="lg">
              {t('inquiries-list.ongoing-inquiries')}
            </Text>
            {data.length > 0 ? (
              <Table mr="-20px" ml="-24px">
                <Thead>
                  <Tr>
                    <Th>{t('inquiry.inquiry-id')}</Th>
                    <Th>{t('status.title')}</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {inProgress.map((inquiry: any) => (
                    <Tr key={inquiry.id}>
                      <Td w="50%">
                        <Flex alignItems="center" gap="8px">
                          <ArrowRightIcon
                            color={colors.theme.primary}
                            boxSize="10px"
                          />
                          <Text color={colors.theme.primary} variant="label">
                            <Link
                              as={RouterLink}
                              to={(inquiry.status !== Status.DRAFT) ? (`./review/${inquiry.id}`) : (`../highschool-graduation-certificate/inquiry/${inquiry.id}`)}
                            >
                              {inquiry.id}
                            </Link>
                          </Text>
                        </Flex>
                      </Td>
                      <Td w="50%">
                        <InquirieStatus
                          status={inquiry.status as Status}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            ) : (
              <Text>
                {t('inquiries-list.no-ongoing-inquiries')}
              </Text>
            )}
            <Text size="sm" variant="label" fontWeight="500">
              <Link
                to={`./../inquiry/${Math.floor(Math.random() * (999999 - 100000)) + 100000
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
              {t('inquiries-list.completed-inquiries')}
            </Text>
            {completed.length > 0 ? (
              <Table mr="-20px" ml="-24px">
                <Thead>
                  <Tr>
                    <Th>{t('inquiry.inquiry-id')}</Th>
                    <Th>{t('status.title')}</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {completed.map((inquiry: any) => (
                    <Tr key={inquiry.id}>
                      <Td w="50%">
                        <Flex alignItems="center" gap="8px">
                          <ArrowRightIcon
                            color={colors.theme.primary}
                            boxSize="10px"
                          />
                          <Text color={colors.theme.primary} variant="label">
                            <Link
                              as={RouterLink}
                              to={`./review/${inquiry.id}/approved`}
                            >
                              {inquiry.id}
                            </Link>
                          </Text>
                        </Flex>
                      </Td>
                      <Td w="50%">
                        <InquirieStatus status={inquiry.status} />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            ) : (
              <Text>
                {t('inquiries-list.no-completed-inquiries')}
              </Text>
            )}
          </Flex>
          <Button mt="auto" variant="outline" colorScheme="admin" as={RouterLink} to="../highschool-graduation-certificate">
            {t('button.back')}
          </Button>
        </Flex>
      </>
    );
  }
}
