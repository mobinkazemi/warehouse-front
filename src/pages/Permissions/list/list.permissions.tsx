import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import { EditButton } from "./parts/EditButton";
import apiClient from "../../../configs/axios.config";
import { BACKEND_ROUTES } from "../../../shared/backendRoutes";

interface DataType {
  id: React.Key;
  name: string;
}

const { url: listUrl, method: listMethod } = BACKEND_ROUTES.permission.list;
const PermissionsListPage: React.FC = () => {
  const [permissionesListData, setPermissionesListData] = useState<DataType[]>(
    []
  );

  const columns = [
    {
      title: "شناسه",
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
            <EditButton permissionId={record.id as string} />
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    apiClient[listMethod](listUrl).then(({ data }) => {
      setPermissionesListData(
        data.data.map((sw: any) => ({
          ...sw,
        }))
      );
    });
  }, []);

  return (
    <>
      <Table columns={columns} dataSource={permissionesListData} rowKey="id" />
    </>
  );
};

export default PermissionsListPage;
