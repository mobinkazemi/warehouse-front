import { Button, Flex, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ROUTES_ENUM } from "../../../../shared/enums/routes.enum";

interface IProps {
  userId: number;
}
export const EditButton: React.FC<IProps> = ({ userId }: IProps) => {
  const navigator = useNavigate();

  return (
    <Flex wrap gap="small">
      <Tooltip title="ویرایش کاربر">
        <Button
          type="primary"
          onClick={() =>
            navigator(ROUTES_ENUM.USERS_UPDATE.replace(":id", String(userId)))
          }
          icon={<EditOutlined />}
        ></Button>
      </Tooltip>
    </Flex>
  );
};
