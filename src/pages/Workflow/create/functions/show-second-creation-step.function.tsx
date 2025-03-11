import {
  Card,
  Form,
  Input,
  Row,
  Col,
  Button,
  Flex,
  Select,
  message,
} from "antd";
import { ColorPalletEnum } from "../../../../shared/enums/colorPallet.enum";
import { useEffect, useState } from "react";
import { BACKEND_ROUTES } from "../../../../shared/backendRoutes";
import apiClient from "../../../../configs/axios.config";
import FormFieldModal, { IForm } from "./form-fields-modal.function";
import { SettingOutlined } from "@ant-design/icons";

interface IProps {
  onFinish: (values: any) => void;
  onContinue: (values: any) => void;
}

interface IFieldType {
  name: string;
  type: string;
  description: string;
  relatedForm: string;
}

export enum Workflow_Step_Type_Enum {
  START = "START",
  END = "END",
  TODO = "TODO",
  NOTIFICATION = "NOTIFICATION",
}

const { url: formListUrl, method: formListMethod } = BACKEND_ROUTES.forms.list;

export const ShowSecondCreationStep: React.FC<IProps> = ({
  onFinish,
  onContinue,
}) => {
  const [form] = Form.useForm();
  const [isContinue, setIsContinue] = useState(false);
  const [forms, setForms] = useState<
    { label: string; value: string | undefined }[]
  >([]);
  const [dbForms, setDbForms] = useState<IForm[]>([]);
  const [selectedForm, setSelectedForm] = useState<IForm | undefined>(
    undefined
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFields, setSelectedFields] = useState<any[]>([]);

  const [types, _] = useState<{ label: string; value: string }[]>([
    { label: "شروع", value: Workflow_Step_Type_Enum.START },
    { label: "پایان", value: Workflow_Step_Type_Enum.END },
    { label: "وظیفه", value: Workflow_Step_Type_Enum.TODO },
    { label: "اطلاع رسانی", value: Workflow_Step_Type_Enum.NOTIFICATION },
  ]);

  useEffect(() => {
    apiClient[formListMethod](formListUrl)
      .then(({ data }) => {
        setDbForms(data.data);
        setForms(
          data.data.map((form: any) => {
            return { label: form.name, value: form.id };
          })
        );
      })
      .catch((_) => {
        message.error("لیست فرم ها دریافت نشد");
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
              ثبت مراحل فرایند
            </span>
          </Flex>
        }
        bordered={false}
        style={{
          width: 550,
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Form
          form={form}
          name="create-workflow-step"
          style={{ maxWidth: 500, width: "100%" }}
          onFinish={(values: any) => {
            setSelectedForm(undefined);
            setSelectedFields([]);
            if (isContinue) {
              form.resetFields();
              onContinue({
                ...values,
                relatedForm:
                  selectedForm?.id && selectedFields?.length
                    ? { id: selectedForm?.id, fields: selectedFields }
                    : undefined,
              });
            } else {
              onFinish({
                ...values,
                relatedForm:
                  selectedForm?.id && selectedFields?.length
                    ? { id: selectedForm?.id, fields: selectedFields }
                    : undefined,
              });
            }
          }}
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
              <label>{"توضیحات"}:</label>
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
              <Form.Item<IFieldType>
                name="type"
                rules={[
                  {
                    required: true,
                    message: "نوع مرحله را انتخاب کنید",
                  },
                ]}
              >
                <Select
                  style={{ width: "100%" }}
                  placeholder="نوع مرحله را انتخاب کنید"
                  options={types}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={5} style={{ textAlign: "right" }}>
              <label>{"فرم (اختیاری)"}:</label>
            </Col>
            <Col span={19}>
              <Row gutter={[2, 1]}>
                <Col span={22}>
                  <Form.Item<IFieldType> name="relatedForm">
                    <Select
                      style={{ width: "100%" }}
                      placeholder="فرم را انتخاب کنید"
                      options={forms}
                      onChange={(value) => {
                        setSelectedForm(
                          dbForms.find((form) => form.id === value)
                        );
                        setTimeout(() => {
                          setModalVisible(true);
                        }, 1000);
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  {selectedForm && (
                    <Button
                      icon={<SettingOutlined />}
                      onClick={() => setModalVisible(true)}
                    />
                  )}
                  <FormFieldModal
                    visible={modalVisible}
                    form={selectedForm as IForm}
                    onClose={() => setModalVisible(false)}
                    onSave={(fields) => {
                      setSelectedFields(fields);
                    }}
                  />
                </Col>
              </Row>
            </Col>
          </Row>

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
