import { createContext, useContext, useState } from "react";
import { apiGet, apiPost } from "src/service/baseApi";

const BillContext = createContext();

export function BillProvider({ children }) {
  const [promotions, setPromotions] = useState();
  const [query, setQuery] = useState("");
  const [billDetail, setBillDetail] = useState([]);
  const getPromotions = () => {
    setPromotions({});
    apiGet(`/promotions${query}`).then((res) => {
      setPromotions(res.data);
    });
  };
  const saveTransfers = (id, data) => {
    apiPost(`/transfers/update/${id}`, data).then((res) => {
      getPromotions();
    });
  };
  const getBillDetail = (id) => {
    setBillDetail([]);
    apiGet(`/bills/${id}`).then((res) => {
      setBillDetail(res.data.data);
    });
  };

  const value = {
    getPromotions,
    promotions,
    setQuery,
    query,
    saveTransfers,
    getBillDetail,
    billDetail,
  };
  return <BillContext.Provider value={value}>{children}</BillContext.Provider>;
}

export function useBill() {
  return useContext(BillContext);
}
