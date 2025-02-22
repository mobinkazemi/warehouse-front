import apiClient from "../../../../configs/axios.config";
import { BACKEND_ROUTES } from "../../../../shared/backendRoutes";

interface IResponse {
  result: boolean;
  message: string;
}

const { method, url } = BACKEND_ROUTES.switch.create;
export const createSwitch = async (values: any): Promise<IResponse> => {
  let res;
  try {
    res = await apiClient[method](url, {
      ip: values.ip,
      model: values.model,
      name: values.name,
      password: values.password,
      portCount: values.portCount,
      series: values.series,
      username: values.username,
    } as any);
    console.log({ res });
    return { result: true, message: res?.data?.message };
  } catch (error) {
    console.log({ error });
    return { result: false, message: (error as any)?.response?.data?.message };
  }
};
