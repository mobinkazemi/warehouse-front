import apiClient from "../../../../configs/axios.config";
import { BACKEND_ROUTES } from "../../../../shared/backendRoutes";

const { url, method } = BACKEND_ROUTES.switch.execCommand;
interface ICommand {
  command: string;
  id: number;
}
interface ICommandRes {
  message: string;
  result: boolean;
  data?: { stdout: string; stderr: string };
}
export const sendSwitchCommand = async (
  data: ICommand
): Promise<ICommandRes> => {
  let result;
  try {
    result = await apiClient[method](url, {
      data: data.command as any,
      switchId: data.id,
    });

    return { ...(result.data as ICommandRes), result: true };
  } catch (error) {
    return { message: (error as any)?.response?.data?.message, result: false };
  }
};
