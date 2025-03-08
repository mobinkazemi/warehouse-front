import { Card, Form, Input, Row, Col, Button, Flex, Select } from "antd";
import { ColorPalletEnum } from "../../../../shared/enums/colorPallet.enum";
import { useState } from "react";

interface IProps {
  onFinish: (values: any) => void;
}

interface IFieldType {
  name: string;
  type: string;
  description: string;
}

export enum Workflow_Step_Type_Enum {
  START = "START",
  END = "END",
  TODO = "TODO",
  NOTIFICATION = "NOTIFICATION",
}

export const ShowSecondCreationStep: React.FC<IProps> = ({ onFinish }) => {
  const [form] = Form.useForm();
  const [types, _] = useState<{ label: string; value: string }[]>([
    { label: "شروع", value: Workflow_Step_Type_Enum.START },
    { label: "پایان", value: Workflow_Step_Type_Enum.END },
    { label: "وظیفه", value: Workflow_Step_Type_Enum.TODO },
    { label: "اطلاع رسانی", value: Workflow_Step_Type_Enum.NOTIFICATION },
  ]);

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
              ثبت مراحل فرایند
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
          name="create-workflow-step"
          style={{ maxWidth: 500, width: "100%" }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={[16, 16]}>
            <Col span={5} style={{ textAlign: "right" }}>
              <label>{"نام مرحله"}:</label>
            </Col>
            <Col span={19}>
              {" "}
              <Form.Item<IFieldType>
                name="name"
                rules={[
                  {
                    required: true,
                    message: "نام مرحله را وارد نمایید",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={5} style={{ textAlign: "right" }}>
              <label>{"توضیحات مرحله"}:</label>
            </Col>
            <Col span={19}>
              {" "}
              <Form.Item<IFieldType> name="description">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={5} style={{ textAlign: "right" }}>
              <label>{"نوع مرحله"}:</label>
            </Col>
            <Col span={19}>
              <Form.Item<IFieldType> name="type">
                <Select
                  style={{ width: "100%" }}
                  placeholder="نوع مرحله را انتخاب کنید"
                  options={types}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ textAlign: "center" }}>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              style={{ width: "30%", backgroundColor: ColorPalletEnum.Primary }}
            >
              ثبت مرحله{" "}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  );
};
