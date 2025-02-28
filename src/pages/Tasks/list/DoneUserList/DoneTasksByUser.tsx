import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BACKEND_ROUTES } from "../../../../shared/backendRoutes";
import apiClient from "../../../../configs/axios.config";
import { IBaseBackendResponse } from "../../../../shared/interfaces/base-backend-response.interface";
import { AxiosResponse } from "axios";

interface DataType {
  id: React.Key;

  assignerRole: string;

  assigneeRole: string;

  description: string;

  product: string;

  project: string;

  createdAt: string;
}

interface APIData {
  description: string;
  assigneeRole: {
    name: string;
    id: string;
  };
  assignerRole: {
    name: string;
    id: string;
  };
  products: [
    {
      type: string;
      brand: string;
      partNumber: string;
      description: string;
      serialNumber: string;
      code: string;
      id: string;
    }
  ];
  project: {
    name: string;
    code: string;
    id: string;
    fileIds: string[];
  };
  taskFlowDesc: string;
  createdAt: number;
  id: string;
}

const { url: todoListUrl, method: todoListMethod } =
  BACKEND_ROUTES.task.doneByMyUserList;
const DoneByMyUserList: React.FC = () => {
  const [taskListData, setTasksListData] = useState<DataType[]>([]);

  const columns = [
    {
      title: "از نقش",
      dataIndex: "assignerRole",
    },
    {
      title: "به نقش",
      dataIndex: "assigneeRole",
    },
    {
      title: "توضیحات",
      dataIndex: "description",
    },
    {
      title: "محصول",
      dataIndex: "product",
    },
    {
      title: "پروژه",
      dataIndex: "project",
    },
    {
      title: "تاریخ ایجاد",
      dataIndex: "createdAt",
    },
    // {
    //   title: "اقدامات",
    //   key: "action",
    //   render: (_: any, record: DataType) => {
    //     return (
    //       <Space>
    //         <AcceptButton
    //           taskId={record.id as string}
    //           setDoneTask={setDoneTask}
    //           doneTask={doneTask}
    //         ></AcceptButton>
    //         <RejectButton
    //           taskId={record.id as string}
    //           setDoneTask={setDoneTask}
    //           doneTask={doneTask}
    //         ></RejectButton>{" "}
    //       </Space>
    //     );
    //   },
    // },
  ];

  useEffect(() => {
    apiClient[todoListMethod](todoListUrl).then(
      (data: AxiosResponse<IBaseBackendResponse<APIData[]>>) => {
        setTasksListData(
          (data.data.data || []).map((item) => {
            return {
              assignerRole: item.assignerRole.name,
              assigneeRole: item.assigneeRole.name,
              description: item.description,
              product: item.products[0].type + " - " + item.products[0].brand,
              project: item.project.name + " - " + item.project.code,
              createdAt: new Date().toLocaleDateString(),
              id: item.id,
            };
          })
        );
      }
    );
  }, []);

  return (
    <>
      <Table columns={columns} dataSource={taskListData} rowKey="id" />
    </>
  );
};

export default DoneByMyUserList;
