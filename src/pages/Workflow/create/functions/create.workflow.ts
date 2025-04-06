import { AxiosResponse } from "axios";
import apiClient from "../../../../configs/axios.config";
import { BACKEND_ROUTES } from "../../../../shared/backendRoutes";

interface IResponse {
  result: boolean;
  message: string;
  data?: AxiosResponse;
}
const { method, url } = BACKEND_ROUTES.workflow.create; 
export const createWorkflow = async (values: any): Promise<IResponse> => {
  let res;
  try {
    res = await apiClient[method](url, values);
    return {
      result: true,
      message: res?.data?.message,
      data: res,
    };
  } catch (error) {
    return { result: false, message: (error as any)?.response?.data?.message };
  }
};
