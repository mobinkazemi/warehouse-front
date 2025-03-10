import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import { DeleteButton } from "./parts/DeleteButton";
import { EditButton } from "./parts/EditButton";
import apiClient from "../../../configs/axios.config";
import { BACKEND_ROUTES } from "../../../shared/backendRoutes";
import { timestampToJalali } from "../../../shared/functions/timestamp-to-jalali.function";

interface DataType {
  id: React.Key;
  username: string;
  fullName: string;
  role: string;
  createdAt: number;
}

const { url: listUrl, method: listMethod } = BACKEND_ROUTES.user.list;
const UsersListPage: React.FC = () => {
  const [useresListData, setUseresListData] = useState<DataType[]>([]);
  const [deletedUser, setDeletedUser] = useState<number[]>([]);

  const columns = [
    {
      title: "نام و نام خانوادگی",
      dataIndex: "fullName",
    },
    {
      title: "نام کاربری",
      dataIndex: "username",
    },
    {
      title: "نقش",
      dataIndex: "role",
    },
    {
      title: "تاریخ ثبت نام",
      dataIndex: "createdAt",
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
        data.data.map((sw: any) => ({
          ...sw,
          role: sw.roles[0]?.name || "ندارد",
          createdAt: timestampToJalali(sw.createdAt),
        }))
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
