import React, { useState } from "react";
import type { FormProps } from "antd";
import { message } from "antd";
import { createWorkflow } from "./functions/create.workflow";
import { ShowFirstCreationStep } from "./functions/show-first-creation-step.function";

type FieldType = {
  name: string;
  starterRoles: string[];
};

const WorkflowCreationPage: React.FC = () => {
  const [showFirstStep, setShowFirstStep] = useState(true);
  const [showSecondStep, setShowSecondStep] = useState(false);
  const [showThirdStep, setShowThirdStep] = useState(false);

  const onFinishFirstStep: FormProps<FieldType>["onFinish"] = async (
    values
  ) => {
    const response = await createWorkflow({ ...values });

    if (response.result) {
      message.success(response.message);
      setShowFirstStep(false);
      setShowSecondStep(true);
      setShowThirdStep(false);
    } else {
      message.error(response.message);
    }
  };

  if (showFirstStep) {
    return <ShowFirstCreationStep onFinish={onFinishFirstStep} />;
  }
};

export default WorkflowCreationPage;
