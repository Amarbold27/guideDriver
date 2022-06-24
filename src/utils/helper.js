export const moneySuffix = (str) => {
  if (str) return str.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,") + "₮";
  else return 0 + "₮";
};
export const statusName = (status) => {
  switch (status) {
    case "NEW":
      return "Шинэ";
    case "INCOMPLATE":
      return "Дутуу";
    case "CANCELED":
      return "Цуцлагдсан";
    case "TRANSFERRED":
      return "Шилжүүлсэн";
  }
};
export const statusColor = (status) => {
  switch (status) {
    case "NEW":
      return "info";
    case "INCOMPLATE":
      return "warning";
    case "CANCELED":
      return "error";
    case "TRANSFERRED":
      return "success";
  }
};
