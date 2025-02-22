import apiClient from "../../../../configs/axios.config";
import { BACKEND_ROUTES } from "../../../../shared/backendRoutes";
import { ISwitch } from "../../interface";

interface IResponse {
  result: boolean;
  message: string;
}
const { method, url } = BACKEND_ROUTES.switch.update;
export const updateSwitch = async (values: ISwitch): Promise<IResponse> => {
  try {
    let res = await apiClient[method](url, values);

    return { result: true, message: res?.data?.message };
  } catch (error) {
    return { result: false, message: (error as any)?.response?.data?.message };
  }
};
