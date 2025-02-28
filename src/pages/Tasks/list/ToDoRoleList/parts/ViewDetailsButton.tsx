// import React, { useState } from "react";
// import { Button, Modal, Spin, Typography } from "antd";
// import { EyeOutlined } from "@ant-design/icons";
// import apiClient from "../../../../../configs/axios.config"; // Adjust path as needed
// import { BACKEND_ROUTES } from "../../../../../shared/backendRoutes";

// const { Text } = Typography;

// interface IProps {
//   projectId: string;
//   productId: string;
// }

// const { method: projectInfoMethod, url: projectInfoUrl } =
//   BACKEND_ROUTES.project.info;
// const { method: productInfoMethod, url: productInfoUrl } =
//   BACKEND_ROUTES.product.info;
// export const ViewDetailsButton: React.FC<IProps> = ({
//   projectId,
//   productId,
// }) => {
//   const [visible, setVisible] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState<{ project: any; product: any } | null>(null);

//   const fetchDetails = async () => {
//     setLoading(true);
//     try {
//       const projectResponse = await apiClient[projectInfoMethod](
//         projectInfoUrl.replace(":id", projectId)
//       );
//       const productResponse = await apiClient[productInfoMethod](
//         productInfoUrl.replace(":id", productId)
//       );

//       setData({
//         project: projectResponse.data.data,
//         product: productResponse.data.data,
//       });
//     } catch (error) {
//       console.error("Failed to fetch details", error);
//     }
//     setLoading(false);
//   };

//   const showModal = () => {
//     setVisible(true);
//     fetchDetails();
//   };

//   return (
//     <>
//       <Button type="default" icon={<EyeOutlined />} onClick={showModal} />
//       <Modal
//         title="جزئیات پروژه و محصول"
//         visible={visible}
//         onCancel={() => setVisible(false)}
//         footer={null}
//       >
//         {loading ? (
//           <Spin />
//         ) : data ? (
//           <>
//             <Text strong>پروژه:</Text>
//             <p>
//               {data.project.name} - {data.project.code}
//             </p>

//             <Text strong>محصول:</Text>
//             <p>
//               {data.product.type} - {data.product.brand}
//             </p>
//           </>
//         ) : (
//           <p>داده‌ای برای نمایش وجود ندارد</p>
//         )}
//       </Modal>
//     </>
//   );
// };
//--------------------------------------------------------------------
const { method: projectInfoMethod, url: projectInfoUrl } =
  BACKEND_ROUTES.project.info;
const { method: productInfoMethod, url: productInfoUrl } =
  BACKEND_ROUTES.product.info;
import React, { useState } from "react";
import {
  Button,
  Modal,
  Descriptions,
  Spin,
  Typography,
  Divider,
  Card,
  Tooltip,
} from "antd";
import { EyeOutlined, FileOutlined } from "@ant-design/icons";
import apiClient, {
  BASE_BACKEND_URL,
} from "../../../../../configs/axios.config";
import { BACKEND_ROUTES } from "../../../../../shared/backendRoutes";

const { Text } = Typography;

interface IProps {
  projectId: string;
  productId: string;
}

export const ViewDetailsButton: React.FC<IProps> = ({
  projectId,
  productId,
}) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ project: any; product: any } | null>(null);

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const projectResponse = await apiClient[projectInfoMethod](
        projectInfoUrl.replace(":id", projectId)
      );
      const productResponse = await apiClient[productInfoMethod](
        productInfoUrl.replace(":id", productId)
      );

      setData({
        project: projectResponse.data.data,
        product: productResponse.data.data,
      });
    } catch (error) {
      console.error("Failed to fetch details", error);
    }
    setLoading(false);
  };

  const showModal = () => {
    setVisible(true);
    fetchDetails();
  };

  return (
    <>
      <Tooltip title="جزئیات پروژه و محصول">
        <Button type="default" icon={<EyeOutlined />} onClick={showModal} />
      </Tooltip>
      <Modal
        title="جزئیات پروژه و محصول"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={800}
      >
        {loading ? (
          <Spin />
        ) : data ? (
          <div style={{ display: "flex", gap: "20px" }}>
            {/* Left: Project Details */}
            <Card style={{ flex: 1, background: "#f9f9f9" }}>
              <Text strong>مشخصات پروژه</Text>
              <Descriptions bordered column={1} size="small">
                <Descriptions.Item label="نام">
                  {data.project.name}
                </Descriptions.Item>
                <Descriptions.Item label="کد">
                  {data.project.code}
                </Descriptions.Item>
                <Descriptions.Item label="توضیحات">
                  {data.project.description}
                </Descriptions.Item>
                <Descriptions.Item label="وضعیت">
                  {data.project.status}
                </Descriptions.Item>
              </Descriptions>

              <Divider />
              <Text strong>قراردادهای پروژه</Text>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {data.project.files.length > 0 ? (
                  data.project.files.map((fileId: string) => (
                    <Card
                      key={fileId}
                      style={{ width: 100, textAlign: "center" }}
                    >
                      <FileOutlined style={{ fontSize: 24 }} />
                      <br />
                      <a
                        href={`${BASE_BACKEND_URL}/files/byId/${fileId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        دانلود
                      </a>
                    </Card>
                  ))
                ) : (
                  <p>بدون فایل</p>
                )}
              </div>
            </Card>

            {/* Right: Product Details */}
            <Card style={{ flex: 1, background: "#f9f9f9" }}>
              <Text strong>مشخصات محصول</Text>
              <Descriptions bordered column={1} size="small">
                <Descriptions.Item label="نام">
                  {data.product.name}
                </Descriptions.Item>
                <Descriptions.Item label="کد">
                  {data.product.code}
                </Descriptions.Item>
                <Descriptions.Item label="نوع">
                  {data.product.type}
                </Descriptions.Item>
                <Descriptions.Item label="برند">
                  {data.product.brand}
                </Descriptions.Item>
                <Descriptions.Item label="شماره سریال">
                  {data.product.serialNumber}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </div>
        ) : (
          <p>داده‌ای برای نمایش وجود ندارد</p>
        )}
      </Modal>
    </>
  );
};
//----------------------------------------------------------------------
// import React, { useState } from "react";
// import { Button, Modal, Spin, Tabs, Descriptions, Typography } from "antd";
// import { EyeOutlined, FileOutlined } from "@ant-design/icons";
// import apiClient from "../../../../../configs/axios.config"; // Adjust path as needed
// import { BACKEND_ROUTES } from "../../../../../shared/backendRoutes";
// import dayjs from "dayjs";

// const { Text } = Typography;
// const { TabPane } = Tabs;

// interface IProps {
//   projectId: string;
//   productId: string;
// }

// const { method: projectInfoMethod, url: projectInfoUrl } =
//   BACKEND_ROUTES.project.info;
// const { method: productInfoMethod, url: productInfoUrl } =
//   BACKEND_ROUTES.product.info;
// export const ViewDetailsButton: React.FC<IProps> = ({
//   projectId,
//   productId,
// }) => {
//   const [visible, setVisible] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState<{ project: any; product: any } | null>(null);

//   const fetchDetails = async () => {
//     setLoading(true);
//     try {
//       const projectResponse = await apiClient[projectInfoMethod](
//         projectInfoUrl.replace(":id", projectId)
//       );
//       const productResponse = await apiClient[productInfoMethod](
//         productInfoUrl.replace(":id", productId)
//       );

//       setData({
//         project: projectResponse.data.data,
//         product: productResponse.data.data,
//       });
//     } catch (error) {
//       console.error("Failed to fetch details", error);
//     }
//     setLoading(false);
//   };

//   const showModal = () => {
//     setVisible(true);
//     fetchDetails();
//   };

//   return (
//     <>
//       <Button type="default" icon={<EyeOutlined />} onClick={showModal} />
//       <Modal
//         title="جزئیات پروژه و محصول"
//         open={visible}
//         onCancel={() => setVisible(false)}
//         footer={null}
//         width={700} // Wider modal for better UI
//       >
//         {loading ? (
//           <Spin />
//         ) : data ? (
//           <Tabs defaultActiveKey="1">
//             {/* Project Details Tab */}
//             <TabPane tab="پروژه" key="1">
//               <Descriptions bordered column={1} size="small">
//                 <Descriptions.Item label="نام">
//                   {data.project.name}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="کد">
//                   {data.project.code}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="توضیحات">
//                   {data.project.description}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="وضعیت">
//                   {data.project.status}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="تاریخ ایجاد">
//                   {dayjs(data.project.createdAt).format("YYYY-MM-DD HH:mm")}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="فایل‌های قرارداد">
//                   {data.project.files.length > 0 ? (
//                     data.project.files.map((fileId: string) => (
//                       <a
//                         key={fileId}
//                         href={`${BACKEND_ROUTES.file.download.url.replace(
//                           ":id",
//                           fileId
//                         )}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         style={{ display: "block" }}
//                       >
//                         <FileOutlined /> فایل {fileId}
//                       </a>
//                     ))
//                   ) : (
//                     <Text type="secondary">بدون فایل</Text>
//                   )}
//                 </Descriptions.Item>
//               </Descriptions>
//             </TabPane>

//             {/* Product Details Tab */}
//             <TabPane tab="محصول" key="2">
//               <Descriptions bordered column={1} size="small">
//                 <Descriptions.Item label="نام">
//                   {data.product.name}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="نوع">
//                   {data.product.type}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="برند">
//                   {data.product.brand}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="شماره سریال">
//                   {data.product.serialNumber}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="کد">
//                   {data.product.code}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="توضیحات">
//                   {data.product.description}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="تاریخ ایجاد">
//                   {dayjs(data.product.createdAt).format("YYYY-MM-DD HH:mm")}
//                 </Descriptions.Item>
//               </Descriptions>
//             </TabPane>
//           </Tabs>
//         ) : (
//           <p>داده‌ای برای نمایش وجود ندارد</p>
//         )}
//       </Modal>
//     </>
//   );
// };
