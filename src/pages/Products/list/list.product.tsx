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

const { url: listUrl, method: listMethod } = BACKEND_ROUTES.product.list;
const ProductsListPage: React.FC = () => {
  const [productesListData, setProductesListData] = useState<DataType[]>([]);
  const [deletedProduct, setDeletedProduct] = useState<number[]>([]);

  const columns = [
    // {
    //   title: "شناسه محصول",
    //   dataIndex: "id",
    // },
    {
      title: "نام",
      dataIndex: "name",
    },
    {
      title: "نوع",
      dataIndex: "type",
    },
    {
      title: "توضیحات",
      dataIndex: "description",
    },
    {
      title: "برند",
      dataIndex: "brand",
    },
    {
      title: "پارت نامبر",
      dataIndex: "partNumber",
    },
    {
      title: "سریال نامبر",
      dataIndex: "serialNumber",
    },
    {
      title: "کد پروژه",
      dataIndex: "code",
    },
    {
      title: "اقدامات",
      key: "action",
      render: (_: any, record: DataType) => {
        return (
          <Space>
            <DeleteButton
              productId={record.id as string}
              setDeletedProduct={setDeletedProduct}
              deletedProduct={deletedProduct}
            />
            <EditButton productId={record.id as string} />
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    apiClient[listMethod](listUrl).then(({ data }) => {
      setProductesListData(
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
        dataSource={productesListData.filter(
          (item) => deletedProduct.indexOf(item.id as number) === -1
        )}
        rowKey="id"
      />
    </>
  );
};

export default ProductsListPage;
