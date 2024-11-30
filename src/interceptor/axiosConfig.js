// axiosConfig.js
import axios from "axios";

export const setupAxiosInterceptors = (setIsLoading) => {
  // Request Interceptor
  axios.interceptors.request.use(
    (config) => {
      setIsLoading(true); // Show spinner
      return config;
    },
    (error) => {
      setIsLoading(false); // Hide spinner on error
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  axios.interceptors.response.use(
    (response) => {
      setIsLoading(false); // Hide spinner on success
      return response;
    },
    (error) => {
      setIsLoading(false); // Hide spinner on error
      return Promise.reject(error);
    }
  );
};
