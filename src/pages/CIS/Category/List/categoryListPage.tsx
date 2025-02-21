import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import { DeleteButton } from "./parts/DeleteButton";
import { EditButton } from "./parts/EditButton";
import { BACKEND_ROUTES } from "../../../../shared/backendRoutes";
import apiClient from "../../../../configs/axios.config";
import { IBaseBackendResponse } from "../../../../shared/interfaces/base-backend-response.interface";
import { AxiosResponse } from "axios";
import { jalaliDateToText } from "../../../../shared/functions/jalali-date-to-text-converted";
import moment from "jalali-moment";

interface DataType {
  id: React.Key;
  name: string;
  cis?: {
    id: number;
    name: string;
  };
}

interface IEachRow {
  id: number;
  name: string;
  parentId?: number;
  createdAt: string;
  cis: {
    id: number;
    name: string;
  };
  parent?: {
    id: number;
    name: string;
  };
}

interface IListResponse extends IBaseBackendResponse<IEachRow[]> {}

const { url: listUrl, method: listMethod } = BACKEND_ROUTES.category.list;

const categoryListPage: React.FC = () => {
  const [categoryListData, setCategoryListData] = useState<IEachRow[]>([]);
  const [deletedCategory, setDeletedCategory] = useState<number[]>([]);

  const columns = [
    {
      title: "آی‌دی",
      dataIndex: "id",
    },
    {
      title: "دسته بندی بالادستی",
      dataIndex: "parent",
    },
    {
      title: "نام",
      dataIndex: "name",
    },
    {
      title: "سی آی اس",
      dataIndex: "cis",
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
            <DeleteButton
              categoryId={record.id as number}
              setDeletionState={setDeletedCategory}
              deletedCategory={deletedCategory}
            />
            <EditButton categoryId={record.id as number} />
          </Space>
        );
      },
    },
  ];
  useEffect(() => {
    apiClient[listMethod](listUrl).then(
      (data: AxiosResponse<IListResponse>) => {
        const setMe = (data.data.data || []).map((el) => {
          return {
            id: el.id,
            name: el.name,
            cis: el.cis.name,
            parent: el?.parent?.name || "-",
            createdAt: jalaliDateToText(
              moment(el.createdAt).format("jYYYY/jM/jD HH:mm")
            ),
          };
        });

        setCategoryListData(setMe as unknown as any);
      }
    );
  }, []);

  return (
    <>
      <Table
        columns={columns}
        dataSource={categoryListData.filter(
          (item) => deletedCategory.indexOf(item.id as number) === -1
        )}
        rowKey="id"
      />
    </>
  );
};

export default categoryListPage;
