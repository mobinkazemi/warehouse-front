import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Edit, Calendar, User, Search } from "lucide-react";
import apiClient from "../../../configs/axios.config";
import { BACKEND_ROUTES } from "../../../shared/backendRoutes";
import { EditButton } from "./parts/EditButton";

interface RoleType {
  id: string;
  name: string;
  createdAt: number;
}

const { url: listUrl, method: listMethod } = BACKEND_ROUTES.role.list;

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

const RolesListPage: React.FC = () => {
  const [rolesListData, setRolesListData] = useState<RoleType[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    apiClient[listMethod](listUrl).then(({ data }) => {
      setRolesListData(
        data.data.map((role: any) => ({
          ...role,
        }))
      );
    });
  }, []);

  const filteredRoles = rolesListData.filter((role) =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex mb-8 items-center justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-3xl">مدیریت دسترسی ها</h2>
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredRoles.length > 0 ? (
          filteredRoles.map((role) => (
            <motion.div
              key={role.id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              <div className="p-1">
                <div className="h-3 w-full bg-orange-500 rounded-t-lg"></div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {role.name}
                  </h3>
                  <motion.button
                    className="text-orange-500 hover:text-orange-700 p-2 rounded-full hover:bg-orange-50 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="ویرایش"
                  >
                    <EditButton roleId={role.id} />
                  </motion.button>
                </div>

                <div className="flex items-center text-gray-600 mb-2">
                  <User size={16} className="ml-2 text-orange-500" />
                  <span className="text-sm">
                    شناسه: {role.id.substring(0, 16)}...
                  </span>
                </div>

                <div className="flex items-center text-gray-600">
                  <Calendar size={16} className="ml-2 text-orange-500" />
                  <span className="text-sm">
                    تاریخ ایجاد: {formatDate(role.createdAt)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            نقشی با این مشخصات یافت نشد
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default RolesListPage;
