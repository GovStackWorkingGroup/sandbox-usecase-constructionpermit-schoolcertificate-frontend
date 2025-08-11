import { getToken } from "../../utilities/token";

//this is whatever

export default function Protected({
  authorized,
  unauthorized,
}: {
  authorized?: JSX.Element | JSX.Element[];
  unauthorized?: JSX.Element | JSX.Element[];
}): JSX.Element | null {
  return getToken() ? <>{authorized}</> : <>{unauthorized}</>;
}
