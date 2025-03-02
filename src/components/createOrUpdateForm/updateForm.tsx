import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, InputNumber, Flex, Row, Col } from "antd";
import { IRoute, setId } from "../../shared/backendRoutes";
import apiClient from "../../configs/axios.config";
import { ColorPalletEnum } from "../../shared/enums/colorPallet.enum";
import { Rule } from "antd/es/form";
import { Select } from "antd";
import { DefaultOptionType } from "antd/es/select";

interface IItem {
  type?: "number" | "text";
  name: string;
  label: string;
  rules?: Rule[];
  disabled?: boolean;
}

interface IProps {
  id: string;
  infoAPI: IRoute;
  title: string;
  items: IItem[];
  dropdownItems?: IItem[];
  dropdownData?: DefaultOptionType[][] | undefined;
  buttonTitle: string;
  onFinish: (values: any) => void;
}

const UpdateForm: React.FC<IProps> = (data: IProps) => {
  const [initialData, setInitialData] = useState<any>();
  const [form] = Form.useForm();
  useEffect(() => {
    apiClient[data.infoAPI.method](
      setId({ id: data.id as string, url: data.infoAPI.url })
    ).then((response) => {
      setInitialData(response.data.data);
    });
  }, [data.id]);

  useEffect(() => {
    form.setFieldsValue(initialData);
  }, [initialData]);

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
          width: "50%",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            maxHeight: "500px",
            overflowY: "auto",
            paddingRight: "10px",
          }}
        >
          <Form
            form={form}
            name="updateForm"
            size="large"
            style={{ maxWidth: 500, width: "100%" }}
            onFinish={data.onFinish}
          >
            {data.items.map((item, index) => (
              <Row key={index} gutter={[16, 16]}>
                <Col span={5} style={{ textAlign: "right" }}>
                  <label>{item.label}:</label>
                </Col>
                <Col span={19}>
                  <Form.Item
                    name={item.name}
                    rules={item.rules}
                    style={{ marginBottom: "16px" }}
                  >
                    {item.type === "number" ? (
                      <InputNumber min={1} style={{ width: "100%" }} />
                    ) : (
                      <Input
                        disabled={item?.disabled ? true : false}
                        size="large"
                        type={item.name === "password" ? "password" : "text"}
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
            ))}

            {/*  */}
            {data.dropdownItems && data.dropdownData
              ? data.dropdownItems.map((item, index) => {
                  return (
                    <Row key={index} gutter={[16, 16]}>
                      <Col span={5} style={{ textAlign: "right" }}>
                        <label>{item.label}:</label>
                      </Col>
                      <Col span={19}>
                        <Form.Item
                          name={item.name}
                          rules={item.rules}
                          style={{ marginBottom: "16px" }}
                        >
                          {
                            <Select
                              options={(data.dropdownData as any)[index]}
                              defaultValue={
                                initialData && item?.name
                                  ? initialData[item.name]
                                  : null
                              }
                            />
                          }
                        </Form.Item>
                      </Col>
                    </Row>
                  );
                })
              : null}
            {/*  */}

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
                    {data.buttonTitle}
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

export default UpdateForm;

// const handleChange = (value: string) => {
//   console.log(`selected ${value}`);
// };

// const App: React.FC = () => (

// );

// export default App;
