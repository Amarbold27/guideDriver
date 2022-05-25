import { toastify } from "../components/Toastify/Toastify";
const handleError = (error) => {
  if (error.response) {
    const { status } = error?.response;
    const errorMessage = error?.response?.data?.message;

    switch (status) {
      case 302:
        toastify("ERROR", errorMessage);
        break;
      case 401:
        toastify("ERROR", errorMessage);
        return (window.location.href = "/");
      case 403:
        toastify("ERROR", errorMessage);
        break;
      case 404:
        toastify("ERROR", errorMessage);
        break;
      default:
        toastify("ERROR", errorMessage);
    }
  }
  return error;
};

export default handleError;
