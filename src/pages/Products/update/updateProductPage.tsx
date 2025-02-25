import React from "react";
import { message } from "antd";
import { useParams } from "react-router-dom";
import { BACKEND_ROUTES } from "../../../shared/backendRoutes";
import UpdateForm from "../../../components/createOrUpdateForm/updateForm";
import { updateProduct } from "./functions/update.product.function";

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
          rules: [{ required: true, message: "نام محصول را وارد کنید" }],
        },
        {
          name: "code",
          label: "کد",
          rules: [{ required: true, message: "کد محصول را وارد کنید" }],
        },
      ]}
      dropdownItems={[
        {
          name: "status",
          label: "وضعیت",
          rules: [{ required: true, message: "وضعیت محصول را وارد کنید" }],
        },
      ]}
      dropdownData={[
        { value: "active", label: "active" },
        { value: "inactive", label: "inactive" },
      ]}
      buttonTitle={"ویرایش محصول"}
      infoAPI={BACKEND_ROUTES.product.info}
    />
  );
};

export default UpdateProductPage;
