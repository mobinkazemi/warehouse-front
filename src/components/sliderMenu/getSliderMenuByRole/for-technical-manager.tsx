import { ROUTES_ENUM } from "../../../shared/enums/routes.enum";
import { CodepenOutlined } from "@ant-design/icons";
export const technicalManagerMenuItems = [
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
