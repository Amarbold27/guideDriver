import { toastify } from "../components/Toastify/Toastify";
const handleError = (error) => {
  if (error.response) {
    const { status } = error?.response;
    const errorMessage = error?.response?.data?.message;
    console.log(error?.response);
    switch (status) {
      case 302:
        toastify("ERROR", errorMessage);
        break;
      case 401:
        localStorage.clear();
        toastify("ERROR", errorMessage);
        // return (window.location.href = "/login");
        break;
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
