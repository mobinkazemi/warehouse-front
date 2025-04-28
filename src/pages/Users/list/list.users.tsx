import React, { useEffect, useState } from "react";
import {
  Spin,
  Space,
  Flex,
  Card,
  Form,
  Input,
  message,
  Button as ButtonAnt,
  Row,
  Col,
} from "antd";
import { DeleteButton } from "./parts/DeleteButton";
import { EditButton } from "./parts/EditButton";
import apiClient from "../../../configs/axios.config";
import { BACKEND_ROUTES } from "../../../shared/backendRoutes";
import { timestampToJalali } from "../../../shared/functions/timestamp-to-jalali.function";
import { motion } from "framer-motion";
import { User, Calendar, AtSign, Phone, UserCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createUser } from "../create/functions/create.user.function";
import type { FormProps } from "antd";
import { ColorPalletEnum } from "../../../shared/enums/colorPallet.enum";

type FieldType = {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
};

interface DataType {
  id: React.Key;
  username: string;
  fullName: string;
  email: string;
  mobile: string;
  roles: Array<{ name: string }>;
  createdAt: number;
}

const { url: listUrl, method: listMethod } = BACKEND_ROUTES.user.list;

const UsersListPage: React.FC = () => {
  const [usersListData, setUsersListData] = useState<DataType[]>([]);
  const [deletedUser, setDeletedUser] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const response = await createUser(values);

    if (response.result) {
      message.success(response.message);

      // setTimeout(() => {
      //   navigator(ROUTES_ENUM.USERS_LIST);
      //   window.location.reload();
      // }, 1000);
    } else {
      message.error(response.message);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    setLoading(true);
    apiClient[listMethod](listUrl)
      .then(({ data }) => {
        setUsersListData(
          data.data.map((sw: any) => ({
            ...sw,
          }))
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Filter out deleted users
  const filteredUsers = usersListData.filter(
    (item) => deletedUser.indexOf(item.id as number) === -1
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spin size="large" tip="در حال بارگذاری..." />
      </div>
    );
  }

  if (filteredUsers.length === 0) {
    return (
      <>
        <div className="flex mb-8 items-center justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-3xl">مدیریت کاربران</h2>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <button className="inline-flex items-center rounded-md bg-[#FE7E05] px-3 py-2 text-sm text-white shadow-xs">
                ایجاد کاربر
              </button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>ایجاد کاربر</DialogTitle>
              </DialogHeader>

              <Form
                name="register"
                labelCol={{}}
                wrapperCol={{}}
                style={{ maxWidth: 500, width: "100%" }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item<FieldType>
                  label="نام"
                  name="fullName"
                  // wrapperCol={{ offset: 4, span: 20 }}
                  rules={[
                    {
                      required: true,
                      message: "نام و نام خانوادگی خود را وارد نمایید",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item<FieldType>
                  label="نام کاربری"
                  name="username"
                  // wrapperCol={{ offset: 1, span: 23 }}
                  rules={[
                    {
                      required: true,
                      message: "نام کاربری خود را وارد نمایید",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item<FieldType>
                  label="گذرواژه"
                  name="password"
                  // wrapperCol={{ offset: 2, span: 22 }}
                  rules={[
                    { required: true, message: "گذرواژه خود را وارد نمایید" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item<FieldType>
                  label="تکرار گذرواژه"
                  name="confirmPassword"
                  // wrapperCol={{ offset: 0, span: 24 }}
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "گذرواژه خود را مجددا وارد نمایید",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("گذرواژه و تکرار گذرواژه یکسان نیستند!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item style={{ textAlign: "center" }}>
                  <ButtonAnt
                    size="large"
                    type="primary"
                    htmlType="submit"
                    style={{
                      width: "30%",
                      backgroundColor: ColorPalletEnum.Primary,
                    }}
                  >
                    ثبت کاربر{" "}
                  </ButtonAnt>
                </Form.Item>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col items-center justify-center h-96 text-gray-500">
          <User className="h-16 w-16 mb-4 text-[#FE7E05]" />
          <p className="text-lg font-medium">هیچ کاربری یافت نشد</p>
          <p className="text-sm mt-2">لطفا کاربر جدیدی ایجاد کنید</p>
        </div>
      </>
    );
  }

  return (
    <div className="p-4 rtl">
      <div className="flex mb-8 items-center justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-3xl">مدیریت کاربران</h2>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <button className="inline-flex items-center rounded-md bg-[#FE7E05] px-3 py-2 text-sm text-white shadow-xs">
              ایجاد کاربر
            </button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>ایجاد کاربر</DialogTitle>
            </DialogHeader>

            <Form
              name="register"
              labelCol={{}}
              wrapperCol={{}}
              style={{ maxWidth: 500, width: "100%" }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                label="نام"
                name="fullName"
                // wrapperCol={{ offset: 4, span: 20 }}
                rules={[
                  {
                    required: true,
                    message: "نام و نام خانوادگی خود را وارد نمایید",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="نام کاربری"
                name="username"
                // wrapperCol={{ offset: 1, span: 23 }}
                rules={[
                  {
                    required: true,
                    message: "نام کاربری خود را وارد نمایید",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="گذرواژه"
                name="password"
                // wrapperCol={{ offset: 2, span: 22 }}
                rules={[
                  { required: true, message: "گذرواژه خود را وارد نمایید" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item<FieldType>
                label="تکرار گذرواژه"
                name="confirmPassword"
                // wrapperCol={{ offset: 0, span: 24 }}
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "گذرواژه خود را مجددا وارد نمایید",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("گذرواژه و تکرار گذرواژه یکسان نیستند!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item style={{ textAlign: "center" }}>
                <ButtonAnt
                  size="large"
                  type="primary"
                  htmlType="submit"
                  style={{
                    width: "30%",
                    backgroundColor: ColorPalletEnum.Primary,
                  }}
                >
                  ثبت کاربر{" "}
                </ButtonAnt>
              </Form.Item>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <motion.table
            className="min-w-full divide-y divide-gray-200"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  نام و نام خانوادگی
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  نام کاربری
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ایمیل
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  شماره موبایل
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  نقش کاربری
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  تاریخ ثبت نام
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  اقدامات
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  variants={item}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-[#FE7E05]/10 rounded-full flex items-center justify-center">
                        <User size={16} className="text-[#FE7E05]" />
                      </div>
                      <div className="mr-3">
                        <div className="text-sm font-medium text-gray-900">
                          {user.fullName || "--"}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm text-gray-700">
                        {user.username || "--"}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <AtSign size={16} className="ml-2 text-[#FE7E05]" />
                      <div className="text-sm text-gray-700">
                        {user.email || "--"}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Phone size={16} className="ml-2 text-[#FE7E05]" />
                      <div className="text-sm text-gray-700">
                        {user.phoneNumber || "--"}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <UserCheck size={16} className="ml-2 text-[#FE7E05]" />
                      <span className="px-2.5 py-0.5 text-xs font-medium bg-[#FE7E05]/10 text-[#FE7E05] rounded-full">
                        {user.roles[0]?.name || "ندارد"}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar size={16} className="ml-2 text-[#FE7E05]" />
                      <div className="text-sm text-gray-700">
                        {new Date(user.createdAt).toLocaleString("fa-IR")}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-2 space-x-reverse">
                      <motion.div
                        className="ml-2"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <EditButton userId={user.id} />
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <DeleteButton
                          userId={user.id}
                          setDeletedUser={setDeletedUser}
                          deletedUser={deletedUser}
                        />
                      </motion.div>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </div>
      </div>
    </div>
  );
};

export default UsersListPage;
