import React, { useEffect, useState } from "react";
import type { FormProps } from "antd";
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Flex,
  Upload,
  List,
  Image,
  Row,
  Col,
  Select,
  Space,
  DatePicker,
} from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES_ENUM } from "../../../shared/enums/routes.enum";
import { ColorPalletEnum } from "../../../shared/enums/colorPallet.enum";
import { createProject } from "./functions/create.project.function";
import {
  UploadOutlined,
  DeleteOutlined,
  FileOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import apiClient from "../../../configs/axios.config"; // Your Axios instance
import { BACKEND_ROUTES } from "../../../shared/backendRoutes";

const { RangePicker } = DatePicker;

type FieldType = {
  name: string;
  description: string;
  code: string;
  files: string[]; // Array to store uploaded file IDs
  unit: string;
  cellPhone?: string;
  email?: string;
};

interface UploadedFile {
  id: string;
  url: string;
  name: string;
}

interface IUnit {
  id: string;
  name: string;
}

const { url: listUrl, method: listMethod } = BACKEND_ROUTES.unit.list;
const ProjectCreationPage: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [units, setUnits] = useState<IUnit[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    apiClient[listMethod](listUrl)
      .then((item) => {
        setUnits(item.data.data);
      })
      .catch(() => {
        message.error("لیست واحد ها دریافت نشد");
      });
  }, []);

  const navigator = useNavigate();

  // Handle file upload
  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("files", file);

    try {
      const response = await apiClient.post("/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data?.data?.id) {
        const newFile = {
          id: response.data.data.id,
          url: URL.createObjectURL(file), // Temporary preview
          name: file.name,
        };
        setUploadedFiles((prev) => [...prev, newFile]);
        message.success(`فایل بارگزاری شد: ${file.name}`);
      }
    } catch (error) {
      message.error("File upload failed.");
    }
  };

  // Remove uploaded file
  const handleRemoveFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log(values);
    const fileIds = uploadedFiles.map((file) => file.id);
    const response = await createProject({ ...values, files: fileIds });

    if (response.result) {
      message.success(response.message);
      setTimeout(() => {
        navigator(ROUTES_ENUM.PROJECTS_LIST);
        window.location.reload();
      }, 1000);
    } else {
      message.error(response.message);
    }
  };

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
              ثبت پروژه
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
          name="create-project"
          style={{ maxWidth: 500, width: "100%" }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={[16, 16]}>
            <Col span={5} style={{ textAlign: "right" }}>
              <label>{"نام کارفرما"}:</label>
            </Col>
            <Col span={19}>
              {" "}
              <Form.Item<FieldType>
                name="name"
                rules={[
                  {
                    required: true,
                    message: "نام کارفرمای پروژه را وارد نمایید",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={5} style={{ textAlign: "right" }}>
              <label>{"عنوان پروژه"}:</label>
            </Col>
            <Col span={19}>
              <Form.Item<FieldType>
                name="description"
                rules={[
                  { required: true, message: "عنوان پروژه را وارد نمایید" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={5} style={{ textAlign: "right" }}>
              <label>{"کد پروژه"}:</label>
            </Col>
            <Col span={19}>
              <Form.Item<FieldType>
                name="code"
                rules={[{ required: true, message: "کد پروژه را وارد نمایید" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={5} style={{ textAlign: "right" }}>
              <label>{"واحد"}:</label>
            </Col>
            <Col span={19}>
              <Form.Item<FieldType>
                name="unit"
                rules={[
                  {
                    required: true,
                    message: "واحد پروژه را انتخاب نمایید",
                  },
                ]}
              >
                <Select
                  options={units.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={5} style={{ textAlign: "right" }}>
              <label>{"تلفن"}:</label>
            </Col>
            <Col span={19}>
              <Form.Item<FieldType> name="cellPhone">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={5} style={{ textAlign: "right" }}>
              <label>{"ایمیل"}:</label>
            </Col>
            <Col span={19}>
              <Form.Item<FieldType> name="email">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.List name="dates">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item {...restField} name={[name, "name"]}>
                      <Input placeholder="نام فاز" />
                    </Form.Item>

                    <Form.Item {...restField} name={[name, "description"]}>
                      <Input placeholder="توضیحات فاز" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "dateRange"]}
                      rules={[
                        { required: true, message: "تاریخ را انتخاب کنید" },
                      ]}
                    >
                      <RangePicker
                        onChange={(_, dateStrings) => {
                          form.setFieldsValue({
                            dates: (form.getFieldValue("dates") || []).map(
                              (item: any, index: number) =>
                                index === name
                                  ? {
                                      ...item,
                                      startDate: dateStrings[0],
                                      endDate: dateStrings[1],
                                    }
                                  : item
                            ),
                          });
                        }}
                      />
                    </Form.Item>

                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    افزودن فاز های پروژه
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          {/* File Upload Section */}

          <Row gutter={[16, 16]}>
            <Col span={7} style={{ textAlign: "right" }}>
              <label>{"بارگذاری فایل‌ها"}:</label>
            </Col>
            <Col span={17}>
              <Form.Item>
                <Upload
                  customRequest={({ file }) => handleUpload(file as File)}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>آپلود فایل</Button>
                </Upload>

                {/* Show uploaded file previews */}
                <List
                  dataSource={uploadedFiles}
                  renderItem={(file) => (
                    <List.Item
                      actions={[
                        <Button
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleRemoveFile(file.id)}
                        />,
                      ]}
                    >
                      {file.url.match(/\.(jpeg|jpg|png|gif)$/i) ? (
                        <Image
                          width={50}
                          height={50}
                          src={file.url}
                          alt="Uploaded file"
                        />
                      ) : (
                        <FileOutlined
                          style={{ fontSize: "30px", color: "#aaa" }}
                        />
                      )}
                      <span style={{ marginLeft: "10px" }}>{file.name}</span>
                    </List.Item>
                  )}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ textAlign: "center" }}>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              style={{ width: "30%", backgroundColor: ColorPalletEnum.Primary }}
            >
              ثبت پروژه
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  );
};

export default ProjectCreationPage;
