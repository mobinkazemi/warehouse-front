import { useCallback, useEffect, useState } from "react";

import {
  Background,
  Controls,
  Handle,
  ReactFlow,
  addEdge,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { TOKEN_KEY_ENUM } from "../../shared/enums/token.enum";

// import { edgesMocks, nodeMocks } from "./service";

const TodoNode = ({ data }) => {
  return (
    <div
      style={{
        padding: 10,
        border: "2px solid #ff0072",
        borderRadius: 5,
        background: "#fff",
        minWidth: 150,
        textAlign: "center",
      }}
    >
      <Handle type="target" position="top" style={{ background: "#555" }} />

      <strong>{data.label}</strong>

      {data.formFields && (
        <div style={{ marginTop: 5 }}>
          <p>Form Fields:</p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {data.formFields.map((field, index) => (
              <li key={index}>
                {field.id} ({field.required ? "Required" : "Optional"})
              </li>
            ))}
          </ul>
        </div>
      )}

      <Handle type="source" position="bottom" style={{ background: "#555" }} />
    </div>
  );
};

const nodeTypes = {
  todo: TodoNode,
};

const Workflow = () => {
  const [elements, setElements] = useState({ nodes: [], edges: [] });

  // تابع برای گرفتن داده‌ها از API
  const fetchWorkflowData = async () => {
    const token = localStorage.getItem(TOKEN_KEY_ENUM.ACCESS);
    try {
      const response = await fetch(
        "http://172.17.17.234:8000/workflow/byId/67f27c22e22df7b61c320206",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ); // آدرس API خودت
      const data = await response.json(); // فرضاً آرایه‌ای از نودها
      const nodes = [];
      const edges = [];

      // تبدیل دیتا به نودها و لبه‌ها
      data.data.steps.forEach((item, index) => {
        // ساخت نود
        nodes.push({
          id: item.order.toString(),
          type: item.type.toLowerCase() === "todo" ? "todo" : "default", // نوع نود
          data: {
            label: `${item.name} (${item.type})`,
            formFields: item.relatedForm?.fields?.map((field) => ({
              id: field.id.$oid,
              required: field.required,
            })),
          },
          position: { x: index * 200, y: 100 }, // فاصله بیشتر برای نودهای بزرگ‌تر
        });

        // ساخت لبه‌ها بر اساس next
        if (item.next && item.next.conditions) {
          item.next.conditions.forEach((condition) => {
            edges.push({
              id: `e${item.order}-${condition.forStepNumber}`,
              source: item.order.toString(),
              target: condition.forStepNumber.toString(),
              label: condition.forStatus, // مثلاً "approve"
            });
          });
        }
      });

      setElements({ nodes, edges });
    } catch (error) {
      console.error("خطا در گرفتن داده‌ها:", error);
    }
  };

  useEffect(() => {
    fetchWorkflowData();
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <ReactFlow
        nodes={elements.nodes}
        edges={elements.edges}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

function StepsPage() {
  return <Workflow />;
}

export default StepsPage;
