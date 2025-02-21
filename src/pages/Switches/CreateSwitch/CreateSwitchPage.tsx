import React from "react";
import { Form, message } from "antd";
import { createSwitch } from "./functions/createSwitch.function";
import CreateForm from "../../../components/createOrUpdateForm/createForm";

const SwitchCreationPage: React.FC = () => {
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    const response = await createSwitch(values);

    if (response.result) {
      message.success(response.message);
      form.resetFields();
    } else {
      message.error(response.message);
      form.resetFields();
    }
  };

  return (
    <CreateForm
      onFinish={onFinish}
      title={"تعریف سوئیچ جدید"}
      buttonTitle={"تعریف سوئیچ"}
      items={[
        {
          name: "ip",
          label: "آی‌پی",
          rules: [
            {
              required: true,
              message: "آدرس آی‌پی سوییچ را وارد کنید",
            },
          ],
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
      ]}
    />
  );
};

export default SwitchCreationPage;
