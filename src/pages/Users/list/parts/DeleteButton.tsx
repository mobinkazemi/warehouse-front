import { Button, Flex, Modal, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import apiClient from "../../../../configs/axios.config";
import { BACKEND_ROUTES, setId } from "../../../../shared/backendRoutes";

interface IProps {
  userId: number;
  setDeletedUser: Function;
  deletedUser: number[];
}
const { method, url } = BACKEND_ROUTES.user.delete;

/**
 * DeleteButton component
 *
 * This component represents a button which can be used to delete a user.
 *
 * @param {IProps} data - The props for the DeleteButton component.
 * @param {number} data.userId - The ID of the user to be deleted.
 * @returns {ReactElement} The DeleteButton component.
 */
export const DeleteButton: React.FC<IProps> = ({
  userId,
  setDeletedUser,
  deletedUser,
}: IProps): React.ReactElement => {
  const showDeleteConfirm = () => {
    Modal.confirm({
      title: "آیا از حذف این کاربر اطمینان دارید؟",
      content: "امکان بازگشت این کاربر وجود ندارد",
      okText: "بله، حذف شود",
      okType: "danger",
      cancelText: "خیر، منصرف شدم",
      onOk: async () => {
        setDeletedUser([...deletedUser, userId]);
        await apiClient[method](setId({ id: userId, url }));
      },
      onCancel() {
        console.log("User cancelled the deletion");
      },
    });
  };

  return (
    <Flex wrap gap="small">
      <Tooltip title="حذف کاربر">
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
