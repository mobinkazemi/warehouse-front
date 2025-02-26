import { Button, Flex, Modal, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import apiClient from "../../../../configs/axios.config";
import { BACKEND_ROUTES, setId } from "../../../../shared/backendRoutes";

interface IProps {
  productId: string;
  setDeletedProduct: Function;
  deletedProduct: number[];
}
const { method, url } = BACKEND_ROUTES.product.delete;

/**
 * DeleteButton component
 *
 * This component represents a button which can be used to delete a product.
 *
 * @param {IProps} data - The props for the DeleteButton component.
 * @param {number} data.productId - The ID of the product to be deleted.
 * @returns {ReactElement} The DeleteButton component.
 */
export const DeleteButton: React.FC<IProps> = ({
  productId,
  setDeletedProduct,
  deletedProduct,
}: IProps): React.ReactElement => {
  const showDeleteConfirm = () => {
    Modal.confirm({
      title: "آیا از حذف این محصول اطمینان دارید؟",
      content: "امکان بازگشت این محصول وجود ندارد",
      okText: "بله، حذف شود",
      okType: "danger",
      cancelText: "خیر، منصرف شدم",
      onOk: async () => {
        setDeletedProduct([...deletedProduct, productId]);
        await apiClient[method](setId({ id: productId, url }));
      },
      onCancel() {
        console.log("Product cancelled the deletion");
      },
    });
  };

  return (
    <Flex wrap gap="small">
      <Tooltip title="حذف محصول">
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
