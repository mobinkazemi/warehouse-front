import { Button, Flex, message, Modal, Tooltip } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { BACKEND_ROUTES, setId } from "../../../../shared/backendRoutes";
import apiClient from "../../../../configs/axios.config";

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
  const showAcceptanceConfirmModal = () => {
    Modal.confirm({
      title: "تسک انجام شده است؟",
      content: "امکان بازگشت به حالت فعلی وجود ندارد",
      okText: "بله، انجام شده",
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
      <Tooltip title="تسک انجام شود">
        <Button
          onClick={showAcceptanceConfirmModal}
          type="primary"
          icon={<CheckOutlined />}
        ></Button>
      </Tooltip>
    </Flex>
  );
};
