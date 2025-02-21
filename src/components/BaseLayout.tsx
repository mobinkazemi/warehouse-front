import React from "react";
import { Layout, MenuProps } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { ROUTES_ENUM } from "../shared/enums/routes.enum";
import TopNavigation from "./topNavigation/TopNavigation";
import SliderMenu from "./sliderMenu/sliderMenu";
import { ColorPalletEnum } from "../shared/enums/colorPallet.enum";
const { Header, Sider, Content, Footer } = Layout;

const BaseLayout: React.FC = () => {
  const navigator = useNavigate();
  const [_, setCurrent] = React.useState<string>(ROUTES_ENUM.HOME);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);

    switch (e.key) {
      case ROUTES_ENUM.HOME:
        navigator(ROUTES_ENUM.HOME);
        break;

      //
      //
      //
      //
      // SWITCHES
      //
      case ROUTES_ENUM.SWITCHES_LIST:
        navigator(ROUTES_ENUM.SWITCHES_LIST);
        break;

      case ROUTES_ENUM.SWITCHES_CREATE:
        navigator(ROUTES_ENUM.SWITCHES_CREATE);
        break;

      //
      //
      //
      //
      // CIS
      //
      case ROUTES_ENUM.CIS_LIST:
        navigator(ROUTES_ENUM.CIS_LIST);
        break;

      case ROUTES_ENUM.CIS_CREATE:
        navigator(ROUTES_ENUM.CIS_CREATE);
        break;

      //
      //
      //
      //
      // CATEGORY
      //
      case ROUTES_ENUM.CATEGORY_CREATE:
        navigator(ROUTES_ENUM.CATEGORY_CREATE);
        break;

      case ROUTES_ENUM.CATEGORY_LIST:
        navigator(ROUTES_ENUM.CATEGORY_LIST);
        break;

      //
      //
      //
      //
      // HARDENING
      //
      case ROUTES_ENUM.HARDENING_CREATE:
        navigator(ROUTES_ENUM.HARDENING_CREATE);
        break;
      case ROUTES_ENUM.HARDENING_LIST:
        navigator(ROUTES_ENUM.HARDENING_LIST);
        break;
      //
      //
      //
      //
      // OPERATING SYSTEM
      //
      case ROUTES_ENUM.OS_LIST:
        navigator(ROUTES_ENUM.OS_LIST);
        break;
    }
  };
  return (
    <Layout style={{ minHeight: "100vh", direction: "rtl" }}>
      {/* Top Navigation */}
      <Header>
        <TopNavigation />
      </Header>

      <Layout>
        {/* Right Sidebar */}
        <Sider
          style={{
            background: ColorPalletEnum.WhiteBackground,
            textAlign: "right",
          }}
          width={256}
        >
          <SliderMenu onClick={onClick as any} />
        </Sider>

        {/* Content Area */}
        <Content
          style={{
            margin: "16px",
            padding: "16px",
            background: ColorPalletEnum.WhiteContentBackground,
            borderRadius: "10px",
            borderBottom: `2px solid ${ColorPalletEnum.Border}`,
            overflow: "auto",
            maxHeight: "100vh",
          }}
        >
          <Outlet />
        </Content>
      </Layout>

      {/* Footer */}
      <Footer style={{ textAlign: "center" }}>Netoran ©2025</Footer>
    </Layout>
  );
};

export default BaseLayout;
