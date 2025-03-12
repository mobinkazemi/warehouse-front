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
} from "../../../Workflow/create/functions/form-fields-modal.function";
import apiClient from "../../../../configs/axios.config";
import { ColorPalletEnum } from "../../../../shared/enums/colorPallet.enum";
import { FormGeneratorDateListFormItem } from "../../../../components/form-items/dates-list-form-item.component";
import { FormGeneratorFileListFormItem } from "../../../../components/form-items/file-form-item.component";
import { FormGeneratorDropdownWithApiFormItem } from "../../../../components/form-items/dropdown-with-api-form-item.component";

interface IProps {
  id: IForm;
  fields: {
    id: string;
    required: boolean;
  }[];
}

export const FormModalButton: React.FC<IProps> = (data: IProps) => {
  const [form] = Form.useForm();
  const [formApiMethod, setFormApiMethod] = useState<
    "patch" | "post" | undefined
  >(undefined);
  const [formApiUrl, setFormApiUrl] = useState<string>("");
  const [formType, setFormType] = useState<"create" | "update" | undefined>(
    undefined
  );
  const [visible, setVisible] = useState(false);
  const [selectedFields, setSelectedFields] = useState<
    Map<string, true> | undefined
  >(undefined);

  const showModal = () => {
    setVisible(true);
  };

  useEffect(() => {
    if (data?.fields) {
      setSelectedFields(new Map(data.fields.map((f) => [f.id, true])));
    }
  }, [data]);

  const onFinish = (values: any) => {
    apiClient[formApiMethod as "post"](formApiUrl, values)
      .then((res: any) => {
        message.success(res.data.message);

        if (formType === "create") {
          setVisible(false);
        }
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  };

  return (
    <>
      <Tooltip title="فرم مربوطه">
        <Button type="default" icon={<FormOutlined />} onClick={showModal} />
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
                  if (f.type === FormFieldTypeEnum.FILE) {
                    console.log(f);
                  }
                  return (
                    <Row gutter={[16, 16]}>
                      <Col span={5} style={{ textAlign: "right" }}>
                        <label>{f.label}:</label>
                      </Col>
                      <Col span={19}>
                        {f.type === FormFieldTypeEnum.DATE ? (
                          <FormGeneratorDateListFormItem
                            key={f.id}
                            form={form}
                            componentName={f.name}
                            componentLabel={f.label}
                          ></FormGeneratorDateListFormItem>
                        ) : f.type === FormFieldTypeEnum.FILE ? (
                          <FormGeneratorFileListFormItem
                            key={f.id}
                          ></FormGeneratorFileListFormItem>
                        ) : f.relatedInstanceApi ? (
                          <FormGeneratorDropdownWithApiFormItem
                            {...f}
                          ></FormGeneratorDropdownWithApiFormItem>
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
