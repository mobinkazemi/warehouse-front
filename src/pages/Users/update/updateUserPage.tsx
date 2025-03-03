import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useParams } from "react-router-dom";
import { BACKEND_ROUTES } from "../../../shared/backendRoutes";
import UpdateForm from "../../../components/createOrUpdateForm/updateForm";
import { updateUser } from "./functions/update.user.function";
import apiClient from "../../../configs/axios.config";
import { ProjectRole } from "../../../shared/enums/project.roles.enum";

interface IRole {
  id: string;
  name: string;
}
const { method: roleListMethod, url: roleListUrl } = BACKEND_ROUTES.role.list;
const UpdateUserPage: React.FC = () => {
  const { id } = useParams();
  const [roles, setRoles] = useState<IRole[]>();
  const onFinish = async (values: any) => {
    console.log(values);
    const response = await updateUser({
      id: id,
      ...values,
      roles: values.roles ? [values.roles] : undefined,
    });

    if (response.result) {
      message.success(response.message);
    } else {
      message.error(response.message);
    }
  };

  useEffect(() => {
    apiClient[roleListMethod](roleListUrl).then((response) => {
      setRoles(response.data.data);
    });
  }, []);

  return (
    <UpdateForm
      id={id as string}
      onFinish={onFinish}
      title={"ویرایش کاربر"}
      items={[
        {
          type: "text",
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
          type: "text",
          name: "password",
          label: "گذرواژه",
        },
        {
          type: "text",
          name: "fullName",
          label: "نام و نام خانوادگی",
        },
        {
          type: "text",
          name: "email",
          label: "ایمیل",
        },
        {
          type: "text",
          name: "phoneNumber",
          label: "تلفن همراه",
        },
      ]}
      dropdownItems={[
        {
          name: "roles",
          label: "نقش",
          rules: [
            {
              required: false,
              message: "نقش کاربر را وارد کنید",
            },
          ],
        },
      ]}
      dropdownData={[
        [
          {
            label: "Technical Manager",
            title: "Technical Manager",
            options: roles
              ?.filter((item) => item.name == ProjectRole.Technical_Manager)
              .map((item) => {
                return { label: item.name, value: item.id };
              }),
          },
          {
            label: "Buyers",
            title: "Buyers",
            options: roles
              ?.filter((item) => item.name.includes("خرید"))
              .map((item) => {
                return { label: item.name, value: item.id };
              }),
          },
          {
            label: "Sellers",
            title: "Sellers",
            options: roles
              ?.filter((item) => item.name.includes("فروش"))
              .map((item) => {
                return { label: item.name, value: item.id };
              }),
          },
          {
            label: "Store",
            title: "Store",
            options: roles
              ?.filter((item) => item.name == ProjectRole.Warehouse_Manager)
              .map((item) => {
                return { label: item.name, value: item.id };
              }),
          },
        ],
      ]}
      buttonTitle={"ویرایش کاربر"}
      infoAPI={BACKEND_ROUTES.user.info}
    />
  );
};

export default UpdateUserPage;
