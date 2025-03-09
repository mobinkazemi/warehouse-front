import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import "./sliderMenuStyle.css";
import { ColorPalletEnum } from "../../shared/enums/colorPallet.enum";
import { ROLE_LOCAL_STORAGE_ENUM } from "../../shared/enums/localStorageRoleKey.enum";
import { TOKEN_KEY_ENUM } from "../../shared/enums/token.enum";
import { ProjectRole } from "../../shared/enums/project.roles.enum";
import { superAdminMenuItems } from "./getSliderMenuByRole/for-super-admin";
import { technicalManagerMenuItems } from "./getSliderMenuByRole/for-technical-manager";
import { othersMenuItems } from "./getSliderMenuByRole/others";
type MenuItem = Required<MenuProps>["items"][number];

let items: MenuItem[] = [];
if (localStorage.getItem(TOKEN_KEY_ENUM.ACCESS)) {
  switch (localStorage.getItem(ROLE_LOCAL_STORAGE_ENUM.ROLE)) {
    case ProjectRole.Super_Admin:
      items = superAdminMenuItems;
      break;
    case ProjectRole.Technical_Manager:
      items = technicalManagerMenuItems;
      break;
    default:
      items = othersMenuItems;
      break;
  }
} else {
  items = [];
}

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
