import { Button, Flex, Modal, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import apiClient from "../../../../configs/axios.config";
import { BACKEND_ROUTES, setId } from "../../../../shared/backendRoutes";

interface IProps {
  switchId: number;
  setDeletedSwitch: Function;
  deletedSwitch: number[];
}
const { method, url } = BACKEND_ROUTES.switch.delete;

/**
 * DeleteButton component
 *
 * This component represents a button which can be used to delete a switch.
 *
 * @param {IProps} data - The props for the DeleteButton component.
 * @param {number} data.switchId - The ID of the switch to be deleted.
 * @returns {ReactElement} The DeleteButton component.
 */
export const DeleteButton: React.FC<IProps> = ({
  switchId,
  setDeletedSwitch,
  deletedSwitch,
}: IProps): React.ReactElement => {
  const showDeleteConfirm = () => {
    Modal.confirm({
      title: "آیا از حذف این سوییچ اطمینان دارید؟",
      content: "امکان بازگشت این سوییچ وجود ندارد",
      okText: "بله، حذف شود",
      okType: "danger",
      cancelText: "خیر، منصرف شدم",
      onOk: async () => {
        setDeletedSwitch([...deletedSwitch, switchId]);
        await apiClient[method](setId({ id: switchId, url }));
      },
      onCancel() {
        console.log("User cancelled the deletion");
      },
    });
  };

  return (
    <Flex wrap gap="small">
      <Tooltip title="حذف سوییچ">
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
