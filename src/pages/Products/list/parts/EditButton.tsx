import { Button, Flex, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ROUTES_ENUM } from "../../../../shared/enums/routes.enum";

interface IProps {
  productId: string;
}
export const EditButton: React.FC<IProps> = ({ productId }: IProps) => {
  const navigator = useNavigate();

  return (
    <Flex wrap gap="small">
      <Tooltip title="ویرایش محصول">
        <Button
          type="primary"
          onClick={() =>
            navigator(
              ROUTES_ENUM.PRODUCT_UPDATE.replace(":id", String(productId))
            )
          }
          icon={<EditOutlined />}
        ></Button>
      </Tooltip>
    </Flex>
  );
};
