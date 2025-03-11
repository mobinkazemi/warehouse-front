import React, { useEffect, useState } from "react";
import { Button, Modal, Typography, Tooltip, Form, Input } from "antd";
import { FormOutlined } from "@ant-design/icons";
import { IForm } from "../../../Workflow/create/functions/form-fields-modal.function";

interface IProps {
  id: IForm;
  fields: {
    id: string;
    required: boolean;
  }[];
}

export const FormModalButton: React.FC<IProps> = (data: IProps) => {
  const [form] = Form.useForm();
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

  return (
    <>
      <Tooltip title="فرم مربوطه">
        <Button type="default" icon={<FormOutlined />} onClick={showModal} />
      </Tooltip>
      <Modal
        style={{ direction: "rtl" }}
        title={data?.id?.name}
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={800}
      >
        <Form form={form}>
          {data?.id?.fields
            .filter((f) => {
              console.log(f.id, selectedFields?.has(f.id), f.label);
              return selectedFields?.has(f.id);
            })
            .map((f) => {
              return (
                <Form.Item label={f.label}>
                  <Input />
                </Form.Item>
              );
            })}
        </Form>
      </Modal>
    </>
  );
};
