// import { Button, Flex, message, Modal, Tooltip } from "antd";
// import { CheckOutlined } from "@ant-design/icons";
// import { BACKEND_ROUTES, setId } from "../../../../shared/backendRoutes";
// import apiClient from "../../../../configs/axios.config";

// interface IProps {
//   taskId: string;
//   setDoneTask: Function;
//   doneTask: string[];
// }
// const { method, url } =
//   BACKEND_ROUTES.workflow.engine.doneAndApproveWorkflowTask;

// export const AcceptButton: React.FC<IProps> = ({
//   taskId,
//   setDoneTask,
//   doneTask,
// }: IProps): React.ReactElement => {
//   const showAcceptanceConfirmModal = () => {
//     Modal.confirm({
//       title: "تسک انجام شده است؟",
//       content: "امکان بازگشت به حالت فعلی وجود ندارد",
//       okText: "بله، انجام شده",
//       okType: "danger",
//       cancelText: "خیر، منصرف شدم",
//       onOk: async () => {
//         apiClient[method](setId({ id: taskId, url }))
//           .then((res) => {
//             setDoneTask([...doneTask, taskId]);
//           })
//           .catch((err) => {
//             message.error("در انجام عملیات خطایی رخ داده است");
//           });
//       },
//       onCancel() {
//         console.log("task done rejected");
//       },
//     });
//   };

//   return (
//     <Flex wrap gap="small">
//       <Tooltip title="تسک انجام شود">
//         <Button
//           onClick={showAcceptanceConfirmModal}
//           type="primary"
//           icon={<CheckOutlined />}
//         ></Button>
//       </Tooltip>
//     </Flex>
//   );
// };

import { Button, Flex, message, Modal, Tooltip, Input } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { BACKEND_ROUTES, setId } from "../../../../shared/backendRoutes";
import apiClient from "../../../../configs/axios.config";
import { useState } from "react";

interface IProps {
  taskId: string;
  setDoneTask: Function;
  doneTask: string[];
}

const { method, url } =
  BACKEND_ROUTES.workflow.engine.doneAndApproveWorkflowTask;

export const AcceptButton: React.FC<IProps> = ({
  taskId,
  setDoneTask,
  doneTask,
}: IProps): React.ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [textMessage, setTextMessage] = useState<string>("");

  const handleOk = async () => {
    try {
      await apiClient[method](setId({ id: taskId, url }), {
        textMessage,
      });
      setDoneTask([...doneTask, taskId]);
      message.success("تسک با موفقیت انجام شد");
    } catch (err) {
      message.error(err.message);
    }
    setIsModalOpen(false);
    setTextMessage("");
  };

  return (
    <>
      <Flex wrap gap="small">
        <Tooltip title="تسک انجام شود">
          <Button
            onClick={() => setIsModalOpen(true)}
            type="primary"
            icon={<CheckOutlined />}
          />
        </Tooltip>
      </Flex>

      <Modal
        title="تسک انجام شده است؟"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText="بله، انجام شده"
        cancelText="خیر، منصرف شدم"
      >
        <p>امکان بازگشت به حالت فعلی وجود ندارد</p>
        <Input.TextArea
          rows={3}
          placeholder="توضیحات اختیاری (در صورت نیاز وارد کنید)"
          value={textMessage}
          onChange={(e) => setTextMessage(e.target.value)}
        />
      </Modal>
    </>
  );
};
