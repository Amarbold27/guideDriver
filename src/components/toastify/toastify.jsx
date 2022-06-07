import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const toastify = (type, message, time) => {
  const options = {
    autoClose: time ? time : 5000,
    hideProgressBar: false,
    position: toast.POSITION.TOP_CENTER,
    pauseOnHover: true,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
  };
  if (type === "SUCCESS") toast.success(`${message}`, options);
  else if (type === "ERROR") toast.error(`${message}`, options);
  else if (type === "WARNING") toast.warning(`${message}`, options);
  else if (type === "INFO") toast.info(`${message}`, options);
};
