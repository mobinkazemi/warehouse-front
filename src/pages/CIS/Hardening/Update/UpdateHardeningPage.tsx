import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, message, Flex } from "antd";
import { useParams } from "react-router-dom";
import { BACKEND_ROUTES, setId } from "../../../../shared/backendRoutes";
import { IBaseBackendResponse } from "../../../../shared/interfaces/base-backend-response.interface";
import apiClient from "../../../../configs/axios.config";
import { AxiosResponse } from "axios";
import { updateHardening } from "./functions/updateHardening.function";
import { Row, Col } from "antd";
import { ColorPalletEnum } from "../../../../shared/enums/colorPallet.enum";

interface IHardening {
  id: number;
  title: string;
  description: string;
  audit: string;
  command: string;
  recommendations: string;
  regexPattern: string;
  categoryId: number;
}

const { method, url } = BACKEND_ROUTES.hardening.info;
const UpdateHardeningPage: React.FC = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState<Partial<IHardening>>();
  const [form] = Form.useForm();

  useEffect(() => {
    apiClient[method](setId({ id: id as string, url })).then(
      (response: AxiosResponse<IBaseBackendResponse<IHardening>>) => {
        setInitialData(response.data.data);
      }
    );
  }, [id]);

  useEffect(() => {
    form.setFieldsValue(initialData);
  }, [initialData]);

  return (
    <>
      <Flex justify="center" align="center" style={{ marginTop: "9rem" }}>
        <Card
          title={
            <Flex align="center" justify="center">
              <img
                src="/douranLogo.png"
                alt="Logo"
                style={{
                  width: "50px",
                  height: "50px",
                  marginRight: "10px",
                }}
              />
              <span style={{ fontSize: "30px", fontWeight: "bold" }}>
                ویرایش هاردنینگ
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
              maxHeight: "400px", // Set the maximum height
              overflowY: "auto", // Enable vertical scrolling
              paddingRight: "10px", // Adjust for scrollbar (optional)
            }}
          >
            <Form
              form={form}
              name="updateHardeningForm"
              size="large"
              style={{ maxWidth: 500, width: "100%" }}
              onFinish={async (values) => {
                const response = await updateHardening({ id, ...values });

                if (response.result) {
                  message.success(response.message);
                } else {
                  message.error(response.message);
                }
              }}
            >
              {[
                {
                  name: "title",
                  label: "عنوان",
                  rules: [
                    { required: true, message: "عنوان هاردنینگ را وارد کنید" },
                  ],
                },
                {
                  name: "description",
                  label: "توضیحات",
                  rules: [
                    { required: true, message: "ورژن هاردنینگ را وارد کنید" },
                  ],
                },
                { name: "audit", label: "ممیزی", rules: [] },
                {
                  name: "command",
                  label: "دستور",
                  rules: [{ required: true, message: "دستور را وارد کنید" }],
                },
                { name: "recommendations", label: "پیشنهادات", rules: [] },
                { name: "regexPattern", label: "پترن", rules: [] },
                { name: "categoryId", label: "دسته بندی", rules: [] },
              ].map((item, index) => (
                <Row key={index} gutter={[16, 16]}>
                  <Col span={5} style={{ textAlign: "right" }}>
                    <label>{item.label}:</label>
                  </Col>
                  <Col span={19}>
                    <Form.Item name={item.name} rules={item.rules}>
                      <Input size="large" />
                    </Form.Item>
                  </Col>
                </Row>
              ))}

              <Row>
                <Col
                  span={24}
                  style={{ textAlign: "center", marginTop: "20px" }}
                >
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
                      ویرایش هاردنینگ
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </Card>
      </Flex>
    </>
  );
};

export default UpdateHardeningPage;
