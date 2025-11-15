import { ROUTES_ENUM } from "../../../shared/enums/routes.enum";
import { CodepenOutlined } from "@ant-design/icons";
import {
  Users,
  FolderKanban,
  Package,
  ShieldCheck,
  Workflow,
  CheckSquare,
} from "lucide-react";

export const othersMenuItems = [
  {
    label: "مدیریت پروژه ها",
    key: ROUTES_ENUM._PROJECTS_,
    icon: <FolderKanban style={{ fontSize: "1.5rem" }} />,
    // children: [
    //   {
    //     className: "slider-submenu-item-project-list",
    //     label: "لیست",
    //     key: ROUTES_ENUM.PROJECTS_LIST,
    //   },
    //   {
    //     className: "slider-submenu-item-project-create",
    //     label: "ایجاد",
    //     key: ROUTES_ENUM.PROJECTS_CREATE,
    //   },
    // ],
  },
  {
    label: "مدیریت محصولات",
    key: ROUTES_ENUM._PRODUCT_,
    icon: <Package style={{ fontSize: "1.5rem" }} />,
    // children: [
    //   {
    //     className: "slider-submenu-item-product-list",
    //     label: "لیست",
    //     key: ROUTES_ENUM.PRODUCT_LIST,
    //   },
    //   {
    //     className: "slider-submenu-item-product-create",
    //     label: "ایجاد",
    //     key: ROUTES_ENUM.PRODUCT_CREATE,
    //   },
    // ],
  },
  {
    label: "مدیریت فرایند ها",
    key: ROUTES_ENUM._WORKFLOW_,
    icon: <Workflow style={{ fontSize: "1.5rem" }} />,
    children: [
      // {
      //   className: "slider-submenu-item-workflow-list",
      //   label: "لیست فرایند ها",
      //   key: ROUTES_ENUM.WORKFLOW_LIST,
      // },
      // {
      //   className: "slider-submenu-item-workflow-create",
      //   label: "ایجاد فرایند",
      //   key: ROUTES_ENUM.WORKFLOW_CREATE,
      // },
      {
        className: "slider-submenu-item-workflow-start-role-list",
        label: "شروع فرایند",
        key: ROUTES_ENUM.WORKFLOW_START_ROLE_LIST,
      },
    ],
  },
  {
    label: "مدیریت وظایف",
    key: ROUTES_ENUM._TASKS_,
    icon: <CodepenOutlined style={{ fontSize: "1.5rem" }} />,
    children: [
      {
        className: "slider-submenu-item-workflow-todo-role-list",
        label: "تسک های فعلی",
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
