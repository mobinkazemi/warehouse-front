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
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      نام و نام خانوادگی
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      نام کاربری
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      ایمیل
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      شماره موبایل
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      نقش کاربری
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      تاریخ ثبت نام
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                    >
                      اقدامات
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {useresListData.map((user) => (
                    <tr className="bg-[rgba(254,126,5,80%)]">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 border-y-8 border-white">
                        {user.fullName ?? "--"}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 border-y-8 border-white">
                        {user.username ?? "--"}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 border-y-8 border-white">
                        {user.email ?? "--"}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 border-y-8 border-white">
                        {user.mobile ?? "--"}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 border-y-8 border-white">
                        {user.roles[0].name ?? "--"}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 border-y-8 border-white">
                        {user.createdAt}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium border-y-8 border-white">
                        <button
                          type="button"
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                        >
                          <Space>
                            <DeleteButton
                              userId={user.id}
                              setDeletedUser={setDeletedUser}
                              deletedUser={deletedUser}
                            />

                            <EditButton userId={user.id} />
                          </Space>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* <br /> <br />
      <Table
        columns={columns}
        dataSource={useresListData.filter(
          (item) => deletedUser.indexOf(item.id as number) === -1
        )}
        rowKey="id"
      /> */}
    </>
  );
};

export default UsersListPage;
