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
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 border-collapse">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      نام
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
                  {roleesListData.map((role) => (
                    <tr className="bg-[rgba(254,126,5,80%)]">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 border-y-8 border-white">
                        {role.name}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium border-y-8 border-white">
                        <button
                          type="button"
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                        >
                          <Space>
                            <EditButton roleId={role.id as string} />
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

      {/* <Table columns={columns} dataSource={roleesListData} rowKey="id" /> */}
    </>
  );
};

export default RolesListPage;
