import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import { DeleteButton } from "./parts/DeleteButton";
import { EditButton } from "./parts/EditButton";
import apiClient from "../../../configs/axios.config";
import { BACKEND_ROUTES } from "../../../shared/backendRoutes";

interface DataType {
  id: React.Key;
  name: string;
  code: string;
  status: "active" | "inactive";
}

const { url: listUrl, method: listMethod } = BACKEND_ROUTES.project.list;
const ProjectsListPage: React.FC = () => {
  const [projectesListData, setProjectesListData] = useState<DataType[]>([]);
  const [deletedProject, setDeletedProject] = useState<number[]>([]);

  const columns = [
    {
      title: "نام کارفرما",
      dataIndex: "name",
    },
    {
      title: "کد",
      dataIndex: "code",
    },
    {
      title: "وضعیت",
      dataIndex: "status",
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
            <EditButton projectId={record.id as string} />
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

export default ProjectsListPage;
