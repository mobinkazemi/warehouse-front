import apiClient from "../../../../configs/axios.config";
import { BACKEND_ROUTES } from "../../../../shared/backendRoutes";

interface IResponse {
  result: boolean;
  message: string;
}
const { method, url } = BACKEND_ROUTES.product.update;
export const updateProduct = async (values: any): Promise<IResponse> => {
  try {
    let res = await apiClient[method](
      url.replace(":id", String(values.id)),
      values
    );

    return { result: true, message: res?.data?.message };
  } catch (error) {
    return { result: false, message: (error as any)?.response?.data?.message };
  }
};
