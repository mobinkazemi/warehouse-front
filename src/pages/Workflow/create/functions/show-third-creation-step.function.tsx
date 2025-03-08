import { Card, Form, Row, Col, Button, Flex, Select, message } from "antd";
import { ColorPalletEnum } from "../../../../shared/enums/colorPallet.enum";
import { useEffect, useState } from "react";
import { IWorkflowStep } from "../../workflow.interface";
import { BACKEND_ROUTES } from "../../../../shared/backendRoutes";
import apiClient from "../../../../configs/axios.config";

interface IProps {
  onFinish: (values: any) => void;
  onContinue: (values: any) => void;
  workflowId: string;
}

interface IFieldType {
  stepNumber: number;
  forStepNumber: number;
  forRole: string;
  forStatus: string;
}

export enum Workflow_Step_Type_Enum {
  START = "START",
  END = "END",
  TODO = "TODO",
  NOTIFICATION = "NOTIFICATION",
}

interface IRole {
  id: string;
  name: string;
}

const { method: workflowInfoMethod, url: workflowInfoUrl } =
  BACKEND_ROUTES.workflow.info;

const { method: roleListMethod, url: roleListUrl } = BACKEND_ROUTES.role.list;
export const ShowThirdCreationStep: React.FC<IProps> = ({
  onFinish,
  onContinue,
  workflowId,
}) => {
  const [form] = Form.useForm();
  const [isContinue, setIsContinue] = useState(false);
  const [steps, setSteps] = useState<IWorkflowStep[]>([]);
  const [roles, setRoles] = useState<IRole[]>([]);

  useEffect(() => {
    apiClient[workflowInfoMethod](workflowInfoUrl.replace(":id", workflowId))
      .then((res) => {
        setSteps(res.data.data.steps);
      })
      .catch((_) => {
        message.error("فرایند پیدا نشد");
      });

    apiClient[roleListMethod](roleListUrl)
      .then((res) => {
        setRoles(res.data.data);
      })
      .catch((_) => {
        message.error("لیست نقش ها پیدا نشد");
      });
  }, []);

  return (
    <Flex justify="center" align="center" style={{ marginTop: "5rem" }}>
      <Card
        title={
          <Flex align="center" justify="center">
            <img
              src="/douranLogo.png"
              alt="Logo"
              style={{ width: "50px", height: "50px", marginRight: "10px" }}
            />
            <span style={{ fontSize: "30px", fontWeight: "bold" }}>
              ثبت شرط مرحله بعدی فرایند
            </span>
          </Flex>
        }
        bordered={false}
        style={{
          width: 450,
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Form
          form={form}
          name="create-workflow-step-condition"
          style={{ maxWidth: 500, width: "100%" }}
          onFinish={isContinue ? onContinue : onFinish}
          autoComplete="off"
        >
          <Row gutter={[16, 16]}>
            <Col span={7} style={{ textAlign: "right" }}>
              <label>{"از مرحله"}:</label>
            </Col>
            <Col span={17}>
              {" "}
              <Form.Item<IFieldType>
                name="stepNumber"
                rules={[
                  {
                    required: true,
                    message: "مرحله مبدا را وارد نمایید",
                  },
                ]}
              >
                <Select
                  options={steps.map((step) => ({
                    label: step.name,
                    value: step.order,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={7} style={{ textAlign: "right" }}>
              <label>{"به مرحله"}:</label>
            </Col>
            <Col span={17}>
              {" "}
              <Form.Item<IFieldType>
                name="forStepNumber"
                rules={[
                  {
                    required: true,
                    message: "مرحله مقصد را وارد نمایید",
                  },
                ]}
              >
                <Select
                  options={steps.map((step) => ({
                    label: step.name,
                    value: step.order,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={7} style={{ textAlign: "right" }}>
              <label>{"در صورت"}:</label>
            </Col>
            <Col span={17}>
              {" "}
              <Form.Item<IFieldType>
                name="forStatus"
                rules={[
                  {
                    required: true,
                    message: "وضعیت شرط را نمایید",
                  },
                ]}
              >
                <Select
                  options={[
                    { label: "تایید", value: "approve" },
                    { label: "عدم تایید", value: "reject" },
                    { label: "هر حالتی", value: "any" },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={7} style={{ textAlign: "right" }}>
              <label>{"ارجا به نقش"}:</label>
            </Col>
            <Col span={17}>
              {" "}
              <Form.Item<IFieldType>
                name="forRole"
                rules={[
                  {
                    required: true,
                    message: "نقش را وارد نمایید",
                  },
                ]}
              >
                <Select
                  options={roles.map((role) => ({
                    label: role.name,
                    value: role.id,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* ------------------------------------- */}

          <Row gutter={[16, 16]}>
            <Col span={5} style={{ textAlign: "right" }}>
              <label> </label>
            </Col>
            <Col span={19}>
              <Form.Item style={{ textAlign: "center" }}>
                <Flex justify="space-around" align="center">
                  <Button
                    size="large"
                    type="primary"
                    htmlType="submit"
                    onClick={() => setIsContinue(false)}
                    style={{
                      width: "30%",
                      backgroundColor: ColorPalletEnum.Primary,
                    }}
                  >
                    ثبت و پایان{" "}
                  </Button>
                  <Button
                    onClick={() => setIsContinue(true)}
                    size="large"
                    type="primary"
                    htmlType="submit"
                    style={{
                      width: "30%",
                      backgroundColor: ColorPalletEnum.Primary,
                    }}
                  >
                    ثبت و ادامه
                  </Button>
                </Flex>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </Flex>
  );
};
