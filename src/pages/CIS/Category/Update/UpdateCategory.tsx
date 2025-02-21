import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Flex,
  CascaderProps,
  Cascader,
  Select,
} from "antd";
import { useParams } from "react-router-dom";
import { BACKEND_ROUTES, setId } from "../../../../shared/backendRoutes";
import { IBaseBackendResponse } from "../../../../shared/interfaces/base-backend-response.interface";
import apiClient from "../../../../configs/axios.config";
import { AxiosResponse } from "axios";
import { updateCategory } from "./functions/updateCategory.function";
import { ColorPalletEnum } from "../../../../shared/enums/colorPallet.enum";

interface ICategory {
  id: number;
  name: string;
  cisId: string | number;
  parentId: string | number;
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
interface ICategorizedListResponse
  extends IBaseBackendResponse<ICategorizedList[]> {}
interface IPIDOption {
  label: string;
  value: number;
  children: IPIDOption[];
}
interface ICISOption {
  label: string;
  value: number;
}
interface ICIS {
  id: number;
  name: string;
  version: string;
}
interface ICISResponse extends IBaseBackendResponse<ICIS[]> {}

const { method: cisMethod, url: cisUrl } = BACKEND_ROUTES.cis.list;
const { method: categoryMethod, url: categoryUrl } =
  BACKEND_ROUTES.category.categorizedlist;
const { method, url } = BACKEND_ROUTES.category.info;
const UpdateCategoryPage: React.FC = () => {
  const { id } = useParams();
  const [form] = Form.useForm();

  const [pid, setPid] = React.useState<number>();
  const [initialData, setInitialData] = useState<Partial<ICategory>>();
  const [pidOptions, setPIDOptions] = React.useState<IPIDOption[]>([]);
  const [cisOptions, setCISOptions] = React.useState<ICISOption[]>([]);
  const [cisId, setCisId] = React.useState<number>();

  const onChange: CascaderProps<IPIDOption>["onChange"] = (value) => {
    if (value.length) {
      setPid(value[value.length - 1]);
    }
  };

  useEffect(() => {
    apiClient[method](setId({ id: id as string, url })).then(
      (response: AxiosResponse<IBaseBackendResponse<ICategory>>) => {
        setInitialData(response.data.data);
      }
    );
  }, [id]);

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

  useEffect(() => {
    form.setFieldsValue(initialData);
  }, [initialData]);

  return (
    <>
      <Flex justify="center" align="center" style={{ marginTop: "9rem" }}>
        <Card
          title={
            <Flex align="center" justify="center">
              <img
                src="/douranLogo.png"
                alt="Logo"
                style={{
                  width: "50px",
                  height: "50px",
                  marginRight: "10px",
                }}
              />
              <span style={{ fontSize: "30px", fontWeight: "bold" }}>
                ویرایش دسته بندی{" "}
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
            name="updateCategoryForm"
            size="large"
            style={{ maxWidth: 500, width: "100%" }}
            onFinish={async (values) => {
              const response = await updateCategory({
                id,
                ...values,
                cisId: cisId,
                parentId: pid,
              });

              if (response.result) {
                message.success(response.message);
              } else {
                message.error(response.message);
              }
            }}
          >
            <Form.Item
              name={"name"}
              label="نام"
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
              initialValue={
                initialData?.cisId
                  ? (cisOptions || []).find(
                      (item) => item.value === initialData?.cisId
                    )?.label
                  : undefined
              }
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
              name="parentId"
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
                ویرایش دسته بندی
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Flex>
    </>
  );
};

export default UpdateCategoryPage;
