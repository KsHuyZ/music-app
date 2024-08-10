import type { AxiosError, AxiosResponse } from "axios";
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.deezer.com/album/507407161",
});

const onResponseSuccess = (response: AxiosResponse) => {
  return response.data;
};

const onResponseError = async (error: AxiosError) => {
  if (error.response) {
    return Promise.reject(error.response);
  }
  return Promise.reject(error);
};

api.interceptors.response.use(onResponseSuccess, onResponseError);

export default api;
