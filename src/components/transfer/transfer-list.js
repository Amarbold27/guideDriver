import { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { TransferCard } from "./transfer-card";
import { useBill } from "src/context/BillContext";

export const TransferList = () => {
  const { promotions, getPromotions, query } = useBill();
  useEffect(() => {
    query && getPromotions(query);
  }, [query]);

  return (
    <PerfectScrollbar>
      {promotions &&
        promotions.data?.length > 0 &&
        promotions.data.map((el) => <TransferCard data={el} />)}
    </PerfectScrollbar>
  );
};

// Tra.propTypes = {
//   customers: PropTypes.array.isRequired,
// };
