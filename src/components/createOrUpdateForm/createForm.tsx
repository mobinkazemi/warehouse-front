import React from "react";
import { Button, Card, Form, Input, Flex, Row, Col } from "antd";
import { ColorPalletEnum } from "../../shared/enums/colorPallet.enum";

interface IItem {
  name: string;
  label: string;
  rules?: {
    required: boolean;
    message: string;
  }[];
}

interface IProps {
  title: string;
  items: IItem[];
  buttonTitle?: string;
  onFinish: (values: any) => void;
}
const CreateForm: React.FC<IProps> = (data: IProps) => {
  const [form] = Form.useForm();

  return (
    <Flex justify="center" align="center" style={{ marginTop: "50px" }}>
      <Card
        title={
          <Flex align="center" justify="center">
            <img
              src="/douranLogo.png"
              alt="Logo"
              style={{
                width: "50px",
                height: "40px",
              }}
            />
            <span
              style={{
                marginRight: "15px",
                fontSize: "25px",
              }}
            >
              {data.title}
            </span>
          </Flex>
        }
        bordered={false}
        style={{
          width: 500,
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            maxHeight: "400px",
            overflowY: "auto",
            paddingRight: "10px",
          }}
        >
          <Form
            form={form}
            name="creationForm"
            size="large"
            style={{ maxWidth: 500, width: "100%" }}
            onFinish={data.onFinish}
          >
            {data.items.map((item, index) => (
              <Row key={index} gutter={[16, 16]}>
                <Col span={4} style={{ textAlign: "right" }}>
                  <label>{item.label}:</label>
                </Col>
                <Col span={20}>
                  <Form.Item name={item.name} rules={item.rules}>
                    <Input
                      size="large"
                      type={item.name === "password" ? "password" : "text"}
                    />
                  </Form.Item>
                </Col>
              </Row>
            ))}

            <Row>
              <Col span={24} style={{ textAlign: "center", marginTop: "20px" }}>
                <Form.Item>
                  <Button
                    size="large"
                    type="primary"
                    htmlType="submit"
                    style={{
                      width: "30%",
                      backgroundColor: ColorPalletEnum.Primary,
                    }}
                  >
                    {data.buttonTitle || "ایجاد"}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Card>
    </Flex>
  );
};

export default CreateForm;
