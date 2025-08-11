import { Outlet, useParams } from "react-router-dom";

export default function Applications() {
  const { id } = useParams();

  return (
    <>
      <Outlet />
    </>
  );
}
