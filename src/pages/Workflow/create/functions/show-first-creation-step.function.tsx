import {
  Card,
  Form,
  Input,
  Row,
  Col,
  Button,
  Space,
  Flex,
  List,
  Upload,
  Image,
  message,
  Select,
} from "antd";
import { ColorPalletEnum } from "../../../../shared/enums/colorPallet.enum";
import { useEffect, useState } from "react";
import apiClient from "../../../../configs/axios.config";
import { BACKEND_ROUTES } from "../../../../shared/backendRoutes";

interface IProps {
  onFinish: (values: any) => void;
}
interface IRole {
  id: string;
  name: string;
}
interface IFieldType {
  name: string;
  starterRoles: string[];
}

const { url: roleListUrl, method: roleListMethod } = BACKEND_ROUTES.role.list;

export const ShowFirstCreationStep: React.FC<IProps> = ({ onFinish }) => {
  const [form] = Form.useForm();
  const [roles, setRoles] = useState<IRole[]>([]);

  useEffect(() => {
    apiClient[roleListMethod](roleListUrl)
      .then((item) => {
        setRoles(item.data.data);
      })
      .catch(() => {
        message.error("لیست نقش ها دریافت نشد");
      });
  }, []);

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
              ثبت فرایند
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
          form={form}
          name="create-workflow"
          style={{ maxWidth: 500, width: "100%" }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={[16, 16]}>
            <Col span={5} style={{ textAlign: "right" }}>
              <label>{"نام فرایند"}:</label>
            </Col>
            <Col span={19}>
              {" "}
              <Form.Item<IFieldType>
                name="name"
                rules={[
                  {
                    required: true,
                    message: "نام فرایند را وارد نمایید",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={5} style={{ textAlign: "right" }}>
              <label>{"نقش های شروع کننده"}:</label>
            </Col>
            <Col span={19}>
              <Form.Item<IFieldType> name="starterRoles">
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="نقش های شروع کننده را انتخاب کنید"
                  onChange={(value) => {
                    console.log(value);
                  }}
                  options={roles.map((item) => {
                    return {
                      label: item.name,
                      value: item.id,
                    };
                  })}
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
              ثبت فرایند
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  );
};
