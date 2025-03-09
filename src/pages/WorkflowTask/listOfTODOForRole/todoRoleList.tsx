import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import { AxiosResponse } from "axios";
import { AcceptButton } from "./parts/AcceptButton";
import { RejectButton } from "./parts/rejectButton";
import { BACKEND_ROUTES } from "../../../shared/backendRoutes";
import apiClient from "../../../configs/axios.config";
import { IBaseBackendResponse } from "../../../shared/interfaces/base-backend-response.interface";
import moment from "jalali-moment";

interface DataType {
  id: React.Key;
  stepName: string;
  stepType: string;
  status: string;
  workflowName: string;
  createdAt: string;
}

interface APIData {
  id: string;
  stepName: string;
  stepType: string;
  status: string;
  workflowId: { id: string; name: string };
  createdAt: number;
}

const { url: todoListUrl, method: todoListMethod } =
  BACKEND_ROUTES.workflow.engine.listOfAvailableWorkflowTasksForRole;

export const ListOfToDoTasksForRole: React.FC = () => {
  const [taskListData, setTasksListData] = useState<DataType[]>([]);
  const [doneTask, setDoneTask] = useState<string[]>([]);

  const columns = [
    {
      title: "نام مرحله",
      dataIndex: "stepName",
    },
    {
      title: "نوع مرحله",
      dataIndex: "stepType",
    },
    {
      title: "وضعیت",
      dataIndex: "status",
    },
    {
      title: "نام فرایند",
      dataIndex: "workflowName",
    },
    {
      title: "تاریخ ایجاد",
      dataIndex: "createdAt",
    },
    {
      title: "اقدامات",
      key: "action",
      render: (_: any, record: DataType) => {
        return (
          <Space>
            <AcceptButton
              taskId={record.id as string}
              setDoneTask={setDoneTask}
              doneTask={doneTask}
            ></AcceptButton>
            <RejectButton
              taskId={record.id as string}
              setDoneTask={setDoneTask}
              doneTask={doneTask}
            ></RejectButton>{" "}
            {/* <ViewDetailsButton
              projectId={record.projectId as string}
              productId={record.productId as string}
            ></ViewDetailsButton> */}
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    apiClient[todoListMethod](todoListUrl).then(
      (data: AxiosResponse<IBaseBackendResponse<APIData[]>>) => {
        setTasksListData(
          (data.data.data || []).map((item) => {
            return {
              id: item.id,
              createdAt: moment(item.createdAt)
                .locale("fa")
                .format("YYYY/MM/DD-HH:mm"),
              status: item.status,
              stepName: item.stepName,
              workflowName: item.workflowId.name,
              stepType: item.stepType,
            };
          })
        );
      }
    );
  }, []);

  return (
    <>
      <Table
        columns={columns}
        dataSource={taskListData.filter(
          (item) => doneTask.indexOf(item.id as string) === -1
        )}
        rowKey="id"
      />
    </>
  );
};

export default ListOfToDoTasksForRole;
