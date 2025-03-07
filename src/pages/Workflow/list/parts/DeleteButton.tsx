import { Button, Flex, Modal, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import apiClient from "../../../../configs/axios.config";
import { BACKEND_ROUTES, setId } from "../../../../shared/backendRoutes";

interface IProps {
  projectId: string;
  setDeletedProject: Function;
  deletedProject: number[];
}
const { method, url } = BACKEND_ROUTES.project.delete;

/**
 * DeleteButton component
 *
 * This component represents a button which can be used to delete a project.
 *
 * @param {IProps} data - The props for the DeleteButton component.
 * @param {number} data.projectId - The ID of the project to be deleted.
 * @returns {ReactElement} The DeleteButton component.
 */
export const DeleteButton: React.FC<IProps> = ({
  projectId,
  setDeletedProject,
  deletedProject,
}: IProps): React.ReactElement => {
  const showDeleteConfirm = () => {
    Modal.confirm({
      title: "آیا از حذف این کاربر اطمینان دارید؟",
      content: "امکان بازگشت این کاربر وجود ندارد",
      okText: "بله، حذف شود",
      okType: "danger",
      cancelText: "خیر، منصرف شدم",
      onOk: async () => {
        setDeletedProject([...deletedProject, projectId]);
        await apiClient[method](setId({ id: projectId, url }));
      },
      onCancel() {
        console.log("Project cancelled the deletion");
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
