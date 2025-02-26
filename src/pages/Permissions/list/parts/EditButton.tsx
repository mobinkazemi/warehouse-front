import { Button, Flex, Tooltip } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ROUTES_ENUM } from "../../../../shared/enums/routes.enum";

interface IProps {
  permissionId: string;
}
export const EditButton: React.FC<IProps> = ({ permissionId }: IProps) => {
  const navigator = useNavigate();

  return (
    <Flex wrap gap="small">
      <Tooltip title="ویرایش نقش های مرتبط">
        <Button
          type="primary"
          onClick={() =>
            navigator(
              ROUTES_ENUM.PERMISSION_UPDATE.replace(":id", String(permissionId))
            )
          }
          icon={<SettingOutlined />}
        ></Button>
      </Tooltip>
    </Flex>
  );
};
