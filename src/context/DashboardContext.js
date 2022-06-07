import { createContext, useContext, useState } from "react";
import { apiGet } from "src/service/baseApi";

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [userData, setUserData] = useState();
  const getUserData = () => {
    apiGet(`/utils/dashboard`).then((res) => {
      setUserData(res.data.data);
    });
  };
  const value = {
    getUserData,
    userData,
  };
  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
  return useContext(DashboardContext);
}
