import React, { useState } from "react";
import {
  CodepenOutlined,
  SecurityScanOutlined,
  LinuxOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { ROUTES_ENUM } from "../../shared/enums/routes.enum";
import "./sliderMenuStyle.css";
import { v4 } from "uuid";
import { ColorPalletEnum } from "../../shared/enums/colorPallet.enum";
type MenuItem = Required<MenuProps>["items"][number];
enum NavKeys {
  HOME_PAGE = "HOME PAGE",
  SWITCHES = "SWITCHES",
  SWITCHES_LIST = "SWITCHES LIST",
  SWITCHES_CREATE = "SWITCHES CREATE",
  ROUTERS = "ROUTERS",
}
const items: MenuItem[] = [
  // {
  //   label: "صفحه اصلی",
  //   key: ROUTES_ENUM.HOME,
  //   icon: (
  //     <Icon
  //       component={() => (
  //         <img style={{ width: "60px" }} src="/douranLogo.png" />
  //       )}
  //     />
  //   ),
  // },
  {
    label: "تجهیزات",
    key: ROUTES_ENUM.__SWITCHES__,
    icon: <CodepenOutlined style={{ fontSize: "1.5rem" }} />,
    children: [
      {
        type: "submenu",
        className: "slider-submenu-title",
        key: v4(),
        label: "سوییچ ها",
        children: [
          {
            className: "slider-submenu-item",
            label: "لیست",
            key: ROUTES_ENUM.SWITCHES_LIST,
          },
          {
            className: "slider-submenu-item",
            label: "ایجاد",
            key: ROUTES_ENUM.SWITCHES_CREATE,
          },
        ],
      },
      {
        label: "روتر ها",
        key: NavKeys.ROUTERS,
        icon: <CodepenOutlined />,
        disabled: true,
      },
    ],
  },
  {
    label: "مدیریت هاردنینگ",
    key: ROUTES_ENUM.__CIS__,
    icon: <SecurityScanOutlined style={{ fontSize: "1.5rem" }} />,
    children: [
      {
        type: "submenu",
        className: "slider-submenu-title",
        key: v4(),
        label: "سی‌ آی‌ اس",
        children: [
          {
            className: "slider-submenu-item",
            label: "لیست",
            key: ROUTES_ENUM.CIS_LIST,
            disabled: false,
          },
          {
            className: "slider-submenu-item",
            label: "ایجاد",
            key: ROUTES_ENUM.CIS_CREATE,
            disabled: false,
          },
        ],
      },
      {
        type: "submenu",
        className: "slider-submenu-title",

        key: v4(),
        label: "دسته بندی",
        children: [
          {
            className: "slider-submenu-item",
            label: "لیست",
            key: ROUTES_ENUM.CATEGORY_LIST,
            disabled: false,
          },
          {
            className: "slider-submenu-item",
            label: "ایجاد",
            key: ROUTES_ENUM.CATEGORY_CREATE,
            disabled: false,
          },
        ],
      },
      {
        type: "submenu",
        className: "slider-submenu-title",

        key: v4(),
        label: "هاردنینگ",
        children: [
          {
            className: "slider-submenu-item",
            label: "لیست",
            key: ROUTES_ENUM.HARDENING_LIST,
            disabled: false,
          },
          {
            className: "slider-submenu-item",
            label: "ایجاد",
            key: ROUTES_ENUM.HARDENING_CREATE,
            disabled: false,
          },
        ],
      },
    ],
  },
  {
    label: "سیستم عامل",
    key: ROUTES_ENUM.__OS__,
    icon: <LinuxOutlined style={{ fontSize: "1.5rem" }} />,
    children: [
      {
        label: "لیست",
        key: ROUTES_ENUM.OS_LIST,
      },
    ],
  },
];

interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

const levelKeys = getLevelKeys(items as LevelKeysProps[]);

// Update SliderMenu component to accept onClick as a prop
interface SliderMenuProps {
  onClick: () => void; // Define the onClick prop type here
}

const SliderMenu: React.FC<SliderMenuProps> = ({ onClick }) => {
  // Pass onClick to the component
  const [stateOpenKeys, setStateOpenKeys] = useState(["2", "23"]);

  const onOpenChange: MenuProps["onOpenChange"] = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };

  return (
    <Menu
      onClick={onClick} // Pass the onClick function here
      mode="inline"
      defaultSelectedKeys={["231"]}
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      style={{
        width: 256,
        marginTop: "17px",
        marginRight: "8px",
        borderRadius: "10px",
        borderBottom: `2px solid ${ColorPalletEnum.Border}`,
        borderRight: `2px solid ${ColorPalletEnum.Border}`,
        fontWeight: "bold", // Set default text boldness for all menu items
        fontSize: "16px", // Set default font size
      }}
      items={items}
    />
  );
};

export default SliderMenu;
