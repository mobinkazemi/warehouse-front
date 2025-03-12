import { Form, Input, Space, DatePicker, FormInstance } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

interface IProps {
  form: FormInstance;
  key: string;
  componentName: string;
  componentLabel: string;

  namePlaceholder?: string;
  descriptionPlaceholder?: string;

  nameName?: string;
  descriptionName?: string;

  buttonLabel?: string;
}

const { RangePicker } = DatePicker;

const defaultValues: Omit<IProps, "form" | "key"> = {
  componentName: "dates",
  componentLabel: "فاز ها",

  namePlaceholder: "نام فاز",
  descriptionPlaceholder: "توضیحات فاز",

  nameName: "name",
  descriptionName: "description",

  buttonLabel: "افزودن فاز های پروژه",
};

export const FormGeneratorDateListFormItem: React.FC<IProps> = (
  data: IProps
) => {
  return (
    <Form.List name={data.componentName}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space
              key={key}
              style={{ display: "flex", marginBottom: 8 }}
              align="baseline"
            >
              <Form.Item {...restField} name={[name, "name"]}>
                <Input
                  placeholder={
                    data.namePlaceholder || defaultValues.namePlaceholder
                  }
                />
              </Form.Item>

              <Form.Item {...restField} name={[name, "description"]}>
                <Input
                  placeholder={
                    data.descriptionPlaceholder ||
                    defaultValues.descriptionPlaceholder
                  }
                />
              </Form.Item>

              <Form.Item
                {...restField}
                name={[name, "dateRange"]}
                rules={[{ required: true, message: "تاریخ را انتخاب کنید" }]}
              >
                <RangePicker
                  onChange={(_, dateStrings) => {
                    data.form.setFieldsValue({
                      [data.componentName]: (
                        data.form.getFieldValue(data.componentName) || []
                      ).map((item: any, index: number) =>
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
              {data.buttonLabel || defaultValues.buttonLabel}
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};
