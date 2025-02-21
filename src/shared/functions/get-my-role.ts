import apiClient from "../../configs/axios.config";
import { BACKEND_ROUTES } from "../backendRoutes";

interface IResponse {
  role: string;
}
const { method, url } = BACKEND_ROUTES.user.myself;
export const getMyRole = async (): Promise<IResponse> => {
  let res;
  try {
    res = await apiClient[method](url);
    return { role: res.data.data.roles[0]?.name || "نامشخص" };
  } catch (error) {
    return { role: "نامشخص" };
  }
};
