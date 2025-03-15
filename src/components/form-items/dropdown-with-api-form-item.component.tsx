import { FormInstance, message, Select } from "antd";
import { IFormField } from "../../pages/Workflow/create/functions/form-fields-modal.function";
import { useEffect, useState } from "react";
import apiClient from "../../configs/axios.config";

interface IProps {
  value?: string; // Form.Item will pass this automatically
  onChange?: (value: string) => void; // Form.Item will pass this automatically
  data: IFormField;
}

export const FormGeneratorDropdownWithApiFormItem: React.FC<IProps> = ({
  data,
  value,
  onChange,
}: IProps) => {
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
    <Select
      showSearch
      placeholder={"انتخاب کنید"}
      value={value}
      onChange={onChange}
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      options={dropdownData.map((el) => {
        return { label: el.name, value: el.id };
      })}
    />
  );
};
