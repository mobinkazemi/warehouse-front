import { Button, Modal, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { IWorkflow, IWorkflowStep } from "../../workflow.interface";
import { useEffect, useState, useCallback } from "react";
import { Dendrogram, G6 } from "@ant-design/graphs";
import React from "react";
import { v4 } from "uuid";

interface IProps {
  steps: IWorkflowStep[];
}

interface IChartData {
  id: string;
  children?: IChartData[];
}

const { treeToGraphData } = G6;

function convertToAntDesignChart(workflow: IWorkflow) {
  const stepMap = new Map();
  workflow.steps.forEach((step) => stepMap.set(step.order, step));

  function generateUniqueId(name: string, status: string) {
    const spaces = v4().slice(0, 3);
    return `${name} (${status})${spaces}`;
  }

  function buildStepTree(
    step: IWorkflowStep,
    visited = new Set<number>()
  ): any {
    if (visited.has(step.order)) {
      return null; // Stop recursion if this step is already visited
    }

    visited.add(step.order); // Mark this step as visited

    return {
      id: step.next?.conditions?.length
        ? step.next.conditions
            .map((condition) =>
              generateUniqueId(step.name, condition.forStatus)
            )
            .join(" / ")
        : generateUniqueId(step.name, ""),
      children: (step.next?.conditions || [])
        .map((condition) => stepMap.get(condition.forStepNumber))
        .filter((childStep) => childStep)
        .map((childStep) => buildStepTree(childStep, new Set(visited))) // Pass a copy of the visited set
        .filter(Boolean), // Remove null values
    };
  }

  const rootStep = workflow.steps.find((step) => step.type === "START");
  if (!rootStep) {
    return;
  }

  return buildStepTree(rootStep);
}
export const ViewStepsButton: React.FC<IProps> = ({ steps }: IProps) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<IChartData | undefined>(undefined);
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    let workflow = {
      name: "workflow",
      starterRoles: [],
      steps: steps,
    };

    let chartData = convertToAntDesignChart(workflow);
    setData(chartData);
  }, []);

  const showModal = useCallback(() => {
    setVisible(true);
    setIsDataReady(true);
  }, [steps]);

  const handleCancel = useCallback(() => {
    setVisible(false);
    setIsDataReady(false);
  }, []);

  const options = {
    autoFit: { type: "view" as const },
    data: treeToGraphData(data || { id: "root", children: [] }),
    compact: true,
  };

  return (
    <>
      <Tooltip title="مشاهده روند ها">
        <Button type="default" icon={<EyeOutlined />} onClick={showModal} />
      </Tooltip>
      <Modal
        title="مشاهده روند ها"
        open={visible}
        onCancel={handleCancel}
        footer={null}
        width={800}
        destroyOnClose
      >
        {visible && isDataReady && <Dendrogram {...options} />}
      </Modal>
    </>
  );
};
