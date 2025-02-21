import { Button, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES_ENUM } from "../../../../shared/enums/routes.enum";
import { ColorPalletEnum } from "../../../../shared/enums/colorPallet.enum";

export const contentOfNotLoggedIn = () => {
  const navigator = useNavigate();

  const onClickLogin = () => {
    navigator(ROUTES_ENUM.LOGIN);
  };
  const onClickRegister = () => {
    navigator(ROUTES_ENUM.REGISTER);
  };

  return (
    <Flex justify="center" align="center" vertical>
      <div style={{ marginTop: "5rem", marginBottom: "2rem" }}>
        <h1>لطفا جهت دسترسی به سامانه ابتدا وارد شوید</h1>
      </div>{" "}
      <div>
        <Button
          onClick={onClickRegister}
          type="primary"
          style={{
            width: "6.8rem",
            height: "3rem",
            fontSize: "1.1rem",
            marginBottom: "1rem",
            backgroundColor: ColorPalletEnum.Primary,
          }}
        >
          ثبت نام
        </Button>
      </div>
      <div>
        <Button
          onClick={onClickLogin}
          type="primary"
          style={{
            width: "6.8rem",
            height: "3rem",
            fontSize: "1rem",
            backgroundColor: ColorPalletEnum.Primary,
          }}
        >
          ورود به سامانه
        </Button>
      </div>
    </Flex>
  );
};
