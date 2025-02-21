import apiClient from "../../../../../configs/axios.config";
import { BACKEND_ROUTES } from "../../../../../shared/backendRoutes";

interface IResponse {
  result: boolean;
  message: string;
}

const { method, url } = BACKEND_ROUTES.hardening.create;
export const createHardening = async (values: any): Promise<IResponse> => {
  let res;
  try {
    res = await apiClient[method](url, {
      ...values,
      categoryId: +values.categoryId,
    } as any);
    return { result: true, message: res?.data?.message };
  } catch (error) {
    return { result: false, message: (error as any)?.response?.data?.message };
  }
};
