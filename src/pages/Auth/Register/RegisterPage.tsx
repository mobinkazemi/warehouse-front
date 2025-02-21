import React from "react";
import type { FormProps } from "antd";
import { Button, Card, Form, Input, message, Flex } from "antd";
import { registerUser } from "./functions/register-user.function";
import { useNavigate } from "react-router-dom";
import { ROUTES_ENUM } from "../../../shared/enums/routes.enum";
import { ColorPalletEnum } from "../../../shared/enums/colorPallet.enum";

type FieldType = {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage: React.FC = () => {
  const navigator = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const response = await registerUser(values);

    if (response.result) {
      message.success(response.message);

      setTimeout(() => {
        navigator(ROUTES_ENUM.LOGIN);
        window.location.reload();
      }, 1000);
    } else {
      message.error(response.message);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Flex justify="center" align="center" style={{ marginTop: "5rem" }}>
        <Card
          title={
            <Flex align="center" justify="center">
              <img
                src="/douranLogo.png" // Update this with your logo path
                alt="Logo"
                style={{
                  width: "50px",
                  height: "50px",
                  marginRight: "10px",
                }}
              />
              <span style={{ fontSize: "30px", fontWeight: "bold" }}>
                ثبت‌ نام
              </span>
            </Flex>
          }
          bordered={false}
          style={{
            width: 400,
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Form
            name="register"
            labelCol={{}}
            wrapperCol={{}}
            style={{ maxWidth: 500, width: "100%" }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="نام"
              name="name"
              wrapperCol={{ offset: 4, span: 20 }}
              rules={[{ required: true, message: "نام خود را وارد نمایید" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="نام کاربری"
              name="username"
              wrapperCol={{ offset: 1, span: 23 }}
              rules={[
                { required: true, message: "نام کاربری خود را وارد نمایید" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="گذرواژه"
              name="password"
              wrapperCol={{ offset: 2, span: 22 }}
              rules={[
                { required: true, message: "گذرواژه خود را وارد نمایید" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item<FieldType>
              label="تکرار گذرواژه"
              name="confirmPassword"
              wrapperCol={{ offset: 0, span: 24 }}
              dependencies={["password"]}
              rules={[
                { required: true, message: "گذرواژه خود را مجددا وارد نمایید" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("گذرواژه و تکرار گذرواژه یکسان نیستند!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <div style={{ marginBottom: "2rem" }}></div>

            <Form.Item style={{ textAlign: "center" }}>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                style={{
                  width: "30%",
                  backgroundColor: ColorPalletEnum.Primary,
                }}
              >
                ثبت‌ نام
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Flex>
    </>
  );
};

export default RegisterPage;
