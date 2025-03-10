import React, { useState } from "react";
import { Button, Modal, Descriptions, Typography, Card, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface IProps {
  perviousTask: {
    doneBy: { username: string };
    textMessage?: string;
  };
}

export const ViewDetailsButton: React.FC<IProps> = ({ perviousTask }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  return (
    <>
      <Tooltip title="جزییات مرحله قبل">
        <Button type="default" icon={<EyeOutlined />} onClick={showModal} />
      </Tooltip>
      <Modal
        style={{ direction: "rtl" }}
        title="جزئیات مرحله قبل"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={800}
      >
        {
          <div style={{ display: "flex", gap: "20px" }}>
            <Card style={{ flex: 1, background: "#f9f9f9" }}>
              <Text strong>اطلاعات مرحله قبل</Text>
              <Descriptions bordered column={1} size="small">
                <Descriptions.Item label="نام کاربر">
                  {perviousTask?.doneBy?.username}
                </Descriptions.Item>
                <Descriptions.Item label="توضیحات">
                  {perviousTask?.textMessage}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </div>
        }
      </Modal>
    </>
  );
};
