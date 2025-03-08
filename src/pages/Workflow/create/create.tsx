import React, { useState } from "react";
import type { FormProps } from "antd";
import { message } from "antd";
import { createWorkflow } from "./functions/create.workflow";
import { ShowFirstCreationStep } from "./functions/show-first-creation-step.function";
import { createWorkflowStep } from "./functions/create.workflow.step";
import { ShowSecondCreationStep } from "./functions/show-second-creation-step.function";

type FieldType = {
  name: string;
  starterRoles: string[];
};

const WorkflowCreationPage: React.FC = () => {
  const [showFirstStep, setShowFirstStep] = useState(true);
  const [showSecondStep, setShowSecondStep] = useState(false);
  const [showThirdStep, setShowThirdStep] = useState(false);
  const [workflowId, setWorkflowId] = useState<string | null>(null);

  const onFinishFirstStep: FormProps<FieldType>["onFinish"] = async (
    values
  ) => {
    const response = await createWorkflow({ ...values });

    if (response.result) {
      message.success(response.message);
      setWorkflowId(response.data?.data.data.id);

      setTimeout(() => {
        setShowFirstStep(false);
        setShowSecondStep(true);
        setShowThirdStep(false);
      }, 1000);
    } else {
      message.error(response.message);
    }
  };

  const onFinishSecondStep: FormProps<FieldType>["onFinish"] = async (
    values
  ) => {
    const response = await createWorkflowStep({ ...values, workflowId });

    if (response.result) {
      message.success(response.message);

      setTimeout(() => {
        setShowFirstStep(false);
        setShowSecondStep(false);
        setShowThirdStep(true);
      }, 1000);
    } else {
      message.error(response.message);
    }
  };

  if (showFirstStep) {
    return <ShowFirstCreationStep onFinish={onFinishFirstStep} />;
  }

  if (showSecondStep) {
    return <ShowSecondCreationStep onFinish={onFinishSecondStep} />;
  }
};

export default WorkflowCreationPage;
