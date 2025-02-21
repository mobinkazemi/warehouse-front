import { Button, Flex, Tooltip } from "antd";
import { SafetyOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ROUTES_ENUM } from "../../../../shared/enums/routes.enum";
import { ISwitch } from "../../../../shared/interfaces/switch.interface";

interface IProps {
  disable: boolean;
  switch: ISwitch;
}
export const HardeningButton: React.FC<IProps> = (data: IProps) => {
  const navigator = useNavigate();

  if (data.disable) {
    return (
      <Flex wrap gap="small">
        <Button
          disabled
          style={{ backgroundColor: "lightgray" }}
          type="primary"
          icon={<SafetyOutlined />}
        ></Button>
      </Flex>
    );
  } else
    return (
      <Flex wrap gap="small">
        <Tooltip title="عملیات هاردنینگ">
          <Button
            style={{ backgroundColor: "orange" }}
            type="primary"
            icon={<SafetyOutlined />}
            onClick={() => {
              navigator(
                ROUTES_ENUM.SWITCHES_PREPAGES_HARDENING.replace(
                  ":switchId",
                  String(data.switch.id)
                )
              );
            }}
          ></Button>
        </Tooltip>
      </Flex>
    );
};
