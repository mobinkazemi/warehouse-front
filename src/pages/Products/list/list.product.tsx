import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import apiClient from "../../../configs/axios.config";
import { BACKEND_ROUTES } from "../../../shared/backendRoutes";
import { DeleteButton } from "./parts/DeleteButton";
import { EditButton } from "./parts/EditButton";
import {
  Package2,
  Tag,
  FileText,
  Briefcase,
  Barcode,
  ScanLine,
  Hash,
  Plus,
  Search,
  Filter,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ProductCreationPage from "../create/create";

interface DataType {
  id: React.Key;
  name: string;
  project: { id: string; name: string; code: string };
  status: "active" | "inactive";
  type?: string;
  description?: string;
  brand?: string;
  partNumber?: string;
  serialNumber?: string;
  code?: string;
}

const { url: listUrl, method: listMethod } = BACKEND_ROUTES.product.list;

const ProductsListPage: React.FC = () => {
  const [productsListData, setProductsListData] = useState<DataType[]>([]);
  const [deletedProduct, setDeletedProduct] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    apiClient[listMethod](listUrl).then(({ data }) => {
      setProductsListData(
        data.data.map((sw: any) => ({
          ...sw,
          code: sw.project.code,
        }))
      );
    });
  }, []);

  const filteredProducts = productsListData
    .filter((item) => deletedProduct.indexOf(item.id as number) === -1)
    .filter(
      (item) =>
        searchTerm === "" ||
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Animation variants
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

  return (
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

              <ProductCreationPage />
            </DialogContent>
          </Dialog>
        </div>

        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            className="rounded-xl overflow-hidden shadow-md bg-white"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="bg-gradient-to-br from-[#FE7E05] to-[#FFAA5B] p-4 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-xl flex items-center">
                    <Package2 className="ml-1" size={18} />
                    {product.name}
                  </h3>
                  <p className="text-sm opacity-80 flex items-center mt-1">
                    <Hash size={14} className="ml-1" />
                    کد پروژه: {product.code}
                  </p>
                </div>
                <div className="bg-white/20 text-white px-2 py-0.5 rounded text-xs">
                  {product.status === "active" ? "فعال" : "غیرفعال"}
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
                    <p className="font-medium">{product.type || "—"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-1">
                  <Briefcase
                    className="ml-1.5 text-[#FE7E05] mt-0.5 flex-shrink-0"
                    size={16}
                  />
                  <div>
                    <p className="text-gray-500 text-xs">برند</p>
                    <p className="font-medium">{product.brand || "—"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-1">
                  <Barcode
                    className="ml-1.5 text-[#FE7E05] mt-0.5 flex-shrink-0"
                    size={16}
                  />
                  <div>
                    <p className="text-gray-500 text-xs">پارت نامبر</p>
                    <p className="font-medium">{product.partNumber || "—"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-1">
                  <ScanLine
                    className="ml-1.5 text-[#FE7E05] mt-0.5 flex-shrink-0"
                    size={16}
                  />
                  <div>
                    <p className="text-gray-500 text-xs">سریال نامبر</p>
                    <p className="font-medium">{product.serialNumber || "—"}</p>
                  </div>
                </div>
              </div>

              {product.description && (
                <div className="mb-4 flex items-start gap-1">
                  <FileText
                    className="ml-1.5 text-[#FE7E05] mt-0.5 flex-shrink-0"
                    size={16}
                  />
                  <div>
                    <p className="text-gray-500 text-xs">توضیحات</p>
                    <p className="font-medium text-sm">{product.description}</p>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2 rtl:space-x-reverse mt-4 pt-3 border-t border-gray-100">
                <DeleteButton
                  productId={product.id as string}
                  setDeletedProduct={setDeletedProduct}
                  deletedProduct={deletedProduct}
                />
                <EditButton productId={product.id as string} />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 bg-white rounded-lg shadow-sm"
        >
          <Package2 size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 text-lg">محصولی یافت نشد</p>
          <p className="text-gray-400 text-sm mt-1">
            لطفا معیارهای جستجو را تغییر دهید یا محصول جدیدی اضافه کنید
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ProductsListPage;
