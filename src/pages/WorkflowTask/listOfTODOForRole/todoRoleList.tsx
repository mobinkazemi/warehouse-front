import React, { useEffect, useState } from "react";
import { Space, Table, Tooltip } from "antd";
import { AxiosResponse } from "axios";
import { AcceptButton } from "./parts/AcceptButton";
import { RejectButton } from "./parts/rejectButton";
import { BACKEND_ROUTES } from "../../../shared/backendRoutes";
import apiClient from "../../../configs/axios.config";
import { IBaseBackendResponse } from "../../../shared/interfaces/base-backend-response.interface";
import {
  timestampToJalali,
  timestampToJalaliWithMonth,
} from "../../../shared/functions/timestamp-to-jalali.function";
import { ViewDetailsButton } from "./parts/ViewDetailsButton";
import { FormModalButton } from "./parts/formModalButton";
import { IForm } from "../../Workflow/create/functions/form-fields-modal.function";
import { ViewFormsButton } from "./parts/ViewFormsButton";
import { motion } from "framer-motion";
import {
  Barcode,
  Briefcase,
  Clock,
  FileText,
  Hash,
  Package2,
  ScanLine,
  Tag,
} from "lucide-react";

interface DataType {
  id: React.Key;
  stepName: string;
  stepType: string;
  status: string;
  workflowName: string;
  createdAt: string;
  perviousTask: {
    doneBy: { username: string };
    textMessage?: string;
  };
  relatedForm: {
    id: IForm;
    fields: { id: string; required: boolean }[];
  };
  formData?: any;
  fillFormWith?: string;
}

interface APIData {
  id: string;
  stepName: string;
  stepType: string;
  status: string;
  workflowId: { id: string; name: string };
  createdAt: number;
  perviousTask: {
    doneBy: { username: string };
    textMessage?: string;
  };
  relatedForm: {
    id: IForm;
    fields: { id: string; required: boolean }[];
  };
  formData: any;
  fillFormWith?: string;
}

const { url: todoListUrl, method: todoListMethod } =
  BACKEND_ROUTES.workflow.engine.listOfAvailableWorkflowTasksForRole;

export const ListOfToDoTasksForRole: React.FC = () => {
  const [taskListData, setTasksListData] = useState<DataType[]>([]);
  const [doneTask, setDoneTask] = useState<string[]>([]);

  const columns = [
    {
      title: "نام مرحله",
      dataIndex: "stepName",
    },
    {
      title: "نوع مرحله",
      dataIndex: "stepType",
    },
    {
      title: "وضعیت",
      dataIndex: "status",
    },
    {
      title: "مهلت انجام",
      key: "action",
      render: (_: any, record: DataType) => {
        const now = Date.now();
        let diff = Math.abs(now - record.estimate); // تفاوت زمانی بر حسب میلی‌ثانیه

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        diff -= days * 1000 * 60 * 60 * 24;

        const hours = Math.floor(diff / (1000 * 60 * 60));
        return (
          <Space>
            {days} روز و {hours} ساعت
          </Space>
        );
      },
    },
    {
      title: "نام فرایند",
      dataIndex: "workflowName",
    },
    {
      title: "تاریخ ایجاد",
      dataIndex: "createdAt",
    },
    {
      title: "مرحله قبل",
      key: "action",
      render: (_: any, record: DataType) => {
        return (
          <Space>
            <ViewDetailsButton
              perviousTask={record.perviousTask}
            ></ViewDetailsButton>
          </Space>
        );
      },
    },
    {
      title: "فرم های نمایشی",
      key: "action",
      render: (_: any, record: DataType) => {
        if (record.hasShowFilledFormsFromSteps) {
          return (
            <Space>
              <ViewFormsButton taskId={record}></ViewFormsButton>
            </Space>
          );
        } else {
          return null;
        }
      },
    },
    {
      title: "فرم مربوطه",
      key: "action",
      render: (_: any, record: DataType) => {
        if (!record.relatedForm) return null;
        if (!record.relatedForm.id) return null;
        if (!record.relatedForm.fields) return null;
        return (
          <Space>
            <FormModalButton
              taskId={record.id as string}
              wholeTask={record as any}
              id={record.relatedForm.id}
              fields={record.relatedForm.fields}
            ></FormModalButton>
          </Space>
        );
      },
    },
    {
      title: "اقدامات",
      key: "action",
      render: (_: any, record: DataType) => {
        return (
          <Space>
            <AcceptButton
              taskId={record.id as string}
              setDoneTask={setDoneTask}
              doneTask={doneTask}
            ></AcceptButton>
            <RejectButton
              taskId={record.id as string}
              setDoneTask={setDoneTask}
              doneTask={doneTask}
            ></RejectButton>{" "}
            {/* <ViewDetailsButton
              projectId={record.projectId as string}
              productId={record.productId as string}
            ></ViewDetailsButton> */}
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    apiClient[todoListMethod](todoListUrl).then(
      (data: AxiosResponse<IBaseBackendResponse<APIData[]>>) => {
        setTasksListData(
          (data.data.data || []).map((item) => {
            return {
              id: item.id,
              createdAt: timestampToJalaliWithMonth(item.createdAt),
              status:
                item.status === "TODO"
                  ? "جهت انجام"
                  : item.status === "DONE-AND-REJECTED"
                  ? "رد شده"
                  : "نامشخص",
              stepName: item.stepName,
              workflowName: item.workflowId.name,
              // stepType: item.stepType,
              stepType:
                item.stepType === "TODO"
                  ? "وظیفه"
                  : item.stepType === "START"
                  ? "شروع"
                  : "نامشخص",
              perviousTask: item.perviousTask,
              relatedForm: item.relatedForm,
              formData: item.formData,
              fillFormWith: item.fillFormWith,
              hasShowFilledFormsFromSteps: item.hasShowFilledFormsFromSteps,
              estimate: item.estimate,
              stepNumber: item.stepNumber
            };
          })
        );
      }
    );
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.2,
      },
    },
  };

  const renderer = (estimate) => {
    const now = Date.now();
    let diff = Math.abs(now - estimate);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * 1000 * 60 * 60 * 24;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    return (
      <Space>
        {days} روز و {hours} ساعت
      </Space>
    );
  };

  const renderer2 = (record) => {
    if (!record.relatedForm) return null;
    if (!record.relatedForm.id) return null;
    if (!record.relatedForm.fields) return null;
    return (
      <Space>
        <FormModalButton
          taskId={record.id as string}
          wholeTask={record as any}
          id={record.relatedForm.id}
          fields={record.relatedForm.fields}
        ></FormModalButton>
      </Space>
    );
  };

  return (
    <>
      <div className="p-6 h-full">
        {/* Header with actions */}

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex mb-8 items-center justify-between col-span-full">
            <div className="min-w-0 flex-1">
              <h2 className="text-3xl">تسک های فعلی</h2>
            </div>
          </div>

          {taskListData.map((task) => (
            <motion.div
              key={task.id}
              className="rounded-xl overflow-hidden shadow-md bg-white"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="bg-gradient-to-br from-[#FE7E05] to-[#FFAA5B] p-4 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-xl flex items-center">
                      <Package2 className="ml-1" size={18} />
                      {task.stepName}
                    </h3>

                    <p className="text-sm opacity-80 flex items-center mt-1">
                      <Hash size={14} className="ml-1" />
                      کد پروژه: {task.stepNumber}
                    </p>
                  </div>

                  <div className="bg-white/20 text-white px-2 py-0.5 rounded text-xs s">
                    {task.status}
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-start gap-1">
                    <Tag
                      className="ml-1.5 text-[#FE7E05] mt-0.5 flex-shrink-0"
                      size={16}
                    />
                    <div>
                      <p className="text-gray-500 text-xs">نوع</p>
                      <p className="font-medium">{task.stepType || "—"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-1">
                    <Briefcase
                      className="ml-1.5 text-[#FE7E05] mt-0.5 flex-shrink-0"
                      size={16}
                    />
                    <div>
                      <p className="text-gray-500 text-xs">نام مرحله</p>
                      <p className="font-medium">
                        {task.workflowName || "—"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-1">
                    <Clock
                      className="ml-1.5 text-[#FE7E05] mt-0.5 flex-shrink-0"
                      size={16}
                    />
                    <div>
                      <p className="text-gray-500 text-xs">مهلت انجام</p>
                      <p className="font-medium">{renderer(task.estimate)}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-1">
                    <ScanLine
                      className="ml-1.5 text-[#FE7E05] mt-0.5 flex-shrink-0"
                      size={16}
                    />
                    <div>
                      <p className="text-gray-500 text-xs">تاریخ ایجاد</p>
                      <p className="font-medium">{task.createdAt || "—"}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-700">
                      <FileText size={18} className="ml-2 text-[#FE7E05]" />
                      <span className="font-medium">جزئیات مرحله قبل:</span>
                    </div>
                    <Space>
                      <ViewDetailsButton
                        perviousTask={task.perviousTask}
                      ></ViewDetailsButton>
                    </Space>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-700">
                      <FileText size={18} className="ml-2 text-[#FE7E05]" />
                      <span className="font-medium">فرم های نمایشی:</span>
                    </div>

                    {task.hasShowFilledFormsFromSteps && (
                      <Space>
                        <ViewFormsButton taskId={task}></ViewFormsButton>
                      </Space>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-700">
                      <FileText size={18} className="ml-2 text-[#FE7E05]" />
                      <span className="font-medium">فرم های مربوطه:</span>
                    </div>

                    {renderer2(task)}
                  </div>
                </div>

                <div className="flex justify-end space-x-2 rtl:space-x-reverse mt-4 pt-3 border-t border-gray-100">
                  <Space>
                    <AcceptButton
                      taskId={task.id as string}
                      setDoneTask={setDoneTask}
                      doneTask={doneTask}
                    ></AcceptButton>
                    <RejectButton
                      taskId={task.id as string}
                      setDoneTask={setDoneTask}
                      doneTask={doneTask}
                    ></RejectButton>{" "}
                  </Space>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {taskListData.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white rounded-lg shadow-sm"
          >
            <Package2 size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500 text-lg">تسکی یافت نشد</p>
            <p className="text-gray-400 text-sm mt-1">
              لطفا معیارهای جستجو را تغییر دهید یا محصول جدیدی اضافه کنید
            </p>
          </motion.div>
        )}
      </div>

      {/* <Table
        columns={columns}
        dataSource={taskListData.filter(
          (item) => doneTask.indexOf(item.id as string) === -1
        )}
        rowKey="id"
      /> */}
    </>
  );
};

export default ListOfToDoTasksForRole;
