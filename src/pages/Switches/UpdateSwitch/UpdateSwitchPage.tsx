import React from "react";
import { message } from "antd";
import { useParams } from "react-router-dom";
import { updateSwitch } from "./functions/updateSwitch.function";
import { BACKEND_ROUTES } from "../../../shared/backendRoutes";
import UpdateForm from "../../../components/createOrUpdateForm/updateForm";

const UpdateSwitchPage: React.FC = () => {
  const { switchId } = useParams();
  const onFinish = async (values: any) => {
    const response = await updateSwitch({ id: switchId, ...values });

    if (response.result) {
      message.success(response.message);
    } else {
      message.error(response.message);
    }
  };

  return (
    <UpdateForm
      id={switchId as string}
      onFinish={onFinish}
      title={"ویرایش سوئیچ"}
      items={[
        {
          name: "name",
          label: "نام",
          rules: [{ required: true, message: "نام سوییچ را وارد کنید" }],
        },
        {
          name: "ip",
          label: "آی‌پی",
          rules: [{ required: true, message: "آدرس آی‌پی سوییچ را وارد کنید" }],
        },
        {
          name: "model",
          label: "مدل",
          rules: [{ required: true, message: "مدل سوییچ را وارد کنید" }],
        },
        {
          name: "series",
          label: "سری",
          rules: [{ required: true, message: "سری سوییچ را وارد کنید" }],
        },
        {
          name: "username",
          label: "نام کاربری",
          rules: [
            {
              required: true,
              message: "نام کاربری جهت اتصال به سوییچ را وارد کنید",
            },
          ],
        },
        {
          name: "password",
          label: "گذرواژه",
          rules: [
            {
              required: true,
              message: "گذرواژه جهت اتصال به سوییچ را وارد کنید",
            },
          ],
        },
        {
          name: "portCount",
          label: "تعداد پورت",
          type: "number",
        },
      ]}
      buttonTitle={"ویرایش سوئیچ"}
      infoAPI={BACKEND_ROUTES.switch.info}
    />
  );
};

export default UpdateSwitchPage;
