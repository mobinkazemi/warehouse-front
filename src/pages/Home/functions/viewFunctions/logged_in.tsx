import { Flex } from "antd";

export const LoggedInContent = () => {
  return (
    <>
      <Flex justify="center" align="center" vertical>
        <div
          style={{ marginTop: "5rem", marginBottom: "2rem", direction: "rtl" }}
        >
          <div>
            <h1>شما در سامانه وارد شده‌اید...</h1>
          </div>
          <div>
            {" "}
            <h1>برای استفاده از امکانات سامانه از منوی بالا استفاده نمایید </h1>
          </div>{" "}
        </div>{" "}
      </Flex>
    </>
  );
};
