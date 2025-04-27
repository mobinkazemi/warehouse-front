import { Button, Flex, message, Modal, Tooltip } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import apiClient from "../../../../configs/axios.config";
import { BACKEND_ROUTES, setId } from "../../../../shared/backendRoutes";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
    <Flex
      wrap
      gap="small"
      onClick={showStartConfirm}
      className="cursor-pointer"
    >
      <Tooltip title="شروع فرآیند">
        <div
          className="w-full flex items-center justify-center space-x-2 rtl:space-x-reverse !bg-orange-500 hover:bg-orange-600 !text-white py-3 px-4 rounded-lg transition-colors duration-300 font-medium"
        >
          <span>شروع فرایند</span>
          <ArrowLeft />
        </div>
      </Tooltip>
    </Flex>
  );
};
