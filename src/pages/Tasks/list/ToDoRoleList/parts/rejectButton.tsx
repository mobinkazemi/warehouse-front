import { Button, Flex, Modal, Tooltip } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { BACKEND_ROUTES } from "../../../../../shared/backendRoutes";
import apiClient from "../../../../../configs/axios.config";
interface IProps {
  taskId: string;
  setDoneTask: Function;
  doneTask: string[];
}
const { method, url } = BACKEND_ROUTES.task.done;

export const RejectButton: React.FC<IProps> = ({
  taskId,
  setDoneTask,
  doneTask,
}: IProps): React.ReactElement => {
  const showRejectConfirmModal = () => {
    Modal.confirm({
      title: "تسک رد شده است؟",
      content: "امکان بازگشت به حالت فعلی وجود ندارد",
      okText: "بله، رد شود",
      okType: "danger",
      cancelText: "خیر، منصرف شدم",
      onOk: async () => {
        setDoneTask([...doneTask, taskId]);
        await apiClient[method](url, { taskId, taskCheck: "reject" });
      },
      onCancel() {
        console.log("task done rejected");
      },
    });
  };

  return (
    <Flex wrap gap="small">
      <Tooltip title="تسک رد شود">
        <Button
          onClick={showRejectConfirmModal}
          type="primary"
          danger
          icon={<CloseOutlined />}
        ></Button>
      </Tooltip>
    </Flex>
  );
};
