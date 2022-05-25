import { useContext } from "react";
import axios from "axios";
import { API_URL } from "./config";
import handleError from "./errorHandler";
import { toastify } from "src/components/toastify/Toastify";
import { useLoading } from "src/context/LoadingContext";

// axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
// const { loading, setLoading } = useLoading();
export const apiGet = async (url, config) => {
  const disableLoader = config?.disableLoader;
  const disableToast = config?.disableToast;
  return new Promise((resolve, reject) => {
    // !disableLoader && setLoading(true);
    api
      .get(url)
      .then((response) => {
        // setLoading(false);
        switch (response.data.code) {
          case 200:
            resolve(response);
            break;
          case 201:
            reject(response);
            disableToast ? reject() : reject(toastify("WARNING", response?.data.message));
            break;
          case 203:
            disableToast ? reject() : reject(toastify("WARNING", response?.data.message));
            break;
          default:
            break;
        }
      })
      .catch((error) => {
        // !disableLoader && setLoading(false);
        reject(handleError(error));
      });
  });
};
export const apiPost = async (url, data, config) => {
  //   api.defaults.withCredentials = true;
  const disableLoader = config?.disableLoader;
  const disableToast = config?.disableToast;
  return new Promise((resolve, reject) => {
    // !disableLoader && setLoading(true);
    api
      .post(url, data)
      .then((response) => {
        // !disableLoader && setLoading(false);
        switch (response.data.code) {
          case 200:
            !disableToast && toastify("SUCCESS", response?.data.message);
            resolve(response);
            break;
          case 201:
            disableToast ? reject() : reject(toastify("WARNING", response?.data.message));
            break;
          case 203:
            disableToast ? reject() : reject(toastify("WARNING", response?.data.message));
            break;

          default:
            break;
        }
      })
      .catch((error) => {
        // !disableLoader && setLoading(false);
        reject(handleError(error));
      });
  });
};
