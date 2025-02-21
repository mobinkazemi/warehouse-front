import { AxiosResponse } from "axios";
import apiClient from "../../../../configs/axios.config";
import { ISwitch } from "../../interface";
import { BACKEND_ROUTES, setId } from "../../../../shared/backendRoutes";

const { method, url } = BACKEND_ROUTES.switch.info;
export const getSwitchInfo = async (switchId: number) => {
  return await apiClient[method](setId({ id: switchId, url })).then(
    (axiosData: AxiosResponse<ISwitch>) => {
      return axiosData.data;
    }
  );
};
