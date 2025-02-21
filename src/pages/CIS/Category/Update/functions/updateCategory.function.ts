import apiClient from "../../../../../configs/axios.config";
import { BACKEND_ROUTES } from "../../../../../shared/backendRoutes";

interface IResponse {
  result: boolean;
  message: string;
}
interface ICIS {
  id: number;
  name: string;
  version: string;
}
const { method, url } = BACKEND_ROUTES.category.update;
export const updateCategory = async (values: ICIS): Promise<IResponse> => {
  try {
    let res = await apiClient[method](url, values);

    return { result: true, message: res?.data?.message };
  } catch (error) {
    return { result: false, message: (error as any)?.response?.data?.message };
  }
};
