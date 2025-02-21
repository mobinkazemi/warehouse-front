import { Button, Flex, Modal, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { BACKEND_ROUTES, setId } from "../../../../shared/backendRoutes";
import apiClient from "../../../../configs/axios.config";

interface IProps {
  operatingSystemId: number;
  setDeletionState: Function;
  deletedOperatingSystem: number[];
}
const { method, url } = BACKEND_ROUTES.operatingSystem.delete;

export const DeleteButton: React.FC<IProps> = ({
  operatingSystemId,
  setDeletionState,
  deletedOperatingSystem,
}: IProps): React.ReactElement => {
  const showDeleteConfirm = () => {
    Modal.confirm({
      title: "آیا از حذف این سیستم عامل اطمینان دارید؟",
      content: "امکان بازگشت آن وجود ندارد",
      okText: "بله، حذف شود",
      okType: "danger",
      cancelText: "خیر، منصرف شدم",
      onOk: async () => {
        setDeletionState([...deletedOperatingSystem, operatingSystemId]);
        await apiClient[method](setId({ id: operatingSystemId, url }));
      },
      onCancel() {
        console.log("User cancelled the deletion");
      },
    });
  };

  return (
    <Flex wrap gap="small">
      <Tooltip title="حذف سیستم عامل">
        <Button
          onClick={showDeleteConfirm}
          type="primary"
          danger
          icon={<DeleteOutlined />}
        ></Button>
      </Tooltip>
    </Flex>
  );
};
