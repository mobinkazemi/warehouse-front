import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { AxiosResponse } from "axios";
import { BACKEND_ROUTES } from "../../../shared/backendRoutes";
import apiClient from "../../../configs/axios.config";
import { IBaseBackendResponse } from "../../../shared/interfaces/base-backend-response.interface";
import { timestampToJalali } from "../../../shared/functions/timestamp-to-jalali.function";

interface DataType {
  id: React.Key;
  workflowName: string;
  stepName: string;
  status: string;
  createdAt: string;
  doneAt: string;
}

interface APIData {
  id: string;
  workflowId: { id: string; name: string };
  stepName: string;
  status: string;
  createdAt: number;
  doneAt: number;
}

const { url: todoListUrl, method: todoListMethod } =
  BACKEND_ROUTES.workflow.engine.listOfUserDonedTasks;

const DoneByMyUserList: React.FC = () => {
  const [taskListData, setTasksListData] = useState<DataType[]>([]);

  const columns = [
    {
      title: "نام فرایند",
      dataIndex: "workflowName",
    },
    {
      title: "مرحله",
      dataIndex: "stepName",
    },
    {
      title: "وضعیت",
      dataIndex: "status",
    },
    {
      title: "تاریخ ایجاد",
      dataIndex: "createdAt",
    },
    {
      title: "تاریخ انجام",
      dataIndex: "doneAt",
    },
  ];

  useEffect(() => {
    apiClient[todoListMethod](todoListUrl).then(
      (data: AxiosResponse<IBaseBackendResponse<APIData[]>>) => {
        setTasksListData(
          (data.data.data || []).map((item) => {
            return {
              id: item.id,
              workflowName: item.workflowId.name,
              stepName: item.stepName,
              status:
                item.status === "DONE-AND-APPROVED"
                  ? "تایید شده"
                  : item.status === "DONE-AND-REJECTED"
                  ? "رد شده"
                  : "نامشخص",
              createdAt: timestampToJalali(item.createdAt),
              doneAt: timestampToJalali(item.doneAt),
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
