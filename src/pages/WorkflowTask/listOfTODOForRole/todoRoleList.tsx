import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import { AxiosResponse } from "axios";
import { AcceptButton } from "./parts/AcceptButton";
import { RejectButton } from "./parts/rejectButton";
import { BACKEND_ROUTES } from "../../../shared/backendRoutes";
import apiClient from "../../../configs/axios.config";
import { IBaseBackendResponse } from "../../../shared/interfaces/base-backend-response.interface";
import { timestampToJalali } from "../../../shared/functions/timestamp-to-jalali.function";
import { ViewDetailsButton } from "./parts/ViewDetailsButton";
import { FormModalButton } from "./parts/formModalButton";
import { IForm } from "../../Workflow/create/functions/form-fields-modal.function";

interface DataType {
  id: React.Key;
  stepName: string;
  stepType: string;
  status: string;
  workflowName: string;
  createdAt: string;
  perviousTask: {
    doneBy: { username: string };
    textMessage?: string;
  };
  relatedForm: {
    id: IForm;
    fields: { id: string; required: boolean }[];
  };
  formData?: any;
}

interface APIData {
  id: string;
  stepName: string;
  stepType: string;
  status: string;
  workflowId: { id: string; name: string };
  createdAt: number;
  perviousTask: {
    doneBy: { username: string };
    textMessage?: string;
  };
  relatedForm: {
    id: IForm;
    fields: { id: string; required: boolean }[];
  };
  formData: any;
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
      title: "مرحله قبل",
      key: "action",
      render: (_: any, record: DataType) => {
        return (
          <Space>
            <ViewDetailsButton
              perviousTask={record.perviousTask || {}}
            ></ViewDetailsButton>
          </Space>
        );
      },
    },
    {
      title: "فرم مربوطه",
      key: "action",
      render: (_: any, record: DataType) => {
        if (!record.relatedForm) return null;
        if (!record.relatedForm.id) return null;
        if (!record.relatedForm.fields) return null;
        return (
          <Space>
            <FormModalButton
              taskId={record.id as string}
              wholeTask={record as any}
              id={record.relatedForm.id}
              fields={record.relatedForm.fields}
            ></FormModalButton>
          </Space>
        );
      },
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
              createdAt: timestampToJalali(item.createdAt),
              status: item.status,
              stepName: item.stepName,
              workflowName: item.workflowId.name,
              stepType: item.stepType,
              perviousTask: item.perviousTask,
              relatedForm: item.relatedForm,
              formData: item.formData,
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
