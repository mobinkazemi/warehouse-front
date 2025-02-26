import React from "react";
import { message } from "antd";
import { useParams } from "react-router-dom";
import { BACKEND_ROUTES } from "../../../shared/backendRoutes";
import UpdateForm from "../../../components/createOrUpdateForm/updateForm";
import { updatePermission } from "./functions/update.permissions.function";

const UpdatePermissionPage: React.FC = () => {
  const { id } = useParams();
  const onFinish = async (values: any) => {
    const response = await updatePermission({ id, ...values });

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
      title={"ویرایش پروژه"}
      items={[
        {
          name: "name",
          label: "نام",
          rules: [{ required: true, message: "نام پروژه را وارد کنید" }],
        },
        {
          name: "code",
          label: "کد",
          rules: [{ required: true, message: "کد پروژه را وارد کنید" }],
        },
      ]}
      dropdownItems={[
        {
          name: "status",
          label: "وضعیت",
          rules: [{ required: true, message: "وضعیت پروژه را وارد کنید" }],
        },
      ]}
      dropdownData={[
        { value: "active", label: "active" },
        { value: "inactive", label: "inactive" },
      ]}
      buttonTitle={"ویرایش پروژه"}
      infoAPI={BACKEND_ROUTES.permission.info}
    />
  );
};

export default UpdatePermissionPage;
