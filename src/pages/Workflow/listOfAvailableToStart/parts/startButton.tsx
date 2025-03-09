import { Button, Flex, message, Modal, Tooltip } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import apiClient from "../../../../configs/axios.config";
import { BACKEND_ROUTES, setId } from "../../../../shared/backendRoutes";

interface IProps {
  workflowId: string;
}
const { method, url } = BACKEND_ROUTES.workflow.engine.startWorkflow;

export const StartButton: React.FC<IProps> = ({
  workflowId,
}: IProps): React.ReactElement => {
  const showStartConfirm = () => {
    Modal.confirm({
      title: "آیا از شروع این فرآیند اطمینان دارید؟",
      okText: "بله، شروع شود",
      okType: "primary",
      cancelText: "خیر، منصرف شدم",
      onOk: () => {
        apiClient[method](setId({ id: workflowId, url }))
          .then((res) => {
            message.success("فرآیند شروع شد");
          })
          .catch((e) => {
            message.error(e.response.data.message);
          });
      },
      onCancel() {
        console.log("Workflow cancelled");
      },
    });
  };

  return (
    <Flex wrap gap="small">
      <Tooltip title="شروع فرآیند">
        <Button
          onClick={showStartConfirm}
          type="primary"
          icon={<PlayCircleOutlined />}
        ></Button>
      </Tooltip>
    </Flex>
  );
};
