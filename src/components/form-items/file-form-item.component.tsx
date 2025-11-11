import { Form, Upload, message, List, Image, FormInstance } from "antd";
import {
  DeleteOutlined,
  FileOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import apiClient from "../../configs/axios.config";
import { useState } from "react";

interface UploadedFile {
  id: string;
  url: string;
  name: string;
}

interface IProps {
  form: FormInstance;
  name: string;
}

export const FormGeneratorFileListFormItem: React.FC<IProps> = (
  props: IProps
) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const handleRemoveFile = (fileId: string) => {
    setUploadedFiles((prev: any) =>
      prev.filter((file: any) => file.id !== fileId)
    );
    props.form.setFieldsValue({ [props.name]: [] });
  };

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("files", file);

    try {
      const response = await apiClient.post("/file/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data?.data?.id) {
        const newFile = {
          id: response.data.data.id,
          url: URL.createObjectURL(file), // Temporary preview
          name: file.name,
        };
        const newFiles = [...uploadedFiles, newFile];
        setUploadedFiles((prev: any) => [...prev, newFile]);
        props.form.setFieldsValue({
          [props.name]: newFiles.map((f: any) => f.id),
        });

        message.success(`فایل بارگزاری شد: ${file.name}`);
      }
    } catch (error) {
      message.error("File upload failed.");
    }
  };
  
  return (
    <>
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
            {(file as any).url.match(/\.(jpeg|jpg|png|gif)$/i) ? (
              <Image
                width={50}
                height={50}
                src={(file as any).url}
                alt="Uploaded file"
              />
            ) : (
              <FileOutlined style={{ fontSize: "30px", color: "#aaa" }} />
            )}
            <span style={{ marginLeft: "10px" }}>{(file as any).name}</span>
          </List.Item>
        )}
      />
    </>
  );
};
