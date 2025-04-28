import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Edit, Calendar, FileText, Database, Search, Tag, Link, Plus, Loader } from "lucide-react";
import apiClient from "../../../configs/axios.config";
import { BACKEND_ROUTES } from "../../../shared/backendRoutes";
import { useNavigate } from "react-router-dom";

interface FormType {
  deletedAt: string;
  refrence: string;
  type: string;
  api: string;
  createdAt: number;
  fields: {
    name: string;
    label: string;
    type: string;
    required: boolean;
    options: any[];
    defaultValue: string;
    key: string;
    relatedInstance: any[];
    relatedForms: any[];
    createdAt: number;
    updatedAt: number;
    id: string;
  }[];
  name: string;
  tempCsvId: string;
  updatedAt: number;
  id: string
}

const { url: listUrl, method: listMethod } = BACKEND_ROUTES.form.list;

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

const FormsListPage: React.FC = () => {
  const [formListData, setFormListData] = useState<FormType[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    apiClient[listMethod](listUrl)
      .then(({ data }) => {
        setFormListData(
          data.data.map((form: FormType) => ({
            ...form,
          }))
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredForms = formListData.filter((form) =>
    form.name.toLowerCase().includes(searchQuery.toLowerCase())
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

  const getFormTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "dynamic":
        return <Database className="text-purple-500" size={16} />;
      case "static":
        return <FileText className="text-blue-500" size={16} />;
      default:
        return <FileText className="text-gray-500" size={16} />;
    }
  };

  const getFormTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "dynamic":
        return "bg-purple-100 text-purple-700";
      case "static":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin text-orange-500" size={40} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">لیست فرم‌ها</h1>
        </div>
        
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            onClick={() => navigate("/forms/create")}
          >
            <Plus size={18} />
            <span>فرم جدید</span>
          </motion.button>
        </div>
      </div>

      {filteredForms.length === 0 && !loading ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <FileText className="mx-auto text-orange-500 opacity-30 mb-4" size={64} />
          <h3 className="text-xl font-medium text-gray-700 mb-2">هیچ فرمی یافت نشد</h3>
          <p className="text-gray-500 mb-6">فرمی با معیارهای جستجوی شما یافت نشد یا هنوز فرمی ایجاد نکرده‌اید.</p>
          <button 
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg inline-flex items-center gap-2 transition-colors"
            onClick={() => navigate("/forms/create")}
          >
            <Plus size={18} />
            <span>ایجاد فرم جدید</span>
          </button>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredForms.map((form) => (
            <motion.div
              key={form.id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:border-orange-200 transition-all duration-300"
              variants={cardVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="h-2 bg-gradient-to-r from-orange-400 to-orange-600"></div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
                    {form.name}
                  </h3>
                  <motion.button
                    className="text-orange-500 hover:text-orange-700 p-2 rounded-full hover:bg-orange-50 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="ویرایش"
                    onClick={() => navigate(`/forms/edit/${form.id}`)}
                  >
                    <Edit size={18} />
                  </motion.button>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex ${getFormTypeColor(form.type)}`}>
                    {getFormTypeIcon(form.type)}
                    <span className="mr-1">{form.type}</span>
                  </span>
                  
                  {form.fields?.length > 0 && (
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-green-100 text-green-700 flex items-center">
                      <Database size={14} className="ml-1" />
                      {form.fields.length} فیلد
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  {form.refrence && (
                    <div className="flex items-center text-gray-600 text-sm">
                      <Link size={16} className="ml-2 text-orange-500 flex-shrink-0" />
                      <span className="truncate">مرجع: {form.refrence}</span>
                    </div>
                  )}

                  <div className="flex items-center text-gray-600 text-sm">
                    <Tag size={16} className="ml-2 text-orange-500 flex-shrink-0" />
                    <span className="truncate">شناسه: {form.id}...</span>
                  </div>

                  <div className="flex items-center text-gray-600 text-sm">
                    <Calendar size={16} className="ml-2 text-orange-500 flex-shrink-0" />
                    <span className="truncate">ایجاد: {formatDate(form.createdAt)}</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <button 
                    className="w-full bg-gray-50 hover:bg-orange-50 text-gray-700 hover:text-orange-600 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
                    onClick={() => navigate(`/forms/view/${form.id}`)}
                  >
                    <span>مشاهده جزئیات</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default FormsListPage;