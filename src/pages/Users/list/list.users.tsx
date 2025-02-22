import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import { DeleteButton } from "./parts/DeleteButton";
import { EditButton } from "./parts/EditButton";
import apiClient from "../../../configs/axios.config";
import { BACKEND_ROUTES } from "../../../shared/backendRoutes";

interface DataType {
  id: React.Key;
  username: string;
  ip: string;
  model: string;
  series: string;
  os: string;
  connectionStatus: boolean | null;
}

const { url: listUrl, method: listMethod } = BACKEND_ROUTES.user.list;
const UsersListPage: React.FC = () => {
  const [useresListData, setUseresListData] = useState<DataType[]>([]);
  const [deletedUser, setDeletedUser] = useState<number[]>([]);

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
      title: "اقدامات",
      key: "action",
      render: (_: any, record: DataType) => {
        return (
          <Space>
            <DeleteButton
              userId={record.id as number}
              setDeletedUser={setDeletedUser}
              deletedUser={deletedUser}
            />
            <EditButton userId={record.id as number} />
          </Space>
        );
      },
    },
  ];
  useEffect(() => {
    apiClient[listMethod](listUrl).then(({ data }) => {
      setUseresListData(
        data.data.map((sw: any) => ({ ...sw, connectionStatus: null }))
      );
    });
  }, []);

  return (
    <>
      <Table
        columns={columns}
        dataSource={useresListData.filter(
          (item) => deletedUser.indexOf(item.id as number) === -1
        )}
        rowKey="id"
      />
    </>
  );
};

export default UsersListPage;
