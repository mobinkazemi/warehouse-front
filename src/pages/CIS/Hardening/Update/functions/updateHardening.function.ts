import apiClient from "../../../../../configs/axios.config";
import { BACKEND_ROUTES } from "../../../../../shared/backendRoutes";

interface IResponse {
  result: boolean;
  message: string;
}
interface IHardening {
  id: number;
  title: string;
  description: string;
  audit: string;
  command: string;
  recommendations: string;
  regexPattern: string;
  categoryId: number;
}
const { method, url } = BACKEND_ROUTES.hardening.update;
export const updateHardening = async (
  values: IHardening
): Promise<IResponse> => {
  console.log({ values });
  try {
    let res = await apiClient[method](url, values);

    return { result: true, message: res?.data?.message };
  } catch (error) {
    return { result: false, message: (error as any)?.response?.data?.message };
  }
};
