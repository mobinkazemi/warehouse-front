import React, { useState } from "react";
import type { FormProps } from "antd";
import { message } from "antd";
import { createWorkflow } from "./functions/create.workflow";
import { ShowFirstCreationStep } from "./functions/show-first-creation-step.function";
import { createWorkflowStep } from "./functions/create.workflow.step";
import { ShowSecondCreationStep } from "./functions/show-second-creation-step.function";
import { ShowThirdCreationStep } from "./functions/show-third-creation-step.function";
import { createWorkflowStepCondition } from "./functions/create.workflow.step.condition";
import { ROUTES_ENUM } from "../../../shared/enums/routes.enum";
import { useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
type FieldType = {
  name: string;
  starterRoles: string[];
};

const WorkflowCreationPage: React.FC = () => {
  const navigate = useNavigate();
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

  const onContinueSecondStep: FormProps<FieldType>["onFinish"] = async (
    values
  ) => {
    const response = await createWorkflowStep({ ...values, workflowId });

    if (response.result) {
      message.success(response.message);
    } else {
      message.error(response.message);
    }
  };

  const onFinishThirdStep: FormProps<FieldType>["onFinish"] = async (
    values
  ) => {
    const response = await createWorkflowStepCondition({
      ...values,
      workflowId,
    });

    if (response.result) {
      message.success(response.message);

      setTimeout(() => {
        navigate(ROUTES_ENUM.WORKFLOW_LIST);
      }, 1000);
    } else {
      message.error(response.message);
    }
  };

  const onContinueThirdStep: FormProps<FieldType>["onFinish"] = async (
    values
  ) => {
    const response = await createWorkflowStepCondition({
      ...values,
      workflowId,
    });
    if (response.result) {
      message.success(response.message);
    } else {
      message.error(response.message);
    }
  };
  if (showFirstStep) {
    return <ShowFirstCreationStep onFinish={onFinishFirstStep} />;
  }

  if (showSecondStep) {
    return (
      <ShowSecondCreationStep
        onContinue={onContinueSecondStep}
        onFinish={onFinishSecondStep}
      />
    );
  }

  if (showThirdStep) {
    return (
      <ShowThirdCreationStep
        workflowId={workflowId as string}
        onContinue={onContinueThirdStep}
        onFinish={onFinishThirdStep}
      />
    );
  }
};

export default WorkflowCreationPage;
