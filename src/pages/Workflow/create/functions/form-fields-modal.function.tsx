import React, { useEffect, useState } from "react";
import { Modal, Checkbox, List, Button, Flex } from "antd";

export enum FormFieldTypeEnum {
  TEXT = "text",
  EMAIL = "email",
  PASSWORD = "password",
  NUMBER = "number",
  SELECT = "select",
  SELECT_MULTIPLE = "select-multiple",
  RADIO = "radio",
  CHECKBOX = "checkbox",
  DATE = "date",
  FILE = "file",
  FORM = "form",
}

export interface IFormField {
  label: string;
  name: string;
  type: FormFieldTypeEnum;
  required: boolean;
  // relatedForms: [];
  relatedInstanceApi?: {
    method: "get";
    url: string;
  };
  id: string;
}
export interface IForm {
  id: string;
  name: string;
  refrence: string;
  type: "create" | "update";
  fields: IFormField[];
}
interface IProps {
  visible: boolean;
  form: IForm;
  onClose: () => void;
  onSave: (updatedFields: any) => void;
}

type FieldType = {
  id: string;
  label: string;
  required: boolean;
  selected: boolean;
  originalRequired: boolean;
};

const FormFieldModal: React.FC<IProps> = ({
  visible,
  form,
  onClose,
  onSave,
}) => {
  const [fields, setFields] = useState<FieldType[] | undefined>(undefined);

  useEffect(() => {
    if (form) {
      setFields(
        form.fields.map((field) => ({
          ...field,
          selected: true, // All fields start as selected
          originalRequired: field.required, // Store original required state
        }))
      );
    }
  }, [form]);

  const handleSave = () => {
    onSave(
      (fields as FieldType[])
        ?.filter((field) => field.selected) // Keep selected fields
        ?.map(({ id, required }) => ({ id, required }))
    );
    onClose();
  };

  return (
    <Modal
      title="فرم مربوطه را تعریف کنید"
      style={{ textAlign: "center" }}
      open={visible}
      onCancel={onClose}
      footer={[
        // <Button key="cancel" onClick={onClose}>
        //   انصراف
        // </Button>,
        <Flex justify="center">
          <Button
            style={{ textAlign: "center" }}
            key="save"
            type="primary"
            onClick={handleSave}
          >
            ذخیره فرم
          </Button>
        </Flex>,
      ]}
    >
      <List
        dataSource={fields}
        renderItem={(field) => (
          <List.Item>
            {/* Checkbox to select/deselect the field */}
            <Checkbox
              disabled={field.originalRequired} // Disable if originally required
              checked={field.selected}
              onChange={(e) => {
                setFields((prev) =>
                  prev?.map((f) =>
                    f.id === field.id ? { ...f, selected: e.target.checked } : f
                  )
                );
              }}
            >
              {field.label}
            </Checkbox>

            {/* Checkbox to mark as required (if originally optional) */}
            {!field.originalRequired && (
              <Checkbox
                checked={field.required}
                onChange={(e) => {
                  setFields((prev) =>
                    prev?.map((f) =>
                      f.id === field.id
                        ? { ...f, required: e.target.checked }
                        : f
                    )
                  );
                }}
              >
                الزامی باشد
              </Checkbox>
            )}
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default FormFieldModal;
