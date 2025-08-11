import { jwtDecode } from "jwt-decode";

export interface Token {}

export const getToken = () => {
  const token = sessionStorage.getItem("token");
  if (token) {
      try {
        jwtDecode(token);
        return token;
    } catch {
      sessionStorage.removeItem("token");
      return null;
    }
  }
  return null;
};
