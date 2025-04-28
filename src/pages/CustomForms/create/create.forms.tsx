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
    type:
      | "text"
      | "number"
      | "file"
      | "select"
      | "select-multiple"
      | "checkBox"
      | "date"
      |'radio';
    SelectItems: Array<{ label: string }>;
    required: boolean;
  }>;
};

const inputTypeOptions = [
  { value: "text", label: "متن" },
  { value: "password", label: "گذرواژه" },
  { value: "email", label: "ایمیل" },
  { value: "number", label: "عدد" },
  { value: "file", label: "فایل" },
  { value: "select", label: "انتخاب تکی" },
  { value: "select-multiple", label: "انتخاب چندتایی" },
  { value: "checkBox", label: "چک باکس" },
  { value: "date", label: "تاریخ" },
  { value: "radio", label: "چند گزینه ای" },
];

const FormCreationPage: React.FC = () => {
  const navigator = useNavigate();
  const [form] = Form.useForm();
  const [fieldTypes, setFieldTypes] = useState<Record<number, string>>({});

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const finalData = {
      ...values,
      type: "custom",
      fields: values.fields.map((item) => {
        return { ...item, label: item.name };
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

  const handleTypeChange = (value: string, fieldIndex: number) => {
    setFieldTypes((prev) => ({
      ...prev,
      [fieldIndex]: value,
    }));
  };

  const shouldShowSelectItems = (fieldIndex: number) => {
    const type = fieldTypes[fieldIndex];
    return (
      type === "select" || type === "select-multiple" || type === "checkBox" || type === 'radio'
    );
  };

  return (
    <Card title="ساخت فرم جدید" className="w-full">
      <Form
        form={form}
        name="register"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={{
          fields: [
            { name: "", type: "text", selectItems: [], required: false },
          ],
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
                {fields.map(({ key, name: fieldIndex, ...restField }) => (
                  <div key={key} className="col-span-1 md:col-span-2">
                    <Card
                      size="small"
                      title={`فیلد ${fieldIndex + 1}`}
                      extra={
                        fields.length > 1 ? (
                          <MinusCircleOutlined
                            onClick={() => {
                              remove(fieldIndex);
                              // Remove the field type from state when field is removed
                              const newFieldTypes = { ...fieldTypes };
                              delete newFieldTypes[fieldIndex];
                              setFieldTypes(newFieldTypes);
                            }}
                            className="text-red-500"
                          />
                        ) : null
                      }
                      className="mb-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Form.Item
                          {...restField}
                          name={[fieldIndex, "name"]}
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
                          name={[fieldIndex, "type"]}
                          label="نوع فیلد"
                          rules={[
                            {
                              required: true,
                              message: "لطفا نوع فیلد را انتخاب کنید",
                            },
                          ]}
                        >
                          <Select
                            options={inputTypeOptions}
                            placeholder="انتخاب نوع"
                            onChange={(value) =>
                              handleTypeChange(value, fieldIndex)
                            }
                          />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[fieldIndex, "required"]}
                          label="اجباری"
                        >
                          <Select
                            options={[
                              { value: true, label: "بله" },
                              { value: false, label: "خیر" },
                            ]}
                            placeholder="انتخاب کنید"
                          />
                        </Form.Item>

                        {shouldShowSelectItems(fieldIndex) && (
                          <Form.List name={[fieldIndex, "SelectItems"]}>
                            {(
                              selectItems,
                              { add: addItem, remove: removeItem }
                            ) => (
                              <div className="col-span-1 md:col-span-3">
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
                        )}
                      </div>
                    </Card>
                  </div>
                ))}

                <Form.Item className="col-span-1 md:col-span-2">
                  <Button
                    type="dashed"
                    onClick={() =>
                      add({
                        name: "",
                        type: "text",
                        selectItems: [],
                        required: false,
                      })
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
            ثبت فرم
          </Button>
        </Flex>
      </Form>
    </Card>
  );
};

export default FormCreationPage;
