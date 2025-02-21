import React from "react";
import { Form, message } from "antd";
import { createCIS } from "./functions/create.function";
import CreateForm from "../../../../components/createOrUpdateForm/createForm";
const CISCreationPage: React.FC = () => {
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    const response = await createCIS(values);

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
      title={"تعریف CIS جدید"}
      buttonTitle={"تعریف CIS"}
      items={[
        {
          name: "name",
          label: "نام",
          rules: [{ required: true, message: "نام CIS را وارد کنید" }],
        },
        {
          name: "version",
          label: "ورژن",
          rules: [{ required: true, message: "ورژن CIS وارد کنید" }],
        },
      ]}
    />
  );
};

export default CISCreationPage;
