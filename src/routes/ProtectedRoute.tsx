import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../utilities/token";

interface RouteProps extends PropsWithChildren {
  guard: () => boolean;
  redirect?: string;
}

export const isAuthenticatedGuard = () => {
  return !!getToken();
};

export function ProtectedRoute({ guard, children, redirect }: RouteProps) {
  if (guard()) {
    return <>{children}</>;
  }
  if (redirect) {
    return (
      <>
        <Navigate to={redirect} />
      </>
    );
  }
  return <>No permissions!</>;
}
