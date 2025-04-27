import React from "react";
import { Layout, MenuProps } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ROUTES_ENUM } from "../shared/enums/routes.enum";
import TopNavigation from "./topNavigation/TopNavigation";
import SliderMenu from "./sliderMenu/sliderMenu";
import { ColorPalletEnum } from "../shared/enums/colorPallet.enum";
const { Header, Sider, Content, Footer } = Layout;

const BaseLayout: React.FC = () => {
  const navigator = useNavigate();
  const { pathname } = useLocation();
  const [current, setCurrent] = React.useState<string>(pathname);

  const onClick = (e: MouseEvent, key: string) => {
    e?.stopPropagation();
    setCurrent(key);
    navigator(key);
  };
  
  return (
    <Layout style={{ minHeight: "100vh", direction: "rtl", display: "flex" }}>
      {/* Top Navigation */}
      <Sider
        style={{
          background: ColorPalletEnum.WhiteBackground,
          textAlign: "right",
          position: "relative",
        }}
        width={256}
      >
        <SliderMenu onClick={onClick as any} current={current} />
      </Sider>
      <Layout>
        {/* Right Sidebar */}

        {/* Content Area */}
        <Content
          className="shadow-lg"
          style={{
            margin: "16px",
            padding: "24px",
            background: ColorPalletEnum.WhiteContentBackground,
            borderRadius: "24px",
            borderBottom: `2px solid ${ColorPalletEnum.Border}`,
            overflow: "auto",
            maxHeight: "100vh",
          }}
        >
          <Outlet />
        </Content>
      </Layout>

      {/* Footer */}
    </Layout>
  );
};

export default BaseLayout;
