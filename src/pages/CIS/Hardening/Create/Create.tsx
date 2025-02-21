import React, { useEffect } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Flex,
  Cascader,
  CascaderProps,
} from "antd";
import { createHardening } from "./functions/create.function";
import apiClient from "../../../../configs/axios.config";
import { AxiosResponse } from "axios";
import { BACKEND_ROUTES } from "../../../../shared/backendRoutes";
import { IBaseBackendResponse } from "../../../../shared/interfaces/base-backend-response.interface";
import { ColorPalletEnum } from "../../../../shared/enums/colorPallet.enum";
const { method: categoryMethod, url: categoryUrl } =
  BACKEND_ROUTES.category.categorizedlist;
interface ICategorizedList {
  id: number;
  name: string;
  categories: {
    id: number;
    name: string;
    parentId: number | undefined;
  }[];
}
interface IPIDOption {
  label: string;
  value: number;
  children: IPIDOption[];
}
interface ICategorizedListResponse
  extends IBaseBackendResponse<ICategorizedList[]> {}
const CreateHardeningPage: React.FC = () => {
  const [form] = Form.useForm();
  const [pidOptions, setPIDOptions] = React.useState<IPIDOption[]>([]);
  const [categoryId, setCategoryId] = React.useState<number>();

  const onChange: CascaderProps<IPIDOption>["onChange"] = (value) => {
    if (value.length) {
      setCategoryId(value[value.length - 1]);
    }
  };
  useEffect(() => {
    apiClient[categoryMethod](categoryUrl).then(
      (res: AxiosResponse<ICategorizedListResponse>) => {
        const list = res.data.data!;
        const setMe = list.map((item) => {
          return {
            label: item.name,
            value: item.id,
            children:
              item.categories?.map((el) => {
                return { label: el.name, value: el.id };
              }) || [],
          };
        });

        setPIDOptions(setMe as unknown as IPIDOption[]);
      }
    );
  }, []);
  return (
    <>
      <Flex justify="center" align="center" style={{ marginTop: "10rem" }}>
        <Card
          title={
            <Flex align="center" justify="center">
              <img
                src="/douranLogo.png" // Update this with your logo path
                alt="Logo"
                style={{
                  width: "50px",
                  height: "50px",
                  marginRight: "10px",
                }}
              />
              <span style={{ fontSize: "30px", fontWeight: "bold" }}>
                تعریف هاردنینگ جدید
              </span>
            </Flex>
          }
          bordered={false}
          style={{
            width: 500,
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Form
            form={form}
            name="HardeningCreationForm"
            size="large"
            style={{ maxWidth: 500, width: "100%" }}
            onFinish={async (values) => {
              const response = await createHardening({ ...values, categoryId });
              console.log({ response });
              if (response.result) {
                message.success(response.message);
                form.resetFields();
              } else {
                message.error(response.message);
                form.resetFields();
              }
            }}
          >
            <Form.Item
              label="عنوان"
              name="title"
              wrapperCol={{ offset: 2, span: 22 }}
              rules={[
                { required: true, message: "عنوان هاردنینگ را وارد کنید" },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label="توضیحات"
              name="description"
              wrapperCol={{ offset: 2, span: 22 }}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label="ممیزی"
              name="audit"
              wrapperCol={{ offset: 2, span: 22 }}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label="دستور"
              name="command"
              wrapperCol={{ offset: 2, span: 22 }}
              rules={[
                { required: true, message: "دستور هاردنینگ را وارد کنید" },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label="پیشنهادات"
              name="recommendations"
              wrapperCol={{ offset: 2, span: 22 }}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label="رجکس"
              name="regexPattern"
              wrapperCol={{ offset: 2, span: 22 }}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label="دسته بندی"
              name="categoryId"
              wrapperCol={{ offset: 2, span: 22 }}
            >
              <Cascader onChange={onChange} options={pidOptions} />{" "}
            </Form.Item>

            <div style={{ marginBottom: "2rem" }}></div>

            <Form.Item style={{ textAlign: "center" }}>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                style={{ width: "30%", backgroundColor: ColorPalletEnum.Primary }}
              >
                ثبت هاردنینگ{" "}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Flex>
    </>
  );
};

export default CreateHardeningPage;
