import { Button, Flex, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ROUTES_ENUM } from "../../../../../shared/enums/routes.enum";

interface IProps {
  categoryId: number;
}
export const EditButton: React.FC<IProps> = ({ categoryId }: IProps) => {
  const navigator = useNavigate();

  return (
    <Flex wrap gap="small">
      <Tooltip title="ویرایش هاردنینگ">
        <Button
          type="primary"
          onClick={() =>
            navigator(
              ROUTES_ENUM.HARDENING_UPDATE.replace(":id", String(categoryId))
            )
          }
          icon={<EditOutlined />}
        ></Button>
      </Tooltip>
    </Flex>
  );
};
