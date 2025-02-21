import React, { useState } from "react";
import { Button, Flex, message, Tooltip } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import apiClient from "../../../../configs/axios.config";
import { IBaseBackendResponse } from "../../../../shared/interfaces/base-backend-response.interface";
import { AxiosResponse } from "axios";
import { BACKEND_ROUTES, setId } from "../../../../shared/backendRoutes";

interface IProps {
  switchId: number;
}

interface IData {
  portCount: number;
  ios_version: string;
  model: string;
  serial: string;
  mac_address: string;
  hostname: string;
  interface: string;
}

interface IAPIResponse extends IBaseBackendResponse<IData> {}
const { method, url } = BACKEND_ROUTES.switch.createAsset;
export const GetAssetsButton: React.FC<IProps> = ({ switchId }: IProps) => {
  const [loading, setLoading] = useState(false);

  const fn = () => {
    setLoading(true);
    apiClient[method]<IAPIResponse>(setId({ id: switchId, url }))
      .then((_: AxiosResponse<IAPIResponse>) => {
        message.success("اطلاعات سوییچ به روز رسانی شد", 1000);
        setTimeout(() => {
          setLoading(false);
          window.location.reload();
        }, 1200);
      })
      .catch((_) => {
        message.error("اطلاعات سوییچ به روز رسانی نشد");
        setLoading(false);
      });
  };

  return (
    <Flex wrap gap="small">
      ‌
      <Tooltip title="استخراج و ثبت اطلاعات سوییچ">
        <Button
          type="primary"
          onClick={fn}
          icon={<SyncOutlined />}
          loading={loading}
        ></Button>
      </Tooltip>
    </Flex>
  );
};
