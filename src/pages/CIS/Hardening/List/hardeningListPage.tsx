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

interface IEachRow {
  id: React.Key;
  title: string;
  categoryName?: string;
  createdAt: string;
}

interface IAPIResponse_EachRow {
  id: number;
  createdAt: string;
  title: string;
  category: {
    id: number;
    name: string;
  };
}

interface IListResponse extends IBaseBackendResponse<IAPIResponse_EachRow[]> {}

const { url: listUrl, method: listMethod } = BACKEND_ROUTES.hardening.list;

const hardeningListPage: React.FC = () => {
  const [hardeningListData, setHardeningListData] = useState<IEachRow[]>([]);
  const [deletedHardening, setDeletedHardening] = useState<number[]>([]);

  const columns = [
    {
      title: "آی‌دی",
      dataIndex: "id",
    },
    {
      title: "عنوان",
      dataIndex: "title",
    },
    {
      title: "دسته بندی",
      dataIndex: "categoryName",
    },
    {
      title: "تاریخ ایجاد",
      dataIndex: "createdAt",
    },
    {
      title: "اقدامات",
      key: "action",
      render: (_: any, record: IEachRow) => {
        return (
          <Space>
            <DeleteButton
              hardeningId={record.id as number}
              setDeletionState={setDeletedHardening}
              deletedHardening={deletedHardening}
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
            title: el.title,
            categoryName: el.category?.name,
            createdAt: jalaliDateToText(
              moment(el.createdAt).format("jYYYY/jM/jD HH:mm")
            ),
          };
        });

        setHardeningListData(setMe as unknown as any);
      }
    );
  }, []);

  return (
    <>
      <Table
        columns={columns}
        dataSource={hardeningListData.filter(
          (item) => deletedHardening.indexOf(item.id as number) === -1
        )}
        rowKey="id"
      />
    </>
  );
};

export default hardeningListPage;
