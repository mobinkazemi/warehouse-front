import apiClient from "../../../../configs/axios.config";
import { BACKEND_ROUTES } from "../../../../shared/backendRoutes";

interface IResponse {
  result: boolean;
  message: string;
}
const { method, url } = BACKEND_ROUTES.workflow.steps.conditions.create;
export const createWorkflowStepCondition = async (
  values: any
): Promise<IResponse> => {
  let res;
  const apiData = {
    workflowId: values.workflowId,
    stepNumber: values.stepNumber,
    next: {
      conditions: [
        {
          forStatus: values.forStatus,
          forRole: values.forRole,
          forStepNumber: values.forStepNumber,
        },
      ],
    },
  };
  try {
    res = await apiClient[method](url, apiData);
    return {
      result: true,
      message: res?.data?.message,
    };
  } catch (error) {
    return { result: false, message: (error as any)?.response?.data?.message };
  }
};
