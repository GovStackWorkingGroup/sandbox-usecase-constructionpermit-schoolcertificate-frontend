import { createContext } from "react";
import { Outlet } from "react-router-dom";

export const ApplicationContext = createContext({});

export default function Application() {
  return (
    <ApplicationContext.Provider value={{}}>
      <Outlet />
    </ApplicationContext.Provider>
  );
}
