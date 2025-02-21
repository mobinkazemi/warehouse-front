import React from "react";
import { message } from "antd";
import { useParams } from "react-router-dom";

import { updateCIS } from "./functions/updateCIS.function";
import { BACKEND_ROUTES } from "../../../../shared/backendRoutes";
import UpdateForm from "../../../../components/createOrUpdateForm/updateForm";

const UpdateCISPage: React.FC = () => {
  const { id } = useParams();
  const onFinish = async (values: any) => {
    const response = await updateCIS({ id, ...values });

    if (response.result) {
      message.success(response.message);
    } else {
      message.error(response.message);
    }
  };

  return (
    <UpdateForm
      items={[
        {
          name: "name",
          label: "نام",
          rules: [{ required: true, message: "نام CIS را وارد کنید" }],
        },
        {
          name: "version",
          label: "ورژن",
          rules: [{ required: true, message: "ورژن CIS را وارد کنید" }],
        },
      ]}
      title={"ویرایش CIS"}
      buttonTitle={"ویرایش"}
      id={id as string}
      infoAPI={BACKEND_ROUTES.cis.info}
      onFinish={onFinish}
    />
  );
};

export default UpdateCISPage;
