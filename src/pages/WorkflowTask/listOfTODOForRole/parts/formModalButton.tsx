import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Modal,
  Tooltip,
  Form,
  Input,
  Flex,
  Card,
  message,
  Row,
  Col,
} from "antd";
import { FormOutlined, EyeOutlined } from "@ant-design/icons";
import {
  FormFieldTypeEnum,
  IForm,
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
  wholeTask: {
    id: string;
    formData: any;
    fillFormWith?: string;
  };
}
const { url: createFormDataUrl, method: createFormDataMethod } =
  BACKEND_ROUTES.workflowTask.createFormData;

export const FormModalButton: React.FC<IProps> = (data: IProps) => {
  const [showViewOnly, setShowViewOnly] = useState(!!data.wholeTask.formData);
  const [form] = Form.useForm();
  const [formApiMethod, setFormApiMethod] = useState<
    "patch" | "post" | undefined
  >(undefined);
  const [formApiUrl, setFormApiUrl] = useState<string>("");

  const [visible, setVisible] = useState(false);
  const [selectedFields, setSelectedFields] = useState<Map<string, true>>(
    new Map()
  );

  const [uploading, setUploading] = useState(false);
  const [message1, setMessage1] = useState("");

  const inputRef = useRef(null);

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      setMessage1("❌ لطفاً فقط فایل CSV انتخاب کنید.");
      return;
    }

    const formData = new FormData();

    const newMimeType = 'text/csv';
    const blob = new Blob([file], { type: newMimeType });
  
    const newFile = new File([blob], file.name, { type: newMimeType });

    formData.append("files", newFile);

    setUploading(true);
    setMessage1("");

    try {
      await apiClient.post(`/workflow-task/csv/upload/${data.taskId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage1("✅ فایل با موفقیت آپلود شد!");
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await apiClient.get(`/file/byId/${data.id.tempCsvId}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      link.setAttribute("download", "نمونه-فایل.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("خطا در دانلود فایل نمونه:", error);
      alert("خطا در دانلود فایل نمونه");
    }
  };

  const showModal = () => {
    setVisible(true);
  };

  useEffect(() => {
    if (data.id.readApi) {
      apiClient
        .get(data.id.readApi.url.replace(":id", data.wholeTask.fillFormWith))
        .then((res) => form.setFieldsValue(res.data.data));

      setFormApiUrl(
        data.id.api.url
          .toLowerCase()
          .replace(":id", data.wholeTask.fillFormWith)
      );
    } else {
      setFormApiUrl(data.id.api.url.toLowerCase());
    }

    if (data.wholeTask.formData) {
      form.setFieldsValue(data.wholeTask.formData);
    }
  }, []);

  useEffect(() => {
    if (data?.fields) {
      setSelectedFields(new Map(data.fields.map((f) => [f.id, true])));
      setFormApiMethod(data.id.api.method.toLowerCase() as "post");
      // setFormApiUrl(data.id.api.url.toLowerCase());
    }
  }, [data]);

  const onFinish = (values: any) => {
    apiClient[formApiMethod as "post"](formApiUrl, values)
      .then((res: any) => {
        message.success(res.data.message);
        setShowViewOnly(true);
        apiClient[createFormDataMethod as "post"](createFormDataUrl, {
          id: data.taskId,
          data: res.data.data,
        })
          .then((res: any) => {
            message.success(res.data.message);
            

            const fieldValues: { name: string; value: string }[] = [];

            if (res?.data?.data) {
              for (let key in res.data.data) {
                fieldValues.push({ name: key, value: res.data.data[key] });
              }

              form.setFieldsValue(res.data.data);
            }
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });

        setTimeout(() => {
          setVisible(false);
          setShowViewOnly(true);
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
          type="default"
          icon={showViewOnly ? <EyeOutlined /> : <FormOutlined />}
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
            {data.id.type == "create" && (
              <div className="p-6 rounded-2xl border border-gray-200 mb-4">
                <button
                  onClick={handleDownload}
                  className="text-blue-600 hover:underline text-sm"
                >
                  📥 دانلود فایل نمونه
                </button>

                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-700">
                    آپلود CSV
                  </h2>

                  <input
                    type="file"
                    ref={inputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".csv"
                  />

                  <button
                    onClick={handleButtonClick}
                    disabled={uploading}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? "در حال آپلود..." : "انتخاب فایل"}
                  </button>
                </div>

                {message1 && (
                  <p className="mt-4 text-sm text-gray-700 bg-gray-100 p-3 rounded-lg">
                    {message1}
                  </p>
                )}
              </div>
            )}

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
                  disabled={showViewOnly}
                  size="large"
                  type="primary"
                  htmlType="submit"
                  style={{
                    width: "30%",
                    backgroundColor: showViewOnly
                      ? ColorPalletEnum.WhiteBackground
                      : ColorPalletEnum.Primary,
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
