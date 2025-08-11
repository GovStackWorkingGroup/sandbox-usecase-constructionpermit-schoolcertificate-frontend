import { Button, Flex, Heading, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs, {
  BreadcrumbPaths,
} from "../../../../components/breadcrumbs/Breadcrumbs";
import InquiryStatus from "../../../../components/status/ApplicationStatus";
import { RPCContext } from "../../../../rpc/rpc";
import { Inquiry } from "../../../../rpc/types";
import { ROLE } from "../../../../rpc/types"; // Ensure this import matches your project structure
import InquiryAction from "./inquiry-action/InquiryAction";


export default function ReviewInquiry() {
  const { id } = useParams();
  const { t } = useTranslation();
  const rpc = useContext(RPCContext);
  const navigate = useNavigate();
  const inquiry = JSON.parse(localStorage.getItem('inquiry') || '{}');

  const { isLoading, error } = useQuery(
    "inquiries",
    async () => {
      // Simulate a network delay for realism
      return [inquiry];
    }
  );


  const breadcrumbs: BreadcrumbPaths = [
    [t('topics.education.title'), null],
    [t('education.highschool-graduation-certificate'), "/education/highschool-graduation-certificate"],
    [t('inquiry.review.title'), `/education/highschool-graduation-certificate/inquiries/`],
    [
      `${inquiry.id}`,
      `/education/highschool-graduation-certificate/inquiries/review/${id}`,
    ],
  ];

  function RoleFormData(role: ROLE) {
    switch (role) {
      case ROLE.HIGHSCHOOL_GRADUATE:
        return {
          role: t('inquiry.identification.roles.highschool-graduate.role'),
          description: t('inquiry.identification.roles.highschool-graduate.description'),
          name: t('inquiry.identification.roles.highschool-graduate.name'),
          id: t('inquiry.identification.roles.highschool-graduate.id')
        }
    }
  }

  // const inquiry = inquiries?.find((inquiry: Inquiry) => String(inquiry.id).trim() === String(id).trim());

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text color="red.500">Failed to load inquiries.</Text>;
  if (!inquiry) {
    return (
      <Flex direction="column" align="center" mt="40">
        <Heading size="md" mb="2">Inquiry not found</Heading>
        <Text color="gray.600">The inquiry ID <b>{id}</b> could not be found.</Text>
        <Button mt="4" onClick={() => navigate(-1)}>{t('button.back')}</Button>
      </Flex>
    );
  }
  return inquiry && (
    <>
      <Flex direction="column" gap="20px" mb="20px" flexGrow="1">
        <InquiryAction applicationId={inquiry.id} />
      </Flex>
    </>
  );
}
