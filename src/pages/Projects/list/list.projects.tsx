import React, { useEffect, useState } from "react";
import { Spin, Tooltip } from "antd";
import { DeleteButton } from "./parts/DeleteButton";
import { EditButton } from "./parts/EditButton";
import apiClient from "../../../configs/axios.config";
import { BACKEND_ROUTES } from "../../../shared/backendRoutes";
import { motion } from "framer-motion";
import {
  Code,
  Activity,
  Briefcase,
  AlertCircle,
  Calendar,
  Download,
  FileText,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface DataType {
  id: React.Key;
  name: string;
  code: string;
  status: "active" | "inactive";
  createdAt: number;
  files?: string[];
}

const { url: listUrl, method: listMethod } = BACKEND_ROUTES.project.list;

const ProjectsListPage: React.FC = () => {
  const [projectsListData, setProjectsListData] = useState<DataType[]>([]);
  const [deletedProject, setDeletedProject] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    apiClient[listMethod](listUrl)
      .then(({ data }) => {
        setProjectsListData(
          data.data.map((sw: any) => ({
            ...sw,
          }))
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredProjects = projectsListData.filter(
    (item) => deletedProject.indexOf(item.id as number) === -1
  );

  const handleDownloadFiles = (projectId: React.Key, files: string[] = []) => {
    if (files.length === 0) {
      return;
    }

    files.forEach((fileId) => {
      apiClient
        .get(`/file/byId/${fileId}`, { responseType: "blob" })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `file-${fileId}.pdf`);
          document.body.appendChild(link);
          link.click();
          link.remove();
        });
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  const getStatusInfo = (status: string) => {
    if (status === "active") {
      return {
        color: "bg-green-100 text-green-800",
        icon: <Activity size={16} className="ml-2" />,
        text: "فعال",
      };
    } else {
      return {
        color: "bg-red-100 text-red-800",
        icon: <AlertCircle size={16} className="ml-2" />,
        text: "غیرفعال",
      };
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spin size="large" tip="در حال بارگذاری..." />
      </div>
    );
  }

  if (filteredProjects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-gray-500">
        <Briefcase className="h-16 w-16 mb-4 text-[#FE7E05]" />
        <p className="text-lg font-medium">هیچ پروژه‌ای یافت نشد</p>
        <p className="text-sm mt-2">لطفا پروژه جدیدی ایجاد کنید</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="p-4 rtl"
    >
      <div className="flex mb-8 items-center justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-3xl">مدیریت پروژه ها</h2>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <button className="inline-flex items-center rounded-md bg-[#FE7E05] px-3 py-2 text-sm text-white shadow-xs">
              ایجاد پروژه
            </button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>ایجاد پروژه</DialogTitle>
            </DialogHeader>


          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProjects.map((project) => {
          const statusInfo = getStatusInfo(project.status);
          const hasFiles = project.files && project.files.length > 0;

          return (
            <motion.div
              key={project.id}
              variants={item}
              className="h-full"
              whileHover={{ scale: 1.02 }}
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden h-full border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="px-6 py-4 border-b border-gray-100 relative">
                  <div className="absolute -left-2 -top-2 w-16 h-16 bg-[#FE7E05]/10 rounded-full"></div>
                  <div className="relative">
                    <h3 className="text-lg font-bold text-gray-800 truncate pr-2 mt-5">
                      {project.name}
                    </h3>
                  </div>
                </div>

                <div className="px-6 py-4">
                  <div className="flex items-center mb-3 text-gray-700">
                    <Code size={18} className="ml-2 text-[#FE7E05]" />
                    <span className="font-medium ml-1">کد پروژه:</span>
                    <span className="mr-1 font-light">{project.code}</span>
                  </div>

                  <div className="flex items-center mb-3 text-gray-700">
                    <Calendar size={18} className="ml-2 text-[#FE7E05]" />
                    <span className="font-medium ml-1">تاریخ ایجاد:</span>
                    <span className="mr-1 font-light" dir="ltr">
                      {new Date(project.createdAt).toLocaleString("fa-IR")}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-700">
                    {React.cloneElement(statusInfo.icon as React.ReactElement, {
                      className: "ml-2 text-[#FE7E05]",
                    })}
                    <span className="font-medium ml-1">وضعیت:</span>
                    <span className="mr-1 font-light">{statusInfo.text}</span>
                  </div>

                  {hasFiles && (
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-700">
                          <FileText size={18} className="ml-2 text-[#FE7E05]" />
                          <span className="font-medium">فایل‌ها:</span>
                          <span className="mr-2 text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                            {project.files?.length}
                          </span>
                        </div>
                        <Tooltip title="دانلود فایل‌ها">
                          <motion.button
                            onClick={() =>
                              handleDownloadFiles(project.id, project.files)
                            }
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="flex cursor-pointer items-center justify-center p-1.5 rounded-lg bg-[#FE7E05]/10 text-[#FE7E05] hover:bg-[#FE7E05]/20 transition-colors duration-200 focus:outline-none"
                          >
                            <Download size={16} />
                          </motion.button>
                        </Tooltip>
                      </div>
                    </div>
                  )}
                </div>

                <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-end space-x-2 space-x-reverse">
                  <motion.div
                    className="ml-2"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <EditButton projectId={project.id as string} />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <DeleteButton
                      projectId={project.id as string}
                      setDeletedProject={setDeletedProject}
                      deletedProject={deletedProject}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ProjectsListPage;
