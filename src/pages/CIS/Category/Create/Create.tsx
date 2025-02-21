import React, { useEffect } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Flex,
  Select,
  Cascader,
} from "antd";
import { createCategory } from "./functions/create.function";
import apiClient from "../../../../configs/axios.config";
import { BACKEND_ROUTES } from "../../../../shared/backendRoutes";
import { IBaseBackendResponse } from "../../../../shared/interfaces/base-backend-response.interface";
import { AxiosResponse } from "axios";
import type { CascaderProps } from "antd";
import { ColorPalletEnum } from "../../../../shared/enums/colorPallet.enum";

interface ICIS {
  id: number;
  name: string;
  version: string;
}
interface ICategorizedList {
  id: number;
  name: string;
  categories: {
    id: number;
    name: string;
    parentId: number | undefined;
  }[];
}
interface ICISOption {
  label: string;
  value: number;
}
interface IPIDOption {
  label: string;
  value: number;
  children: IPIDOption[];
}

const { method: cisMethod, url: cisUrl } = BACKEND_ROUTES.cis.list;
const { method: categoryMethod, url: categoryUrl } =
  BACKEND_ROUTES.category.categorizedlist;

interface ICISResponse extends IBaseBackendResponse<ICIS[]> {}
interface ICategorizedListResponse
  extends IBaseBackendResponse<ICategorizedList[]> {}

const CategoryCreationPage: React.FC = () => {
  const [form] = Form.useForm();
  const [cisOptions, setCISOptions] = React.useState<ICISOption[]>([]);
  const [pidOptions, setPIDOptions] = React.useState<IPIDOption[]>([]);
  const [cisId, setCisId] = React.useState<number>();
  const [pid, setPid] = React.useState<number>();

  const onChange: CascaderProps<IPIDOption>["onChange"] = (value) => {
    if (value.length) {
      setPid(value[value.length - 1]);
    }
  };
  useEffect(() => {
    apiClient[cisMethod](cisUrl).then((res: AxiosResponse<ICISResponse>) => {
      const list = res.data.data!;
      setCISOptions(
        list.map((item) => ({
          label: item.name,
          value: item.id,
        }))
      );
    });

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
      <Flex justify="center" align="center" style={{ marginTop: "100px" }}>
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
                تعریف دسته بندی جدید
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
            name="CategoryCreationForm"
            size="large"
            style={{ maxWidth: 500, width: "100%" }}
            onFinish={async (values) => {
              const response = await createCategory({
                ...values,
                cisId: cisId,
                parentId: pid,
              });

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
              label="نام"
              name="name"
              wrapperCol={{ offset: 4, span: 20 }}
              rules={[
                { required: true, message: "نام دسته بندی را وارد کنید" },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label="سی آی اس"
              name="cisId"
              wrapperCol={{ offset: 3, span: 21 }}
              // rules={[
              //   {
              //     required: true,
              //     message: "سی آی اس را انتخاب کنید",
              //   },
              // ]}
            >
              <Select
                onChange={(value: number) => {
                  setCisId(value);
                }}
                options={cisOptions}
              />{" "}
            </Form.Item>

            <Form.Item
              label="دسته بندی والد"
              name="pid"
              wrapperCol={{ offset: 2, span: 22 }}
              // rules={[
              //   {
              //     required: false,
              //     message: "دسته بندی والد را انتخاب کنید",
              //   },
              // ]}
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
                ثبت دسته بندی{" "}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Flex>
    </>
  );
};

export default CategoryCreationPage;
