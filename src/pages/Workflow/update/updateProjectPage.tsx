import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useParams } from "react-router-dom";
import { BACKEND_ROUTES } from "../../../shared/backendRoutes";
import UpdateForm from "../../../components/createOrUpdateForm/updateForm";
import { updateProject } from "./functions/update.project.function";
import apiClient from "../../../configs/axios.config";
import { DefaultOptionType } from "antd/es/select";
interface IUnit {
  id: string;
  name: string;
}
const { url: listUrl, method: listMethod } = BACKEND_ROUTES.unit.list;
const UpdateProjectPage: React.FC = () => {
  const { id } = useParams();
  const [units, setUnits] = useState<IUnit[]>([]);
  const onFinish = async (values: any) => {
    const response = await updateProject({ id, ...values });

    if (response.result) {
      message.success(response.message);
    } else {
      message.error(response.message);
    }
  };

  useEffect(() => {
    apiClient[listMethod](listUrl)
      .then((item) => {
        setUnits(item.data.data);
      })
      .catch(() => {
        message.error("لیست واحد ها دریافت نشد");
      });
  }, []);
  return (
    <UpdateForm
      id={id as string}
      onFinish={onFinish}
      title={"ویرایش پروژه"}
      items={[
        {
          name: "name",
          label: "نام کارفرما",
          rules: [{ required: true, message: "نام کارفرما را وارد کنید" }],
        },
        {
          name: "description",
          label: "عنوان پروژه",
          rules: [{ required: true, message: "عنوان پروژه را وارد کنید" }],
        },
        {
          name: "code",
          label: "کد پروژه",
          rules: [{ required: true, message: "کد پروژه را وارد کنید" }],
        },
      ]}
      dropdownItems={[
        {
          name: "status",
          label: "وضعیت",
          rules: [{ required: true, message: "وضعیت پروژه را وارد کنید" }],
        },
        {
          name: "unit",
          label: "واحد",
          rules: [{ required: true, message: "واحد پروژه را وارد کنید" }],
        },
      ]}
      dropdownData={[
        [
          { value: "active", label: "active" },
          { value: "inactive", label: "inactive" },
        ],
        units.map((item) => ({
          value: item.id,
          label: item.name,
        })),
      ]}
      buttonTitle={"ویرایش پروژه"}
      infoAPI={BACKEND_ROUTES.project.info}
    />
  );
};

export default UpdateProjectPage;
