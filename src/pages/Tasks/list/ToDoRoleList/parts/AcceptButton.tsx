import { Button, Flex, Modal, Tooltip } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { BACKEND_ROUTES, setId } from "../../../../../shared/backendRoutes";
import apiClient from "../../../../../configs/axios.config";
interface IProps {
  taskId: string;
  setDoneTask: Function;
  doneTask: string[];
}
const { method, url } = BACKEND_ROUTES.task.done;

export const AcceptButton: React.FC<IProps> = ({
  taskId,
  setDoneTask,
  doneTask,
}: IProps): React.ReactElement => {
  const showAcceptanceConfirmModal = () => {
    Modal.confirm({
      title: "تسک انجام شده است؟",
      content: "امکان بازگشت به حالت فعلی وجود ندارد",
      okText: "بله، انجام شده",
      okType: "danger",
      cancelText: "خیر، منصرف شدم",
      onOk: async () => {
        setDoneTask([...doneTask, taskId]);
        await apiClient[method](url, { taskId, taskCheck: "verify" });
      },
      onCancel() {
        console.log("task done rejected");
      },
    });
  };

  return (
    <Flex wrap gap="small">
      <Tooltip title="تسک انجام شد">
        <Button
          onClick={showAcceptanceConfirmModal}
          type="primary"
          icon={<CheckOutlined />}
        ></Button>
      </Tooltip>
    </Flex>
  );
};
