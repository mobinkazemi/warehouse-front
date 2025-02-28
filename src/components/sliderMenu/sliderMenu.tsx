import React, { useState } from "react";
import { CodepenOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { ROUTES_ENUM } from "../../shared/enums/routes.enum";
import "./sliderMenuStyle.css";
import { ColorPalletEnum } from "../../shared/enums/colorPallet.enum";
import { ROLE_LOCAL_STORAGE_ENUM } from "../../shared/enums/localStorageRoleKey.enum";
import { TOKEN_KEY_ENUM } from "../../shared/enums/token.enum";
import { ProjectRole } from "../../shared/enums/project.roles.enum";
type MenuItem = Required<MenuProps>["items"][number];

let items: MenuItem[] = [];
if (localStorage.getItem(TOKEN_KEY_ENUM.ACCESS)) {
  if (
    localStorage.getItem(ROLE_LOCAL_STORAGE_ENUM.ROLE) ===
    ProjectRole.Super_Admin
  ) {
    items = [
      {
        label: "مدیریت کاربران",
        key: ROUTES_ENUM._USERS_,
        icon: <CodepenOutlined style={{ fontSize: "1.5rem" }} />,
        children: [
          {
            className: "slider-submenu-item-user-list",
            label: "لیست",
            key: ROUTES_ENUM.USERS_LIST,
          },
          {
            className: "slider-submenu-item-user-create",
            label: "ایجاد",
            key: ROUTES_ENUM.USERS_CREATE,
          },
        ],
      },
      {
        label: "مدیریت پروژه ها",
        key: ROUTES_ENUM._PROJECTS_,
        icon: <CodepenOutlined style={{ fontSize: "1.5rem" }} />,
        children: [
          {
            className: "slider-submenu-item-project-list",
            label: "لیست",
            key: ROUTES_ENUM.PROJECTS_LIST,
          },
          {
            className: "slider-submenu-item-project-create",
            label: "ایجاد",
            key: ROUTES_ENUM.PROJECTS_CREATE,
          },
        ],
      },
      {
        label: "مدیریت محصولات",
        key: ROUTES_ENUM._PRODUCT_,
        icon: <CodepenOutlined style={{ fontSize: "1.5rem" }} />,
        children: [
          {
            className: "slider-submenu-item-product-list",
            label: "لیست",
            key: ROUTES_ENUM.PRODUCT_LIST,
          },
          {
            className: "slider-submenu-item-product-create",
            label: "ایجاد",
            key: ROUTES_ENUM.PRODUCT_CREATE,
          },
        ],
      },
      {
        label: "مدیریت دسترسی ها",
        key: ROUTES_ENUM._PERMISSION_,
        icon: <CodepenOutlined style={{ fontSize: "1.5rem" }} />,
        children: [
          {
            className: "slider-submenu-item-product-list",
            label: "لیست نقش ها",
            key: ROUTES_ENUM.ROLE_LIST,
          },
        ],
      },
    ];
  } else if (
    localStorage.getItem(ROLE_LOCAL_STORAGE_ENUM.ROLE) ===
    ProjectRole.Technical_Manager
  ) {
    items = [
      {
        label: "مدیریت وظایف",
        key: ROUTES_ENUM._TASKS_,
        icon: <CodepenOutlined style={{ fontSize: "1.5rem" }} />,
        children: [
          {
            className: "slider-submenu-item-task-todo-list",
            label: "وظایف کنونی نقش کاربر",
            key: ROUTES_ENUM.TASKS_TODO_ROLE_LIST,
          },
          {
            className: "slider-submenu-item-task-done-by-me-list",
            label: "وظایف انجام شده کاربر",
            key: ROUTES_ENUM.TASKS_DONE_BY_ME_LIST,
          },
        ],
      },
    ];
  } else {
    items = [
      {
        label: "مدیریت وظایف",
        key: ROUTES_ENUM._TASKS_,
        icon: <CodepenOutlined style={{ fontSize: "1.5rem" }} />,
        children: [
          {
            className: "slider-submenu-item-task-todo-list",
            label: "وظایف کنونی نقش کاربر",
            key: ROUTES_ENUM.TASKS_TODO_ROLE_LIST,
          },
          {
            className: "slider-submenu-item-task-done-by-me-list",
            label: "وظایف انجام شده کاربر",
            key: ROUTES_ENUM.TASKS_DONE_BY_ME_LIST,
          },
        ],
      },
    ];
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
