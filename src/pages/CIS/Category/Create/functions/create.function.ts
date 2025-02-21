import apiClient from "../../../../../configs/axios.config";
import { BACKEND_ROUTES } from "../../../../../shared/backendRoutes";

interface IResponse {
  result: boolean;
  message: string;
}

const { method, url } = BACKEND_ROUTES.category.create;
export const createCategory = async (values: any): Promise<IResponse> => {
  let res;
  try {
    res = await apiClient[method](url, {
      name: values.name,
      cisId: values.cisId,
      parentId: values.parentId,
    } as any);
    return { result: true, message: res?.data?.message };
  } catch (error) {
    return { result: false, message: (error as any)?.response?.data?.message };
  }
};
