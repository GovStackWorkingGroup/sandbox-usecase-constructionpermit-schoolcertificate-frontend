import { Outlet, useParams } from "react-router-dom";

export default function Inquiries() {
  const { id } = useParams();

  return (
    <>
      <Outlet />
    </>
  );
}