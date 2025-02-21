import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import { DeleteButton } from "./parts/DeleteButton";
import { EditButton } from "./parts/EditButton";
import { ConnectButton } from "./parts/ConnectButton";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Tag } from "antd";
import apiClient from "../../../configs/axios.config";
import { HardeningButton } from "./parts/HardeningButton";
import { GetAssetsButton } from "./parts/GetAssetsButton";
import { BACKEND_ROUTES } from "../../../shared/backendRoutes";
interface DataType {
  id: React.Key;
  name: string;
  ip: string;
  model: string;
  series: string;
  os: string;
  connectionStatus: boolean | null;
}

interface IStatus {
  id: number;
  result: boolean;
}

const { url: listUrl, method: listMethod } = BACKEND_ROUTES.switch.list;
const { url: checkConnectionUrl, method: checkConnectionMethod } =
  BACKEND_ROUTES.switch.checkConnectionStatus;
const App: React.FC = () => {
  const [switchesListData, setSwitchesListData] = useState<DataType[]>([]);
  const [deletedSwitch, setDeletedSwitch] = useState<number[]>([]);

  const columns = [
    {
      title: "آی‌دی",
      dataIndex: "id",
    },
    {
      title: "نام",
      dataIndex: "name",
    },
    {
      title: "آدرس آی‌پی",
      dataIndex: "ip",
    },
    {
      title: "مدل",
      dataIndex: "model",
    },
    {
      title: "سری",
      dataIndex: "series",
    },
    {
      title: "وضعیت اتصال",
      dataIndex: "connectionStatus",
      render: (status: boolean | null) =>
        status === null ? (
          <Tag icon={<SyncOutlined spin />} color="processing">
            درحال بررسی
          </Tag>
        ) : status ? (
          <Tag icon={<CheckCircleOutlined />} color="success">
            آماده اتصال
          </Tag>
        ) : (
          <Tag icon={<CloseCircleOutlined />} color="error">
            اتصال ممکن نیست
          </Tag>
        ),
    },
    {
      title: "اقدامات",
      key: "action",
      render: (_: any, record: DataType) => {
        return (
          <Space>
            <DeleteButton
              switchId={record.id as number}
              setDeletedSwitch={setDeletedSwitch}
              deletedSwitch={deletedSwitch}
            />
            <EditButton switchId={record.id as number} />
            <ConnectButton
              switch={{ ...record, id: record.id as number }}
              disable={!record.connectionStatus}
            ></ConnectButton>
            <HardeningButton
              switch={{ ...record, id: record.id as number }}
              disable={!record.connectionStatus}
            ></HardeningButton>
            <GetAssetsButton switchId={record.id as number}></GetAssetsButton>
          </Space>
        );
      },
    },
  ];
  useEffect(() => {
    apiClient[listMethod](listUrl).then(({ data }) => {
      setSwitchesListData(
        data.data.map((sw: any) => ({ ...sw, connectionStatus: null }))
      );
    });

    apiClient[checkConnectionMethod](checkConnectionUrl).then(({ data }) => {
      const statusData = data.data as IStatus[];

      setSwitchesListData((prevSwitches) =>
        prevSwitches.map((sw) => ({
          ...sw,
          connectionStatus:
            statusData.find((status) => status.id === sw.id)?.result ?? null,
        }))
      );
    });
  }, []);

  return (
    <>
      <Table
        columns={columns}
        dataSource={switchesListData.filter(
          (item) => deletedSwitch.indexOf(item.id as number) === -1
        )}
        rowKey="id"
      />
    </>
  );
};

export default App;
