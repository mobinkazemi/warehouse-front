import axios from "axios";
import { v4 } from "uuid";
import { TOKEN_KEY_ENUM } from "../shared/enums/token.enum";
import { ROUTES_ENUM } from "../shared/enums/routes.enum";

const apiClient = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
    clientId: v4(),
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY_ENUM.ACCESS);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem(TOKEN_KEY_ENUM.ACCESS);
      window.location.href = ROUTES_ENUM.HOME;
    }

    return Promise.reject(error);
  }
);
export default apiClient;
