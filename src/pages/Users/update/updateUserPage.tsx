import React from "react";
import { message } from "antd";
import { useParams } from "react-router-dom";
import { BACKEND_ROUTES } from "../../../shared/backendRoutes";
import UpdateForm from "../../../components/createOrUpdateForm/updateForm";
import { updateUser } from "./functions/update.user.function";

const UpdateUserPage: React.FC = () => {
  const { id } = useParams();
  const onFinish = async (values: any) => {
    const response = await updateUser({ id: id, ...values });

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
      title={"ویرایش کاربر"}
      items={[
        {
          name: "username",
          label: "نام کاربری",
          rules: [
            {
              required: false,
              message: "نام کاربری جهت اتصال به کاربر را وارد کنید",
            },
          ],
        },
        {
          name: "password",
          label: "گذرواژه",
        },
        {
          name: "fullName",
          label: "نام و نام خانوادگی",
        },
        {
          name: "email",
          label: "ایمیل",
        },
        {
          name: "phoneNumber",
          label: "تلفن همراه",
        },
      ]}
      buttonTitle={"ویرایش کاربر"}
      infoAPI={BACKEND_ROUTES.user.info}
    />
  );
};

export default UpdateUserPage;
