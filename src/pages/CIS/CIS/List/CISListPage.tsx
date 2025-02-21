import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import { DeleteButton } from "./parts/DeleteButton";
import { EditButton } from "./parts/EditButton";
import { BACKEND_ROUTES } from "../../../../shared/backendRoutes";
import apiClient from "../../../../configs/axios.config";

interface DataType {
  id: React.Key;
  name: string;
  version: string;
}

const { url: listUrl, method: listMethod } = BACKEND_ROUTES.cis.list;

const CISListPage: React.FC = () => {
  const [cisListData, setCISListData] = useState<DataType[]>([]);
  const [deletedCIS, setDeletedCIS] = useState<number[]>([]);

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
      title: "ورژن",
      dataIndex: "version",
    },
    {
      title: "اقدامات",
      key: "action",
      render: (_: any, record: DataType) => {
        return (
          <Space>
            <DeleteButton
              cisId={record.id as number}
              setDeletionState={setDeletedCIS}
              deletedCIS={deletedCIS}
            />
            <EditButton cisId={record.id as number} />
          </Space>
        );
      },
    },
  ];
  useEffect(() => {
    apiClient[listMethod](listUrl).then(({ data }) => {
      setCISListData(data.data.map((sw: any) => ({ ...sw })));
    });
  }, []);

  return (
    <>
      <Table
        columns={columns}
        dataSource={cisListData.filter(
          (item) => deletedCIS.indexOf(item.id as number) === -1
        )}
        rowKey="id"
      />
    </>
  );
};

export default CISListPage;
