import { useTranslation } from "react-i18next";
import { Outlet, useParams } from "react-router-dom";
import Breadcrumbs, {
  BreadcrumbPaths,
} from "../../components/breadcrumbs/Breadcrumbs";

export default function HighschoolGraduationCertificateInquiry() {
  const { id } = useParams();
  const { t } = useTranslation();
  const breadcrumbs: BreadcrumbPaths = [
    [t('topics.education.title'), null],
    [t('popular-services.highschool-graduation-certificate'), "/education/highschool-graduation-certificate"],
    [t('inquiry.certificate.title'), `/education/highschool-graduation-certificate/inquiry/`],
    [`#${id}`, `/education/highschool-graduation-certificate/identification/${id}`],
  ];
  return (
    <>
      <Breadcrumbs path={breadcrumbs} />
      <Outlet />
    </>
  );
}
