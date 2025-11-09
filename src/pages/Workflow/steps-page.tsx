import { TOKEN_KEY_ENUM } from "../../shared/enums/token.enum";

import { useCallback, useEffect, useState } from "react";
import { Select as MultiSelect } from "antd";

import dagre from "@dagrejs/dagre";
import {
  Background,
  Panel,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams } from "react-router-dom";
import { BASE_BACKEND_URL } from "@/configs/axios.config";

import { Select as SelectAnt } from "antd";

function Dashboard() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEdgeModal, setShowEdgeModal] = useState(false);
  const [pendingEdge, setPendingEdge] = useState(null);

  const [stepName, setStepName] = useState("");
  const [stepType, setStepType] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [forms, setForms] = useState([]);
  const [selectedFormId, setSelectedFormId] = useState("");
  const [availableFields, setAvailableFields] = useState([]);
  const [selectedFields, setSelectedFields] = useState({});
  const [edgeMode, setEdgeMode] = useState("any");

  const [steps, setSteps] = useState([]);
  const [selectedEditId, setSelectedEditId] = useState([]);
  const [canCreateCustomTaskFlag, setCanCreateCustomTaskFlag] = useState(false);

  // console.log(canCreateCustomTaskFlag);

  const [show, setShow] = useState(false);

  const [selectedFieldId, setSelectedFieldId] = useState("");
  const [conditionOperator, setConditionOperator] = useState("==");
  const [conditionValue, setConditionValue] = useState("");

  const [hour, setHour] = useState("");
  const [day, setDay] = useState("");

  const [filteredFieldsForCondition, setFilteredFieldsForCondition] = useState(
    []
  );

  const [formhayeNamayeshi, setFormhayeNamayeshi] = useState([]);

  const { workflowId } = useParams();

  const token = localStorage.getItem("access_token");

  const nodeWidth = 172;
  const nodeHeight = 36;

  const getLayoutedElements = (nodes, edges, direction = "LR") => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    const isHorizontal = direction === "LR";
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      node.targetPosition = isHorizontal ? "left" : "top";
      node.sourcePosition = isHorizontal ? "right" : "bottom";

      return {
        ...node,
        position: {
          x: nodeWithPosition.x - nodeWidth / 2,
          y: nodeWithPosition.y - nodeHeight / 2,
        },
      };
    });

    return { nodes: layoutedNodes, edges };
  };

  useEffect(() => {
    fetch(`${BASE_BACKEND_URL}/form/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setForms(data.data));

    fetch(`${BASE_BACKEND_URL}/role/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setRoles(data.data));

    fetch(`${BASE_BACKEND_URL}/workflow/byId/${workflowId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSteps(data.data.steps);

        const loadedNodes = data.data.steps.map((step) => ({
          id: `${step.order}`,
          data: { label: step.name },
          position: { x: 0, y: 0 },
          stepData: step,
        }));

        const loadedEdges = [];
        data.data.steps.forEach((step) => {
          step.next?.conditions?.forEach((cond) => {
            if (cond.forStepNumber) {
              loadedEdges.push({
                id: `${step.order}-${cond.forStepNumber}-${cond.forStatus}`,
                source: `${step.order}`,
                target: `${cond.forStepNumber}`,
                label: cond.forStatus || "any",
                data: {
                  roleId: cond.forRole,
                },
              });
            }
          });
        });

        const { nodes: layoutedNodes, edges: layoutedEdges } =
          getLayoutedElements(loadedNodes, loadedEdges);
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
      });
  }, []);

  useEffect(() => {
    if (pendingEdge) {
      const sourceNode = nodes.find((n) => n.id === pendingEdge.source);
      const selectedForm = sourceNode?.stepData?.relatedForm;
      if (selectedForm && selectedForm.fields?.length > 0) {
        const fieldIds = selectedForm.fields.map((f) => f.id);
        const fullForm = forms.find((form) => form.id === selectedForm.id.id);
        const filteredFields = fullForm?.fields?.filter((f) =>
          fieldIds.includes(f.id)
        );
        setFilteredFieldsForCondition(filteredFields || []);
      }
    }
  }, [pendingEdge]);

  const handleFormChange = (value) => {
    setSelectedFormId(value);

    const form = forms.find((form) => form.id === value);

    if (form.type == "update") {
      setShow(true);
    } else {
      setShow(false);
    }

    setAvailableFields(form.fields);

    const defaults = {};

    form.fields.forEach((field) => {
      if (field.required)
        defaults[field.id] = { required: true, disabled: true };
    });

    setSelectedFields(defaults);
  };

  const handleFieldToggle = (fieldId) => {
    setSelectedFields((prev) => {
      const updated = { ...prev };

      if (updated[fieldId]) {
        delete updated[fieldId];
      } else {
        updated[fieldId] = { required: false };
      }

      return updated;
    });
  };

  const handleFieldRequiredChange = (fieldId, value) => {
    setSelectedFields((prev) => ({
      ...prev,
      [fieldId]: { ...prev[fieldId], required: value === "true" },
    }));
  };

  const handleAddStep = async () => {
    const relatedForm = {
      id: selectedFormId,
      fields: Object.entries(selectedFields).map(([id, config]) => ({
        id,
        required: config.required,
      })),
    };

    let newStep;
    if (+selectedEditId != 0) {
      newStep = {
        workflowId,
        order: nodes.length + 1,
        name: stepName,
        type: stepType,
        relatedForm,
        stepOrderToFillFormWith: +selectedEditId,
        showFilledFormsFromSteps: formhayeNamayeshi,
        canCreateCustomTaskFlag: canCreateCustomTaskFlag,
        estimateHour: +hour,
        estimateDay: +day,
        // next: { conditions: [] },
      };
    } else {
      newStep = {
        workflowId,
        order: nodes.length + 1,
        name: stepName,
        type: stepType,
        relatedForm,
        showFilledFormsFromSteps: formhayeNamayeshi,
        canCreateCustomTaskFlag: canCreateCustomTaskFlag,
        estimateHour: +hour,
        estimateDay: +day,
        // stepOrderToFillFormWith: +selectedEditId,
        // next: { conditions: [] },
      };
    }

    // Send to server
    await fetch(`${BASE_BACKEND_URL}/workflow/create-step`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newStep),
    });

    const newNode = {
      id: `${newStep.order}`,
      data: { label: newStep.name },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };

    setNodes((nds) => [...nds, newNode]);
    setShowModal(false);

    setStepName("");
    setStepType("");
    setSelectedFormId("");
    setAvailableFields([]);
    setSelectedEditId("");
    setFormhayeNamayeshi([]);
  };

  const onConnect = useCallback((params) => {
    setPendingEdge(params);
    setShowEdgeModal(true);
  }, []);

  const confirmEdge = async () => {
    const sourceNode = nodes.find((n) => n.id === pendingEdge.source);
    const sourceStep = sourceNode.stepData;

    const newCondition = {
      forStatus: edgeMode,
      forStepNumber: parseInt(pendingEdge.target),
      forRole: selectedRoleId,
      ...(selectedFieldId &&
        conditionOperator &&
        conditionValue && {
          forField: selectedFieldId,
          comparisonOperator: conditionOperator,
          value: conditionValue,
        }),
    };

    const updatedStep = {
      workflowId,
      ...sourceStep,
      stepNumber: sourceStep.order,
      next: {
        ...sourceStep.next,
        conditions: [...[], newCondition],
      },
    };

    await fetch(`${BASE_BACKEND_URL}/workflow/create-step-conditions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedStep),
    });

    setEdges((eds) => addEdge({ ...pendingEdge, label: edgeMode }, eds));

    setNodes((nds) =>
      nds.map((n) =>
        n.id === sourceNode.id ? { ...n, stepData: updatedStep } : n
      )
    );

    setPendingEdge(null);
    setShowEdgeModal(false);
    setEdgeMode("any");
    setSelectedRoleId("");
    setSelectedFieldId("");
    setConditionOperator("");
    setConditionValue("");
    setFilteredFieldsForCondition([]);
  };

  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }

  return (
    <div className="h-full">
      <ReactFlow
        fitView
        nodes={nodes}
        edges={edges}
        onNodesChange={(changes) =>
          setNodes((nds) => applyNodeChanges(changes, nds))
        }
        onEdgesChange={(changes) =>
          setEdges((eds) => applyEdgeChanges(changes, eds))
        }
        onConnect={onConnect}
      >
        <Background />

        <Panel position="bottom-left">
          <Button size="icon" onClick={() => setShowModal(true)}>
            <Plus />
          </Button>
        </Panel>
      </ReactFlow>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent dir="rtl">
          <DialogHeader dir="rtl">
            <DialogTitle dir="rtl" className="text-start">
              افزودن مرحله جدید
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>نام مرحله</Label>

              <Input
                value={stepName}
                onChange={(e) => setStepName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>نوع مرحله</Label>

              <Select value={stepType} onValueChange={setStepType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="نوع" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="START">شروع</SelectItem>
                  <SelectItem value="TODO">وظیفه</SelectItem>
                  <SelectItem value="END">پایان</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>فرم مرتبط</Label>

              <Select value={selectedFormId} onValueChange={handleFormChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="فرم مرتبط" />
                </SelectTrigger>

                <SelectContent>
                  {forms.map((form) => (
                    <SelectItem key={form.id} value={form.id}>
                      {form.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>پیشبینی زمان انجام</Label>

              <div className="grid grid-cols-2 gap-x-4">
                <Input
                  value={hour}
                  onChange={(e) => setHour(e.target.value)}
                  placeholder="ساعت"
                />

                <Input
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  placeholder="روز"
                />
              </div>
            </div>

            {availableFields.length > 0 && (
              <div className="space-y-2">
                <Label>فیلدها</Label>

                {availableFields.map((field) => (
                  <div key={field.id} className="flex items-center gap-4">
                    <Checkbox
                      checked={!!selectedFields[field.id]}
                      onCheckedChange={() => handleFieldToggle(field.id)}
                      disabled={field.required}
                    />

                    <label>{field.label}</label>

                    {selectedFields[field.id] && !field.required && (
                      <Select
                        value={
                          selectedFields[field.id].required ? "true" : "false"
                        }
                        onValueChange={(val) =>
                          handleFieldRequiredChange(field.id, val)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="false">اختیاری</SelectItem>
                          <SelectItem value="true">اجباری</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                ))}
              </div>
            )}

            {show && (
              <div className="space-y-2">
                <Label>ویرایش مرحله ی</Label>

                <Select
                  value={selectedEditId}
                  onValueChange={(value) => setSelectedEditId(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="ویرایش مرحله ی" />
                  </SelectTrigger>

                  <SelectContent>
                    {steps.map((step) => (
                      <SelectItem key={step.order} value={step.order}>
                        {step.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label>فرم های نمایشی</Label>
              <MultiSelect
                className="w-full z-50"
                mode="tags"
                value={formhayeNamayeshi}
                onChange={setFormhayeNamayeshi}
                placeholder="ویرایش مرحله ی"
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                dropdownStyle={{ zIndex: 9999 }}
              >
                {steps.map((step) => (
                  <MultiSelect.Option key={step.order} value={step.order}>
                    {`مرحله ${step.name} شامل ${step?.relatedForm?.id?.name}`}{" "}
                  </MultiSelect.Option>
                ))}
              </MultiSelect>
            </div>

            <div className="flex gap-2 items-center">
              <Label>امکان ایجادوظیفه سفارشی</Label>
              <Checkbox
                value={canCreateCustomTaskFlag}
                onClick={() => setCanCreateCustomTaskFlag((prev) => !prev)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleAddStep}>ذخیره مرحله</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showEdgeModal} onOpenChange={setShowEdgeModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>تنظیم ارتباط</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>وضعیت</Label>

              <Select value={edgeMode} onValueChange={setEdgeMode}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="وضعیت" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="approve">Approve</SelectItem>
                  <SelectItem value="reject">Reject</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>نقش</Label>

              <Select value={selectedRoleId} onValueChange={setSelectedRoleId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="انتخاب نقش" />
                </SelectTrigger>

                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {filteredFieldsForCondition.length > 0 && (
              <div className="space-y-2 border-t pt-4 mt-4">
                <Label>شرط بر اساس فیلد</Label>

                <Select
                  value={selectedFieldId}
                  onValueChange={setSelectedFieldId}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="انتخاب فیلد" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredFieldsForCondition.map((field) => (
                      <SelectItem key={field.id} value={field.id}>
                        {field.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={conditionOperator}
                  onValueChange={setConditionOperator}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="عملگر شرط" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="equals">برابر</SelectItem>
                    <SelectItem value="not_equals">مخالف</SelectItem>
                    <SelectItem value="greater_than">بزرگ‌تر</SelectItem>
                    <SelectItem value="less_than">کوچک‌تر</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  value={conditionValue}
                  onChange={(e) => setConditionValue(e.target.value)}
                  placeholder="مقدار شرط"
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button onClick={confirmEdge}>ثبت ارتباط</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StepsPage() {
  return <Dashboard />;
}

export default StepsPage;
