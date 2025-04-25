import React, { useEffect, useState } from "react";
import { Button, Modal, Descriptions, Typography, Card, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import apiClient from "@/configs/axios.config";

const { Text } = Typography;

interface IProps {
  perviousTask: {
    doneBy: { username: string };
    textMessage?: string;
  };
}

export const ViewFormsButton: React.FC<IProps> = ({ taskId }) => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState<DataType[]>([]);

  useEffect(() => {
    apiClient
      .get(`/workflow-task/show-filled-forms/${taskId.id}`)
      .then((res) => {
        setFormData(res.data.data);
      });
  }, []);

  const showModal = () => {
    setVisible(true);
  };

  const handleDownloadAllFiles = async () => {
    const filesItem = formData[0].cases[0].data.find(
      (item) => item.key == "files"
    );
    const fileIds = filesItem?.value || [];

    for (const fileId of fileIds) {
      try {
        const response = await apiClient.get(`/file/byid/${fileId}`, {
          responseType: "blob",
        });

        const fileName =
          response.headers["content-disposition"]
            ?.split("filename=")[1]
            ?.replace(/"/g, "") ||
          `file-${fileId}.${response.data.type.split("/")[1]}`;

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error(`خطا در دانلود فایل ${fileId}`, error);
      }
    }
  };

  const renderValue = (data) => {
    if (data.key === "files") {
      return (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleDownloadAllFiles();
          }}
          className="text-blue-600 underline cursor-pointer"
        >
          دانلود همه فایل‌ها
        </a>
      );
    }

    return data.value;
  };

  return (
    <>
      <Tooltip title="جزییات مرحله قبل">
        <Button type="default" icon={<EyeOutlined />} onClick={showModal} />
      </Tooltip>

      <Modal
        style={{ direction: "rtl" }}
        title="فرم های نمایشی"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={800}
      >
        {formData.map((form, index) => (
          <div key={index} style={{ display: "flex", gap: "20px" }}>
            <Card style={{ flex: 1, background: "#f9f9f9" }}>
              <Text strong>{form.title}</Text>

              <Descriptions bordered column={1} size="small">
                {form.cases[0].data.map((data, index) => {
                  if (data.value.length > 0) {
                    return (
                      <Descriptions.Item key={index} label={data.label}>
                        {renderValue(data)}
                      </Descriptions.Item>
                    );
                  }
                })}
              </Descriptions>
            </Card>
          </div>
        ))}
      </Modal>
    </>
  );
};

[
  {
    key: "name",
    value: "foo",
    label: "نام",
  },
  {
    key: "code",
    value: "12345",
    label: "کد",
  },
  {
    key: "files",
    value: ["680b3f59673ea30a4676a96e"],
    label: "فایل های مروبطه",
  },
  {
    key: "status",
    value: "active",
    label: "وضعیت",
  },
  {
    key: "unit",
    value: "6808fc0e673ea30a4676a309",
    label: "واحد",
  },
  {
    key: "dates",
    value: [],
    label: "تاریخ",
  },
];
