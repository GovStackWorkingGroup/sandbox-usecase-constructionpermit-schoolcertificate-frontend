import { useTranslation } from "react-i18next";
import { Outlet, useParams } from "react-router-dom";
import Breadcrumbs, {
  BreadcrumbPaths,
} from "../../components/breadcrumbs/Breadcrumbs";

export default function ConstructionPermitApplication() {
  const { id } = useParams();
  const { t } = useTranslation();
  const breadcrumbs: BreadcrumbPaths = [
    [t('topics.housing.title'), null],
    [t('popular-services.construction-permit'), "/housing/construction-permit"],
    [
      `#${id}`,
      `/housing/construction-permit/application/${id}`,
    ],
  ];
  return (
    <>
      <Breadcrumbs path={breadcrumbs} />
      <Outlet />
    </>
  );
}
