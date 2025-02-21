import apiClient from "../../../../configs/axios.config";
import { BACKEND_ROUTES } from "../../../../shared/backendRoutes";

interface IResponse {
  result: boolean;
  message: string;
  token?: string;
}
const { method, url } = BACKEND_ROUTES.auth.login;
export const loginUser = async (values: any): Promise<IResponse> => {
  let res;
  try {
    res = await apiClient[method](url, values);
    return {
      result: true,
      message: res?.data?.message,
      token: res?.data?.data?.access,
    };
  } catch (error) {
    return { result: false, message: (error as any)?.response?.data?.message };
  }
};
