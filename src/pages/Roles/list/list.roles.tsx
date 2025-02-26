import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import { EditButton } from "./parts/EditButton";
import apiClient from "../../../configs/axios.config";
import { BACKEND_ROUTES } from "../../../shared/backendRoutes";

interface DataType {
  id: React.Key;
  name: string;
  code: string;
  status: "active" | "inactive";
}

const { url: listUrl, method: listMethod } = BACKEND_ROUTES.role.list;
const RolesListPage: React.FC = () => {
  const [roleesListData, setRoleesListData] = useState<DataType[]>([]);

  const columns = [
    {
      title: "شناسه نقش",
      dataIndex: "id",
    },
    {
      title: "نام",
      dataIndex: "name",
    },
    {
      title: "اقدامات",
      key: "action",
      render: (_: any, record: DataType) => {
        return (
          <Space>
            <EditButton roleId={record.id as string} />
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    apiClient[listMethod](listUrl).then(({ data }) => {
      setRoleesListData(
        data.data.map((sw: any) => ({
          ...sw,
        }))
      );
    });
  }, []);

  return (
    <>
      <Table columns={columns} dataSource={roleesListData} rowKey="id" />
    </>
  );
};

export default RolesListPage;
