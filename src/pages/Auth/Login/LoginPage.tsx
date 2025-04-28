import React from "react";
import type { FormProps } from "antd";
import { Button, Card, Flex, Form, Input, message } from "antd";
import { loginUser } from "./functions/login-user.function";
import { TOKEN_KEY_ENUM } from "../../../shared/enums/token.enum";
import { useNavigate } from "react-router-dom";
import { ROUTES_ENUM } from "../../../shared/enums/routes.enum";
import { ColorPalletEnum } from "../../../shared/enums/colorPallet.enum";
import { ROLE_LOCAL_STORAGE_ENUM } from "../../../shared/enums/localStorageRoleKey.enum";
import { getMyRole } from "../../../shared/functions/get-my-role";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const LoginPage: React.FC = () => {
  const navigator = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values: any) => {
    console.log(values);
    const response = await loginUser(values);
    console.log(response);
    if (response.result) {
      localStorage.setItem(TOKEN_KEY_ENUM.ACCESS, response.token as string);

      const thisRole = await getMyRole();
      localStorage.setItem(ROLE_LOCAL_STORAGE_ENUM.ROLE, thisRole.role);
      message.success(response.message);
      setTimeout(() => {
        navigator(ROUTES_ENUM.HOME);
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
      <div className="size-full flex pt-8 justify-center">
        <div className="max-w-6xl w-full relative">
          <div className="bg-gray-900 h-48 rounded-2xl flex items-center px-8">
            <img src="logo.png" alt="" className="w-48" />

            <div className="text-4xl text-white flex flex-col gap-2 mr-8 font-bold">
              <span>سامـانـه</span>
              <span>دوریـنـو</span>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="w-[30rem] pt-20">
              <span className="mb-8 block text-orange-500">ورود به سیستم</span>

              <Form
                name="basic"
                labelCol={{}}
                wrapperCol={{}}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="w-fu"
              >
                <Form.Item<FieldType>
                  label="نام کاربری"
                  name="username"
                  wrapperCol={{ offset: 2, span: 25 }}
                  rules={[
                    {
                      required: true,
                      message: "نام کاربری خود را وارد نمایید",
                    },
                  ]}
                >
                  <Input variant="filled" />
                </Form.Item>

                <Form.Item<FieldType>
                  label="گذرواژه"
                  wrapperCol={{ offset: 3, span: 24 }}
                  name="password"
                  rules={[
                    { required: true, message: "رمز عبور خود را وارد نمایید" },
                  ]}
                >
                  <Input.Password variant="filled" />
                </Form.Item>

                <div className="border-t border-gray-200 mb-8"></div>

                {/* <div style={{ marginBottom: "3rem" }}></div> */}

                <div className="flex justify-end">
                  <Form.Item style={{ textAlign: "center" }}>
                    <Button
                      size="large"
                      type="primary"
                      htmlType="submit"
                      style={{
                        // width: "50%",
                        backgroundColor: ColorPalletEnum.Primary,
                      }}
                      className="w-32"
                    >
                      ورود
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </div>

            <img
              src="auth.png"
              alt=""
              className="w-[640px] h-[740px] absolute top-4 -left-14"
            />
          </div>
        </div>
      </div>

      {/* <Flex justify="center" align="center" style={{ marginTop: "10rem" }}>
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
              <span style={{ fontSize: "30px", fontWeight: "bold" }}>ورود</span>
            </Flex>
          }
          bordered={false}
          style={{
            width: 400,
            height: 300,
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Form
            name="basic"
            labelCol={{}}
            wrapperCol={{}}
            style={{ maxWidth: 500, width: "100%" }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="نام کاربری"
              name="username"
              wrapperCol={{ offset: 0, span: 24 }}
              rules={[
                { required: true, message: "نام کاربری خود را وارد نمایید" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="گذرواژه"
              wrapperCol={{ offset: 1, span: 23 }}
              name="password"
              rules={[
                { required: true, message: "رمز عبور خود را وارد نمایید" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <div style={{ marginBottom: "3rem" }}></div>
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
                ورود
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Flex> */}
    </>
  );
};

export default LoginPage;
