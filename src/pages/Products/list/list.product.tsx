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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductCreationPage from "../create/create";
import { Input } from "antd";

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

  // Animation
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

  return (
    <div className="p-6 h-full">
      {/* Header with actions */}

      {/* Cards grid */}
      <motion.div
        className="grid grid-cols-1 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex mb-8 items-center justify-between col-span-full">
          <div className="min-w-0 flex-1">
            <h2 className="text-3xl">مدیریت محصولات</h2>
          </div>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="py-2 rounded-md border border-gray-300 px-3"
            placeholder="جستجو کنید..."
          />

          {/* <Dialog>
            <DialogTrigger asChild>
              <button className="inline-flex items-center rounded-md bg-[#FE7E05] px-3 py-2 text-sm text-white shadow-xs">
                ایجاد محصول
              </button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>ایجاد پروژه</DialogTitle>
              </DialogHeader>

              <ProductCreationPage />
            </DialogContent>
          </Dialog> */}
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
                    نام محصول
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    کد پروژه
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    وضعیت
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    نوع
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    برند
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    پارت نامبر
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    سریال نامبر
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    توضیحات
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
                {filteredProducts.map((product, index) => (
                  <motion.tr
                    key={product.id}
                    variants={item}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 bg-[#FE7E05]/10 rounded-full flex items-center justify-center">
                          <Package2 className="text-[#FE7E05]" size={16} />
                        </div>
                        <div className="mr-3">
                          <div className="text-sm font-medium text-gray-900">
                            {product.name || "--"}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 bg-[#FE7E05]/10 rounded-full flex items-center justify-center">
                          <Hash className="text-[#FE7E05]" size={16} />
                        </div>
                        <div className="mr-3">
                          <div className="text-sm font-medium text-gray-900">
                            {product.code || "--"}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 bg-[#FE7E05]/10 rounded-full flex items-center justify-center">
                          <Filter className="text-[#FE7E05]" size={16} />
                        </div>
                        <div className="mr-3">
                          <div className="text-sm font-medium text-gray-900">
                            {product.status === "active" ? "فعال" : "غیرفعال"}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 bg-[#FE7E05]/10 rounded-full flex items-center justify-center">
                          <Tag className="text-[#FE7E05]" size={16} />
                        </div>
                        <div className="mr-3">
                          <div className="text-sm font-medium text-gray-900">
                            {product.type || "--"}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 bg-[#FE7E05]/10 rounded-full flex items-center justify-center">
                          <Briefcase className="text-[#FE7E05]" size={16} />
                        </div>
                        <div className="mr-3">
                          <div className="text-sm font-medium text-gray-900">
                            {product.brand || "--"}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 bg-[#FE7E05]/10 rounded-full flex items-center justify-center">
                          <Barcode className="text-[#FE7E05]" size={16} />
                        </div>
                        <div className="mr-3">
                          <div className="text-sm font-medium text-gray-900">
                            {product.partNumber || "--"}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 bg-[#FE7E05]/10 rounded-full flex items-center justify-center">
                          <ScanLine className="text-[#FE7E05]" size={16} />
                        </div>
                        <div className="mr-3">
                          <div className="text-sm font-medium text-gray-900">
                            {product.serialNumber || "--"}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 bg-[#FE7E05]/10 rounded-full flex items-center justify-center">
                          <FileText className="text-[#FE7E05]" size={16} />
                        </div>
                        <div className="mr-3">
                          <div className="text-sm font-medium text-gray-900">
                            {product.description || "--"}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-2 space-x-reverse">
                        <DeleteButton
                          productId={product.id as string}
                          setDeletedProduct={setDeletedProduct}
                          deletedProduct={deletedProduct}
                        />

                        <EditButton productId={product.id as string} />
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </motion.table>
          </div>
        </div>
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
