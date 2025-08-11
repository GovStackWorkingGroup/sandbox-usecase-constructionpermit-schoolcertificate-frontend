import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RPCContext } from "../rpc/rpc";
import { getToken } from "./token";

export const useAuthentication = () => {
  const rpc = useContext(RPCContext);
  const navigate = useNavigate();

  const login = async (username: string, password: string, redirect?: string | null) => {
    try {
      const token = await rpc.getToken(username.toLowerCase(), password);
      if (token) {
        sessionStorage.setItem("token", token);
        navigate(redirect?`../${redirect}`:"/");
      }
    } catch (e) {
      window.location.reload();
    }
  };

  const logout = () => {
    rpc.invalidateSession().then(() => {
      sessionStorage.removeItem("token");
      window.location.reload();
    });
  };

  const isAuthenticated = () => {
    return !!getToken();
  };

  return { login, isAuthenticated, logout } as const;
};
