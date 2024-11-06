import axios from "axios";
import { setTokens, clearTokens } from "../features/auth/tokenSlice";
import { logout } from "../features/auth/loginSlice";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const axiosAuth = axios.create({
  baseURL: BASE_URL,
});

export const createAuthInterceptor = (instance, store) => {
  instance.interceptors.request.use((config) => {
    const { accessToken } = store.getState().tokens;
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const { refreshToken } = store.getState().tokens;

      if (
        error.response &&
        ( error.response.status === 401 ||
          // error.response.status === 403 ||
          error.response.status === 409 ) &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        try {
          const refreshResponse = await axios.post(
            `${BASE_URL}/api/client/token/refresh/`,
            {
              refresh: refreshToken,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const { access, refresh } = refreshResponse.data;

          store.dispatch(clearTokens());

          store.dispatch(
            setTokens({
              accessToken: access,
              refreshToken: refresh,
            })
          );

          originalRequest.headers.Authorization = `Bearer ${access}`;

          return instance(originalRequest);
        } catch (refreshError) {
          store.dispatch(clearTokens());
          store.dispatch(logout());

          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};
