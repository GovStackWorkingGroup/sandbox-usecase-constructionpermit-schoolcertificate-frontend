import { createContext } from "react";
import { Outlet } from "react-router-dom";

export const InquiryContext = createContext({});

export default function Inquiry() {
  return (
    <InquiryContext.Provider value={{}}>
      <Outlet />
    </InquiryContext.Provider>
  );
}
