import { useEffect } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";

const NOTIFY_ON_REQUEST = ["post", "patch", "delete"];
let prvErrMsg = "";
const APIResponseHandler = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const showError = (message) => {
    if (prvErrMsg === message) return;
    prvErrMsg = message;
    enqueueSnackbar(message, {
      variant: "error",
    });
  };
  useEffect(() => {
    axios.interceptors.request.use((req) => {
      prvErrMsg = "";
      return req;
    });
    axios.interceptors.response.use(
      (response) => {
        if (NOTIFY_ON_REQUEST.includes(response.config.method)) {
          if (response.data.message || response.data.status) {
            enqueueSnackbar(response.data.message || response.data.status, {
              variant: "success",
            });
          }
        }
        return response;
      },
      (error) => {
        if (NOTIFY_ON_REQUEST.includes(error.response.config.method)) {
          if (error.response.data.fields?.length) {
            error.response.data.fields.forEach((field) => {
              showError(field.message);
            });
            return Promise.reject(error);
          }
          if (error.response.data.message) {
            showError(error.response.data.message);
            return Promise.reject(error);
          }
          showError("Something went wrong");
        }
        return Promise.reject(error);
      }
    );
    // eslint-disable-next-line
  }, []);

  return null;
};

export default APIResponseHandler;
