import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Typography,
  Tooltip,
  Form,
  Input,
  Flex,
  Card,
  message,
  Row,
  Col,
} from "antd";
import { FormOutlined } from "@ant-design/icons";
import {
  FormFieldTypeEnum,
  IForm,
  IFormField,
} from "../../../Workflow/create/functions/form-fields-modal.function";
import apiClient from "../../../../configs/axios.config";
import { ColorPalletEnum } from "../../../../shared/enums/colorPallet.enum";
import { FormGeneratorDateListFormItem } from "../../../../components/form-items/dates-list-form-item.component";
import { FormGeneratorFileListFormItem } from "../../../../components/form-items/file-form-item.component";
import { FormGeneratorDropdownWithApiFormItem } from "../../../../components/form-items/dropdown-with-api-form-item.component";
import { BACKEND_ROUTES } from "../../../../shared/backendRoutes";

interface IProps {
  id: IForm;
  fields: {
    id: string;
    required: boolean;
  }[];
  taskId: string;
}
const { url: createFormDataUrl, method: createFormDataMethod } =
  BACKEND_ROUTES.workflowTask.createFormData;
export const FormModalButton: React.FC<IProps> = (data: IProps) => {
  const [disableFormButtonAfterSubmit, setDisableFormButtonAfterSubmit] =
    useState(false);
  const [form] = Form.useForm();
  const [formApiMethod, setFormApiMethod] = useState<
    "patch" | "post" | undefined
  >(undefined);
  const [formApiUrl, setFormApiUrl] = useState<string>("");

  const [visible, setVisible] = useState(false);
  const [selectedFields, setSelectedFields] = useState<Map<string, true>>(
    new Map()
  );

  const showModal = () => {
    setVisible(true);
  };

  useEffect(() => {
    if (data?.fields) {
      setSelectedFields(new Map(data.fields.map((f) => [f.id, true])));
      setFormApiMethod(data.id.api.method.toLowerCase() as "post");
      setFormApiUrl(data.id.api.url.toLowerCase());
    }
  }, [data]);

  const onFinish = (values: any) => {
    apiClient[formApiMethod as "post"](formApiUrl, values)
      .then((res: any) => {
        message.success(res.data.message);
        setDisableFormButtonAfterSubmit(true);
        apiClient[createFormDataMethod as "post"](createFormDataUrl, {
          id: data.taskId,
          data: res.data.data,
        })
          .then((res: any) => {
            message.success(res.data.message);
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });

        setTimeout(() => {
          setVisible(false);
          setDisableFormButtonAfterSubmit(true);
        }, 500);
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  };

  return (
    <>
      <Tooltip title="فرم مربوطه">
        <Button
          disabled={disableFormButtonAfterSubmit}
          type="default"
          icon={<FormOutlined />}
          onClick={showModal}
        />
      </Tooltip>
      <Modal
        style={{ direction: "rtl" }}
        title={"فرم مربوطه"}
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={800}
      >
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
                  {data?.id?.name}
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
              name="create"
              style={{ maxWidth: 500, width: "100%" }}
              onFinish={onFinish}
              autoComplete="off"
            >
              {data?.id?.fields
                .filter((f) => {
                  return selectedFields?.has(f.id);
                })
                .map((f) => {
                  console.log(f.name);

                  return (
                    <Row gutter={[16, 16]} key={f.id}>
                      <Col span={5} style={{ textAlign: "right" }}>
                        <label>{f.label}:</label>
                      </Col>
                      <Col span={19}>
                        {f.type === FormFieldTypeEnum.DATE ? (
                          <Form.Item name={f.name} key={f.id}>
                            <FormGeneratorDateListFormItem
                              key={f.id}
                              form={form}
                              componentName={f.name}
                              componentLabel={f.label}
                            ></FormGeneratorDateListFormItem>{" "}
                          </Form.Item>
                        ) : f.type === FormFieldTypeEnum.FILE ? (
                          <Form.Item name={f.name} key={f.id}>
                            <FormGeneratorFileListFormItem
                              form={form}
                              name={f.name}
                            ></FormGeneratorFileListFormItem>
                          </Form.Item>
                        ) : f.relatedInstanceApi ? (
                          <Form.Item name={f.name} key={f.id}>
                            <FormGeneratorDropdownWithApiFormItem
                              data={f}
                              key={f.id}
                            ></FormGeneratorDropdownWithApiFormItem>
                          </Form.Item>
                        ) : (
                          <Form.Item<any> name={f.name} key={f.id}>
                            <Input />
                          </Form.Item>
                        )}
                      </Col>
                    </Row>
                  );
                })}
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
                  ثبت
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Flex>
      </Modal>
    </>
  );
};
