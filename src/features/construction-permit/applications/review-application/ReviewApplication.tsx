import { Button, Flex, Heading, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Accordion from "../../../../components/accordion/Accordion";
import AccordionItem from "../../../../components/accordion/AccordionItem";
import Breadcrumbs, {
  BreadcrumbPaths,
} from "../../../../components/breadcrumbs/Breadcrumbs";
import ApplicationStatus from "../../../../components/status/ApplicationStatus";
import { RPCContext } from "../../../../rpc/rpc";
import { Application } from "../../../../rpc/types";
import { ROLE } from "../../application/identification/Identification";
import ApplicationAction from "./application-action/ApplicationAction";

export default function ReviewApplication() {
  const { id } = useParams();
  const { t } = useTranslation();
  const rpc = useContext(RPCContext);
  const navigate = useNavigate();
  const [application, setApplication] = useState<Application>();

  useQuery(
    `applications`,
    rpc.getApplications,
    {
      onSuccess: (application) => {
        const currentApplication = application.find((application: Application) => application.id === id);
        setApplication(currentApplication);
      }
    }
  );

  const breadcrumbs: BreadcrumbPaths = [
    [t('topics.housing.title'), null],
    [t('popular-services.construction-permit'), "/housing/construction-permit"],
    [t('button.my-applications'), `/housing/construction-permit/my-applications`],
    [
      `#${id}`,
      `/housing/construction-permit/my-applications/review/${id}`,
    ],
  ];

  function RoleFormData(role: ROLE) {
    switch (role) {
      case ROLE.PROPERTY_OWNER:
        return {
          role: t('application.identification.roles.property-owner.role'),
          description: t('application.identification.roles.property-owner.description'),
          name: t('application.identification.roles.property-owner.name'),
          id: t('application.identification.roles.property-owner.id')
        }
      case ROLE.LEAD_ARCHITECT_OR_ENGINEER:
        return {
          role: t('application.identification.roles.lead-architect-engineer.role'),
          description: t('application.identification.roles.lead-architect-engineer.description'),
          name: t('application.identification.roles.lead-architect-engineer.name'),
          id: t('application.identification.roles.lead-architect-engineer.id')
        }
      case ROLE.PRINCIPAL_CONTRACTOR:
        return {
          role: t('application.identification.roles.principal-contractor.role'),
          description: t('application.identification.roles.principal-contractor.description'),
          name: t('application.identification.roles.principal-contractor.name'),
          id: t('application.identification.roles.principal-contractor.id')
        }
      case ROLE.OTHER:
        return {
          role: t('application.identification.roles.other.role'),
          description: t('application.identification.roles.other.description'),
          name: t('application.identification.roles.other.name'),
          id: t('application.identification.roles.other.id')
        }
      }
    }

  return application && (
    <>
      <Breadcrumbs path={breadcrumbs} />
      <Flex direction="column" gap="20px" mb="20px" flexGrow="1">
        <Heading variant="headline">{t('application.overview.title')}</Heading>
        <Flex alignItems="center" justifyContent="space-between">
          <Text>{t('application.application-number')}{id}</Text>
          {}
          <ApplicationStatus status={application.status} />
        </Flex>
        <ApplicationAction action={application.action} application={application} />
        <Flex direction="column" gap="20px">
          <Text variant="title" size="lg">
            {t('application.application-details')}
          </Text>
          <Accordion>
            <AccordionItem title={t('application.parcel.title')}>
              <>{application.parcelID}</>
            </AccordionItem>

            <AccordionItem title={t('application.identification.title')}>
              <>
                {application.identification.length > 0 && (
                  <>
                    <UnorderedList gap="20px" p="10px">
                      {application.identification.map((role) => (
                        (role.role != ROLE.OTHER && role.data.name != "") && (
                          <>
                            <ListItem key={role.role}>
                              <b>{RoleFormData(role.role)?.role}</b>: <br />
                              {role.data.idNumber} ({role.data.name})
                              <br />
                              <br />
                            </ListItem>
                          </>
                        )
                      ))}
                    </UnorderedList>
                  </>
                )}
              </>
            </AccordionItem>
            <AccordionItem title={t('application.documents.title')}>
              {application.documents.length > 0 && (
                <>
                  <UnorderedList gap="20px" p="10px">
                    {application.documents.map((document) => (
                      <>
                        <ListItem>{document.name}</ListItem>
                      </>
                    ))}
                  </UnorderedList>
                </>
              )}
            </AccordionItem>
          </Accordion>
        </Flex>
        <Button
          colorScheme="admin"
          mt="auto"
          variant="outline"
          onClick={() => navigate(-1)}
        >
          {t('button.back')}
        </Button>
      </Flex>
    </>
  );
}
