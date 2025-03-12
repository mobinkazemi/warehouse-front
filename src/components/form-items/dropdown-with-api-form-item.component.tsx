import { Form, message, Select } from "antd";
import { IFormField } from "../../pages/Workflow/create/functions/form-fields-modal.function";
import { useEffect, useState } from "react";
import apiClient from "../../configs/axios.config";

export const FormGeneratorDropdownWithApiFormItem: React.FC<IFormField> = (
  data: IFormField
) => {
  const [dropdownData, setDropdownData] = useState<any[]>([]);

  useEffect(() => {
    if (data.relatedInstanceApi) {
      apiClient[data.relatedInstanceApi.method](data.relatedInstanceApi.url)
        .then((res) => {
          setDropdownData(res.data.data);
        })
        .catch((err) => {
          message.error(err.response.data.message);
        });
    }
  }, [data.relatedInstanceApi]);
  return (
    <Form.Item name={data.name}>
      <Select
        showSearch
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={dropdownData.map((el) => {
          return { label: el.name, value: el.id };
        })}
      />{" "}
    </Form.Item>
  );
};
