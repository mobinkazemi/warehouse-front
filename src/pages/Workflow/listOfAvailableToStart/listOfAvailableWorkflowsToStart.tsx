import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import { StartButton } from "./parts/startButton";
import apiClient from "../../../configs/axios.config";
import { BACKEND_ROUTES } from "../../../shared/backendRoutes";
import { IWorkflowStep } from "../workflow.interface";
import { ViewStepsButton } from "./parts/view-steps";

interface DataType {
  id: React.Key;
  name: string;
  starterRoles: string;
  steps: IWorkflowStep[];
}

const { url: listUrl, method: listMethod } =
  BACKEND_ROUTES.workflow.listOfAvailableWorkflowsToStart;

const ListOfAvailableWorkflowsToStartPage: React.FC = () => {
  const [workflowsListData, setWorkflowsListData] = useState<DataType[]>([]);

  const columns = [
    {
      title: "نام فرایند",
      dataIndex: "name",
    },
    {
      title: "مراحل",
      key: "steps",
      render: (_: any, record: DataType) => {
        return (
          <Space>
            <ViewStepsButton steps={record.steps}></ViewStepsButton>
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
            <StartButton workflowId={record.id as string} />
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    apiClient[listMethod](listUrl).then(({ data }) => {
      setWorkflowsListData(
        data.data.map((sw: any) => ({
          ...sw,
          // starterRoles: sw.starterRoles
          //   .map((role: any) => role.name)
          //   .join(", "),
        }))
      );
    });
  }, []);

  return (
    <>
      <Table columns={columns} dataSource={workflowsListData} rowKey="id" />
    </>
  );
};

export default ListOfAvailableWorkflowsToStartPage;
