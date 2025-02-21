import { Button, Flex, Modal, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { BACKEND_ROUTES, setId } from "../../../../../shared/backendRoutes";
import apiClient from "../../../../../configs/axios.config";

interface IProps {
  hardeningId: number;
  setDeletionState: Function;
  deletedHardening: number[];
}
const { method, url } = BACKEND_ROUTES.hardening.delete;

export const DeleteButton: React.FC<IProps> = ({
  hardeningId,
  setDeletionState,
  deletedHardening,
}: IProps): React.ReactElement => {
  const showDeleteConfirm = () => {
    Modal.confirm({
      title: "آیا از حذف این هاردنینگ اطمینان دارید؟",
      content: "امکان بازگشت آن وجود ندارد",
      okText: "بله، حذف شود",
      okType: "danger",
      cancelText: "خیر، منصرف شدم",
      onOk: async () => {
        setDeletionState([...deletedHardening, hardeningId]);
        await apiClient[method](setId({ id: hardeningId, url }));
      },
      onCancel() {
        console.log("User cancelled the deletion");
      },
    });
  };

  return (
    <Flex wrap gap="small">
      <Tooltip title="حذف هاردنینگ">
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
