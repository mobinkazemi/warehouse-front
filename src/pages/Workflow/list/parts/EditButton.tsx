import { Button, Flex, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ROUTES_ENUM } from "../../../../shared/enums/routes.enum";

interface IProps {
  projectId: string;
}
export const EditButton: React.FC<IProps> = ({ projectId }: IProps) => {
  const navigator = useNavigate();

  return (
    <Flex wrap gap="small">
      <Tooltip title="ویرایش پروژه">
        <Button
          type="primary"
          onClick={() =>
            navigator(
              ROUTES_ENUM.PROJECTS_UPDATE.replace(":id", String(projectId))
            )
          }
          icon={<EditOutlined />}
        ></Button>
      </Tooltip>
    </Flex>
  );
};
