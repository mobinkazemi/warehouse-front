import { Button, Flex, message, Modal, Tooltip } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { BACKEND_ROUTES, setId } from "../../../../shared/backendRoutes";
import apiClient from "../../../../configs/axios.config";

interface IProps {
  taskId: string;
  setDoneTask: Function;
  doneTask: string[];
}
const { method, url } =
  BACKEND_ROUTES.workflow.engine.doneAndRejectWorkflowTask;

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
        apiClient[method](setId({ id: taskId, url }))
          .then((res) => {
            setDoneTask([...doneTask, taskId]);
          })
          .catch((err) => {
            message.error("در انجام عملیات خطایی رخ داده است");
          });
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
