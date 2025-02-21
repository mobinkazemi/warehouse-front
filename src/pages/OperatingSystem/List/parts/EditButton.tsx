import { Button, Flex, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ROUTES_ENUM } from "../../../../shared/enums/routes.enum";

interface IProps {
  operatingSystemId: number;
}
export const EditButton: React.FC<IProps> = ({ operatingSystemId }: IProps) => {
  const navigator = useNavigate();

  return (
    <Flex wrap gap="small">
      <Tooltip title="ویرایش سیستم عامل">
        <Button
          type="primary"
          onClick={() =>
            navigator(
              ROUTES_ENUM.OS_UPDATE.replace(":id", String(operatingSystemId))
            )
          }
          icon={<EditOutlined />}
        ></Button>
      </Tooltip>
    </Flex>
  );
};
