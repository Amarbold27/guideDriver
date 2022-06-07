import { createContext, useContext, useState } from "react";
import { apiGet, apiPost } from "src/service/baseApi";

const ContractContext = createContext();

export function ContractProvider({ children }) {
  const [contractList, setContractList] = useState([]);
  const [query, setQuery] = useState();
  const getContractList = (query) => {
    apiGet(`/partnerOrgs${query}`).then((res) => {
      setContractList(res.data);
    });
  };
  const createContract = (data) => {
    apiPost(`/partnerOrgs/create`, data).then((res) => {
      getContractList(query);
    });
  };
  const deleteContract = (id) => {
    apiPost(`/partnerOrgs/delete/${id}`).then((res) => {
      setContractList({ ...contractList, data: contractList.data.filter((o) => o.id !== id) });
    });
  };
  const updateContract = (id, data) => {
    apiPost(`/partnerOrgs/update/${id}`, data).then((res) => {
      getContractList(query);
      // setContractList({ ...contractList });
    });
  };
  const value = {
    getContractList,
    contractList,
    setContractList,
    createContract,
    query,
    setQuery,
    deleteContract,
    updateContract,
  };
  return <ContractContext.Provider value={value}>{children}</ContractContext.Provider>;
}

export function useContract() {
  return useContext(ContractContext);
}
