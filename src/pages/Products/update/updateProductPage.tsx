import React from "react";
import { message } from "antd";
import { useParams } from "react-router-dom";
import { BACKEND_ROUTES } from "../../../shared/backendRoutes";
import UpdateForm from "../../../components/createOrUpdateForm/updateForm";
import { updateProduct } from "./functions/update.product.function";
import { productTypesList } from "../create/poduct.types";

const UpdateProductPage: React.FC = () => {
  const { id } = useParams();
  const onFinish = async (values: any) => {
    const response = await updateProduct({ id, ...values });

    if (response.result) {
      message.success(response.message);
    } else {
      message.error(response.message);
    }
  };

  return (
    <UpdateForm
      id={id as string}
      onFinish={onFinish}
      title={"ویرایش محصول"}
      items={[
        {
          name: "name",
          label: "نام",
        },
        {
          name: "brand",
          label: "برند",
        },
        {
          name: "partNumber",
          label: "پارت نامبر",
        },
        {
          name: "serialNumber",
          label: "سریال نامبر",
        },
        {
          name: "description",
          label: "توضیحات",
        },
        {
          name: "code",
          label: "کد پروژه",
          disabled: true,
        },
      ]}
      dropdownItems={[
        {
          name: "type",
          label: "نوع",
        },
      ]}
      dropdownData={[
        productTypesList.map((item) => ({
          label: item,
          value: item,
        })),
      ]}
      buttonTitle={"ویرایش محصول"}
      infoAPI={BACKEND_ROUTES.product.info}
    />
  );
};

export default UpdateProductPage;
