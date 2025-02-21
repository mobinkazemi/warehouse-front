import { Button, Flex, Modal, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { BACKEND_ROUTES, setId } from "../../../../../shared/backendRoutes";
import apiClient from "../../../../../configs/axios.config";

interface IProps {
  categoryId: number;
  setDeletionState: Function;
  deletedCategory: number[];
}
const { method, url } = BACKEND_ROUTES.category.delete;

export const DeleteButton: React.FC<IProps> = ({
  categoryId,
  setDeletionState,
  deletedCategory,
}: IProps): React.ReactElement => {
  const showDeleteConfirm = () => {
    Modal.confirm({
      title: "آیا از حذف این سی آی اس اطمینان دارید؟",
      content: "امکان بازگشت آن وجود ندارد",
      okText: "بله، حذف شود",
      okType: "danger",
      cancelText: "خیر، منصرف شدم",
      onOk: async () => {
        setDeletionState([...deletedCategory, categoryId]);
        await apiClient[method](setId({ id: categoryId, url }));
      },
      onCancel() {
        console.log("User cancelled the deletion");
      },
    });
  };

  return (
    <Flex wrap gap="small">
      <Tooltip title="حذف سی آی اس">
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
