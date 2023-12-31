import { stringify } from "querystring";
import axios from "axios";

const defaultOptions = {
  headers: {},
  queryParams: null,
};

export const restClient = axios.create();

restClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const err = error.response;
    if (err.status === 401) {
      window.history.go("/login");
    }
    return Promise.reject(error);
  }
);

const HttpClient = async (
  url = "",
  options = defaultOptions,
  noBaseUrl,
  allowRaw
) => {
  const baseUrl = "https://reqres.in/api";
  let fullPath = noBaseUrl ? `${url}` : `${baseUrl}${url}`;

  if (options.queryParams) {
    const queryString = stringify(options.queryParams);
    fullPath = `${fullPath}?${queryString}`;
    console.log({ fullPath });
  }

  return await restClient({
    url: fullPath,
    method: options.method || "GET",
    data: options.data,
  })
    .then((response) => {
      console.log({ response });
      return {
        data: response?.data || {},
        errors: response?.error || response?.data.message,
        message: response?.data.message,
        success:
          (response?.status === 200 || response?.status === 201) &&
          response?.data?.status,
        ...(allowRaw && { raw_response: response }),
      };
    })
    .catch((err) => {
      console.log("err:", err);
      return {
        data: err,
        errors: err?.response?.data?.error,
        success: false, // mock status
        errorData: err?.response?.data,
        message: err?.message || err?.response?.data?.message,
        ...(allowRaw && { raw_error: err }),
      };
    });
};

export default HttpClient;
