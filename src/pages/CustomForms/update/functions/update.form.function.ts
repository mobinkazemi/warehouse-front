import apiClient from "../../../../configs/axios.config";
import { BACKEND_ROUTES } from "../../../../shared/backendRoutes";

interface IResponse {
  result: boolean;
  message: string;
}
const { method, url } = BACKEND_ROUTES.form.update;
export const updateForm = async (values: any): Promise<IResponse> => {
  // let res;
  try {
    let res = await apiClient[method](
      url.replace(":id", String(values.id)),
      values
    );

    return {
      result: true,
      message: res?.data?.message,
    };
  } catch (error) {
    return { result: false, message: (error as any)?.response?.data?.message };
  }
};

export const updateProject = async (values: any): Promise<IResponse> => {
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
