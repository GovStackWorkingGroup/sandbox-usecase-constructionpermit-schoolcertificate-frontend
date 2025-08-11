import { Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Outlet, useParams } from "react-router-dom";
import Breadcrumbs, {
  BreadcrumbPaths,
} from "../../../../../components/breadcrumbs/Breadcrumbs";

export default function Payment() {
  const { id } = useParams();
  const { t } = useTranslation();
  const breadcrumbs: BreadcrumbPaths = [
    [t('topics.housing.title'), null],
    [t('popular-services.construction-permit'), "/housing/construction-permit"],
    [t('button.my-applications'), `/housing/construction-permit/my-applications`],
    [
      `#${id}`,
      `/housing/construction-permit/my-applications/review/${id}`,
    ],
  ];

  return (
    <>
      <Breadcrumbs path={breadcrumbs} />
      <Flex direction="column" gap="20px" mb="20px" flexGrow="1">
        <Outlet />
      </Flex>
    </>
  );
}
