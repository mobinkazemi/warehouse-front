import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import { DeleteButton } from "./parts/DeleteButton";
// import { EditButton } from "./parts/EditButton";
import apiClient from "../../../configs/axios.config";
import { BACKEND_ROUTES } from "../../../shared/backendRoutes";
import { IWorkflowStep } from "../workflow.interface";
// import { ViewStepsButton } from "./parts/view-steps";
import { EyeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";


interface DataType {
  id: React.Key;
  name: string;
  starterRoles: string;
  steps: IWorkflowStep[];
}

const { url: listUrl, method: listMethod } = BACKEND_ROUTES.workflow.list;

const WorkflowListPage: React.FC = () => {
  const [projectesListData, setProjectesListData] = useState<DataType[]>([]);
  const [deletedProject, setDeletedProject] = useState<number[]>([]);

  const navigate = useNavigate()

  const columns = [
    {
      title: "نام فرایند",
      dataIndex: "name",
    },
    {
      title: "نقش های شروع کننده",
      dataIndex: "starterRoles",
    },
    {
      title: "مراحل",
      key: "steps",
      render: (_: any, record: DataType) => {
        return (
          <Space>
            {/* <ViewStepsButton steps={record.steps}></ViewStepsButton> */}

            <Button type="default" icon={<EyeOutlined />} onClick={() => navigate(`/workflow/steps/${record.id}`)} />
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
            <DeleteButton
              projectId={record.id as string}
              setDeletedProject={setDeletedProject}
              deletedProject={deletedProject}
            />
            {/* <EditButton projectId={record.id as string} /> */}
          </Space>
        );
      },
    },
  ];

  useEffect(() => { 
    apiClient[listMethod](listUrl).then(({ data }) => {
      setProjectesListData(
        data.data.map((sw: any) => ({
          ...sw,
          starterRoles: sw.starterRoles
            .map((role: any) => role.name)
            .join(", "),
        }))
      );
    });
  }, []);

  return (
    <>
      <Table
        columns={columns}
        dataSource={projectesListData.filter(
          (item) => deletedProject.indexOf(item.id as number) === -1
        )}
        rowKey="id"
      />
    </>
  );
};

export default WorkflowListPage;
