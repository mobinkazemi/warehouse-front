import React, { useEffect, useState } from "react";
import type { FormProps } from "antd";
import { Button, Card, Form, Input, message, Flex, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES_ENUM } from "../../../shared/enums/routes.enum";
import { ColorPalletEnum } from "../../../shared/enums/colorPallet.enum";
import { createProduct } from "./functions/create.product.function";
import { productTypesList } from "./poduct.types";
import apiClient from "../../../configs/axios.config";
import { BACKEND_ROUTES } from "../../../shared/backendRoutes";

type FieldType = {
  name: string;
  type: string;
  brand?: string;
  partNumber?: string;
  description?: string;
  serialNumber?: string;
};

interface IProject {
  id: string;
  name: string;
  code: string;
}

const { method: projectListMethod, url: projectListUrl } =
  BACKEND_ROUTES.project.list;
const ProductCreationPage: React.FC = () => {
  const navigator = useNavigate();
  const [projects, setProjects] = useState<IProject[]>();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const response = await createProduct({ ...values });

    if (response.result) {
      message.success(response.message);
      setTimeout(() => {
        navigator(ROUTES_ENUM.PRODUCT_LIST);
        window.location.reload();
      }, 1000);
    } else {
      message.error(response.message);
    }
  };

  useEffect(() => {
    apiClient[projectListMethod](projectListUrl, { params: { limit: 100 } })
      .then((result) => {
        setProjects(
          result.data.data.filter((el: any) => el.status == "active")
        );
      })
      .catch();
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
              ثبت محصول
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
          name="create-product"
          style={{ maxWidth: 500, width: "100%" }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="نام"
            name="name"
            rules={[{ required: true, message: "نام محصول را وارد نمایید" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="برند"
            name="brand"
            rules={[{ required: true, message: "برند محصول را وارد نمایید" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="پارت نامبر"
            name="partNumber"
            rules={[
              { required: true, message: "پارت نامبر محصول را وارد نمایید" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="سریال نامبر"
            name="serialNumber"
            // rules={[
            //   { required: true, message: "سریال نامبر محصول را وارد نمایید" },
            // ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="توضیحات"
            name="description"
            // rules={[
            //   { required: true, message: "توضیحات محصول را وارد نمایید" },
            // ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="نوع"
            name="type"
            rules={[{ required: true, message: "نوع محصول را وارد نمایید" }]}
            style={{ marginBottom: "16px" }}
          >
            {
              <Select
                options={productTypesList.map((el) => {
                  return { label: el, value: el };
                })}
              />
            }
          </Form.Item>

          <Form.Item
            label="پروژه"
            name="code"
            rules={[{ required: true, message: "نوع محصول را وارد نمایید" }]}
            style={{ marginBottom: "16px" }}
          >
            {
              <Select
                options={(projects || []).map((el) => {
                  return {
                    label: `${el.name} با کد ${el.code}`,
                    value: el.code,
                  };
                })}
              />
            }
          </Form.Item>

          <Form.Item style={{ textAlign: "center" }}>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              style={{ width: "30%", backgroundColor: ColorPalletEnum.Primary }}
            >
              ثبت محصول
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  );
};

export default ProductCreationPage;
