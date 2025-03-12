import {
  Form,
  Input,
  Space,
  DatePicker,
  FormInstance,
  Upload,
  message,
  List,
  Image,
} from "antd";
import {
  DeleteOutlined,
  FileOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import apiClient from "../../configs/axios.config";
import { useState } from "react";

interface IProps {
  //   form: FormInstance;
  //   key: string;
  //   componentName: string;
  //   componentLabel: string;
  //   namePlaceholder?: string;
  //   descriptionPlaceholder?: string;
  //   nameName?: string;
  //   descriptionName?: string;
  //   buttonLabel?: string;
}

const defaultValues: Omit<IProps, "form" | "key"> = {
  //   componentName: "dates",
  //   componentLabel: "فاز ها",
  //   namePlaceholder: "نام فاز",
  //   descriptionPlaceholder: "توضیحات فاز",
  //   nameName: "name",
  //   descriptionName: "description",
  //   buttonLabel: "افزودن فاز های پروژه",
};

interface UploadedFile {
  id: string;
  url: string;
  name: string;
}
export const FormGeneratorFileListFormItem: React.FC<IProps> = (
  data: IProps
) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const handleRemoveFile = (fileId: string) => {
    setUploadedFiles((prev: any) =>
      prev.filter((file: any) => file.id !== fileId)
    );
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
        setUploadedFiles((prev: any) => [...prev, newFile]);
        message.success(`فایل بارگزاری شد: ${file.name}`);
      }
    } catch (error) {
      message.error("File upload failed.");
    }
  };
  return (
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
    </Form.Item>
  );
};
