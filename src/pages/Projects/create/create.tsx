// // import React from "react";
// // import type { FormProps } from "antd";
// // import { Button, Card, Form, Input, message, Flex } from "antd";
// // import { useNavigate } from "react-router-dom";
// // import { ROUTES_ENUM } from "../../../shared/enums/routes.enum";
// // import { ColorPalletEnum } from "../../../shared/enums/colorPallet.enum";
// // import { createProject } from "./functions/create.project.function";

// // type FieldType = {
// //   name: string;
// //   description: string;
// //   code: string;
// // };

// // const ProjectCreationPage: React.FC = () => {
// //   const navigator = useNavigate();

// //   const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
// //     const response = await createProject(values);

// //     if (response.result) {
// //       message.success(response.message);

// //       setTimeout(() => {
// //         navigator(ROUTES_ENUM.PROJECTS_LIST);
// //         window.location.reload();
// //       }, 1000);
// //     } else {
// //       message.error(response.message);
// //     }
// //   };

// //   const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
// //     errorInfo
// //   ) => {
// //     console.log("Failed:", errorInfo);
// //   };

// //   return (
// //     <>
// //       <Flex justify="center" align="center" style={{ marginTop: "5rem" }}>
// //         <Card
// //           title={
// //             <Flex align="center" justify="center">
// //               <img
// //                 src="/douranLogo.png" // Update this with your logo path
// //                 alt="Logo"
// //                 style={{
// //                   width: "50px",
// //                   height: "50px",
// //                   marginRight: "10px",
// //                 }}
// //               />
// //               <span style={{ fontSize: "30px", fontWeight: "bold" }}>
// //                 ثبت پروژه{" "}
// //               </span>
// //             </Flex>
// //           }
// //           bordered={false}
// //           style={{
// //             width: 400,
// //             borderRadius: "10px",
// //             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
// //           }}
// //         >
// //           <Form
// //             name="create-project"
// //             labelCol={{}}
// //             wrapperCol={{}}
// //             style={{ maxWidth: 500, width: "100%" }}
// //             initialValues={{ remember: true }}
// //             onFinish={onFinish}
// //             onFinishFailed={onFinishFailed}
// //             autoComplete="off"
// //           >
// //             <Form.Item<FieldType>
// //               label="نام"
// //               name="name"
// //               wrapperCol={{ offset: 4, span: 20 }}
// //               rules={[{ required: true, message: "نام پروژه را وارد نمایید" }]}
// //             >
// //               <Input />
// //             </Form.Item>

// //             <Form.Item<FieldType>
// //               label="توضیحات"
// //               name="description"
// //               wrapperCol={{ offset: 4, span: 20 }}
// //               rules={[
// //                 { required: true, message: "توضیحات پروژه را وارد نمایید" },
// //               ]}
// //             >
// //               <Input />
// //             </Form.Item>

// //             <Form.Item<FieldType>
// //               label="کد"
// //               name="code"
// //               wrapperCol={{ offset: 4, span: 20 }}
// //               rules={[{ required: true, message: "کد پروژه را وارد نمایید" }]}
// //             >
// //               <Input />
// //             </Form.Item>

// //             <div style={{ marginBottom: "2rem" }}></div>

// //             <Form.Item style={{ textAlign: "center" }}>
// //               <Button
// //                 size="large"
// //                 type="primary"
// //                 htmlType="submit"
// //                 style={{
// //                   width: "30%",
// //                   backgroundColor: ColorPalletEnum.Primary,
// //                 }}
// //               >
// //                 ثبت پروژه{" "}
// //               </Button>
// //             </Form.Item>
// //           </Form>
// //         </Card>
// //       </Flex>
// //     </>
// //   );
// // };

// // export default ProjectCreationPage;
// import React, { useState } from "react";
// import type { FormProps } from "antd";
// import { Button, Card, Form, Input, message, Flex, Upload } from "antd";
// import { useNavigate } from "react-router-dom";
// import { ROUTES_ENUM } from "../../../shared/enums/routes.enum";
// import { ColorPalletEnum } from "../../../shared/enums/colorPallet.enum";
// import { createProject } from "./functions/create.project.function";
// import { UploadOutlined } from "@ant-design/icons";
// import apiClient from "../../../configs/axios.config"; // Your Axios instance

// type FieldType = {
//   name: string;
//   description: string;
//   code: string;
//   files: string[]; // Array to store uploaded file IDs
// };

// const ProjectCreationPage: React.FC = () => {
//   const [uploadedFileIds, setUploadedFileIds] = useState<string[]>([]);
//   const navigator = useNavigate();

//   // Handle file upload
//   const handleUpload = async (file: File) => {
//     const formData = new FormData();
//     formData.append("files", file);

//     try {
//       const response = await apiClient.post("/files/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (response.data && response.data.fileId) {
//         setUploadedFileIds((prev) => [...prev, response.data.fileId]);
//         message.success(`File uploaded successfully: ${file.name}`);
//       }
//     } catch (error) {
//       message.error("File upload failed.");
//     }
//   };

//   const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
//     const response = await createProject({ ...values, files: uploadedFileIds });

//     if (response.result) {
//       message.success(response.message);
//       setTimeout(() => {
//         navigator(ROUTES_ENUM.PROJECTS_LIST);
//         window.location.reload();
//       }, 1000);
//     } else {
//       message.error(response.message);
//     }
//   };

//   return (
//     <Flex justify="center" align="center" style={{ marginTop: "5rem" }}>
//       <Card
//         title={
//           <Flex align="center" justify="center">
//             <img
//               src="/douranLogo.png"
//               alt="Logo"
//               style={{ width: "50px", height: "50px", marginRight: "10px" }}
//             />
//             <span style={{ fontSize: "30px", fontWeight: "bold" }}>
//               ثبت پروژه
//             </span>
//           </Flex>
//         }
//         bordered={false}
//         style={{
//           width: 400,
//           borderRadius: "10px",
//           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//         }}
//       >
//         <Form
//           name="create-project"
//           style={{ maxWidth: 500, width: "100%" }}
//           onFinish={onFinish}
//           autoComplete="off"
//         >
//           <Form.Item<FieldType>
//             label="نام"
//             name="name"
//             rules={[{ required: true, message: "نام پروژه را وارد نمایید" }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item<FieldType>
//             label="توضیحات"
//             name="description"
//             rules={[
//               { required: true, message: "توضیحات پروژه را وارد نمایید" },
//             ]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item<FieldType>
//             label="کد"
//             name="code"
//             rules={[{ required: true, message: "کد پروژه را وارد نمایید" }]}
//           >
//             <Input />
//           </Form.Item>

//           {/* File Upload Section */}
//           <Form.Item label="بارگذاری فایل‌ها">
//             <Upload
//               customRequest={({ file }) => handleUpload(file as File)}
//               showUploadList={false}
//             >
//               <Button icon={<UploadOutlined />}>آپلود فایل</Button>
//             </Upload>
//           </Form.Item>

//           <Form.Item style={{ textAlign: "center" }}>
//             <Button
//               size="large"
//               type="primary"
//               htmlType="submit"
//               style={{ width: "30%", backgroundColor: ColorPalletEnum.Primary }}
//             >
//               ثبت پروژه
//             </Button>
//           </Form.Item>
//         </Form>
//       </Card>
//     </Flex>
//   );
// };

// export default ProjectCreationPage;
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
} from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES_ENUM } from "../../../shared/enums/routes.enum";
import { ColorPalletEnum } from "../../../shared/enums/colorPallet.enum";
import { createProject } from "./functions/create.project.function";
import {
  UploadOutlined,
  DeleteOutlined,
  FileOutlined,
} from "@ant-design/icons";
import apiClient from "../../../configs/axios.config"; // Your Axios instance
import { BACKEND_ROUTES } from "../../../shared/backendRoutes";
type FieldType = {
  name: string;
  description: string;
  code: string;
  files: string[]; // Array to store uploaded file IDs
  unitId: string;
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
                name="unitId"
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

          {/* File Upload Section */}

          <Row gutter={[16, 16]}>
            <Col span={5} style={{ textAlign: "right" }}>
              <label>{"بارگذاری فایل‌ها"}:</label>
            </Col>
            <Col span={19}>
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
