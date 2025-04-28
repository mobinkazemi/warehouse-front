import React, { useState } from "react";
import type { FormProps } from "antd";
import { Button, Card, Form, Input, message, Flex, Select, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES_ENUM } from "../../../shared/enums/routes.enum";
import { ColorPalletEnum } from "../../../shared/enums/colorPallet.enum";
import { createForm } from "./functions/create.form.function";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

type FieldType = {
  name: string;
  fields: Array<{
    name: string;
    selectItems: Array<{ label: string }>;
    required: boolean;
  }>;
};

const FormCreationPage: React.FC = () => {
  const navigator = useNavigate();
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const finalData = {
      ...values,
      type: "custom",
      fields: values.fields.map((item) => {
        return { ...item, label: item.name, type: "text" };
      }),
    };
    const response = await createForm(finalData);

    if (response.result) {
      message.success(response.message);

      setTimeout(() => {
        navigator(ROUTES_ENUM.FORMS_LIST);
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
    <Card title="ساخت کاربر جدید" className="w-full">
      <Form
        form={form}
        name="register"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={{
          fields: [{ name: "", selectItems: [], required: false }],
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item<FieldType>
            label="نام فرم"
            name="name"
            rules={[
              {
                required: true,
                message: "نام فرم خود را وارد نمایید",
              },
            ]}
          >
            <Input placeholder="نام فرم" />
          </Form.Item>

          <Form.List name="fields">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} className="col-span-1 md:col-span-2">
                    <Card
                      size="small"
                      title={`فیلد ${name + 1}`}
                      extra={
                        fields.length > 1 ? (
                          <MinusCircleOutlined
                            onClick={() => remove(name)}
                            className="text-red-500"
                          />
                        ) : null
                      }
                      className="mb-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item
                          {...restField}
                          name={[name, "name"]}
                          label="نام فیلد"
                          rules={[
                            {
                              required: true,
                              message: "لطفا نام فیلد را وارد کنید",
                            },
                          ]}
                        >
                          <Input placeholder="نام فیلد" />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, "required"]}
                          label="اجباری"
                          valuePropName="checked"
                        >
                          <Select
                            options={[
                              { value: true, label: "بله" },
                              { value: false, label: "خیر" },
                            ]}
                            placeholder="انتخاب کنید"
                          />
                        </Form.Item>

                        <Form.List name={[name, "selectItems"]}>
                          {(
                            selectItems,
                            { add: addItem, remove: removeItem }
                          ) => (
                            <div className="col-span-1 md:col-span-2">
                              <div className="mb-2 flex justify-between items-center">
                                <span>گزینه‌های انتخابی</span>
                                <Button
                                  type="dashed"
                                  onClick={() => addItem({ label: "" })}
                                  icon={<PlusOutlined />}
                                >
                                  افزودن گزینه
                                </Button>
                              </div>
                              {selectItems.map((item, itemIndex) => (
                                <Space
                                  key={item.key}
                                  className="mb-2 flex items-center mx-2"
                                  align="baseline"
                                >
                                  <Form.Item
                                    {...item}
                                    name={[item.name, "label"]}
                                    rules={[
                                      {
                                        required: true,
                                        message:
                                          "لطفا عنوان گزینه را وارد کنید",
                                      },
                                    ]}
                                    noStyle
                                  >
                                    <Input
                                      placeholder="عنوان گزینه"
                                      style={{ width: "200px" }}
                                    />
                                  </Form.Item>
                                  <MinusCircleOutlined
                                    onClick={() => removeItem(item.name)}
                                    className="text-red-500"
                                  />
                                </Space>
                              ))}
                            </div>
                          )}
                        </Form.List>
                      </div>
                    </Card>
                  </div>
                ))}

                <Form.Item className="col-span-1 md:col-span-2">
                  <Button
                    type="dashed"
                    onClick={() =>
                      add({ name: "", selectItems: [], required: false })
                    }
                    block
                    icon={<PlusOutlined />}
                  >
                    افزودن فیلد جدید
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </div>

        <Flex justify="end" className="mt-8">
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            style={{
              width: "30%",
              backgroundColor: ColorPalletEnum.Primary,
            }}
          >
            ثبت کاربر
          </Button>
        </Flex>
      </Form>
    </Card>
  );
};

export default FormCreationPage;
