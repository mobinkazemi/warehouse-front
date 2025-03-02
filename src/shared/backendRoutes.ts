type methods = "post" | "patch" | "get" | "delete";

export const setId = ({ id, url }: { id: string | number; url: string }) => {
  return url.replace(":id", String(id));
};
export interface IRoute {
  method: methods;
  url: string;
}

interface IBackendRoutes {
  auth: {
    login: IRoute;
    register: IRoute;
  };
  user: {
    myself: IRoute;
    list: IRoute;
    delete: IRoute;
    info: IRoute;
    update: IRoute;
  };
  role: {
    list: IRoute;
    getCurrentPermissions: IRoute;
  };
  project: {
    create: IRoute;
    list: IRoute;
    update: IRoute;
    info: IRoute;
    delete: IRoute;
  };
  product: {
    create: IRoute;
    list: IRoute;
    update: IRoute;
    info: IRoute;
    delete: IRoute;
  };
  permission: {
    list: IRoute;
    update: IRoute;
    info: IRoute;
    addRoleToPermission: IRoute;
    removeRoleFromPermission: IRoute;
  };
  task: {
    todoRoleList: IRoute;
    doneByMyUserList: IRoute;
    done: IRoute;
  };
  file: {
    download: IRoute;
  };
  unit: {
    list: IRoute;
  };
}

export const BACKEND_ROUTES: IBackendRoutes = {
  auth: {
    login: {
      method: "post",
      url: "/auth/login",
    },
    register: {
      method: "post",
      url: "/auth/signup",
    },
  },
  user: {
    myself: { method: "get", url: "/users/myself" },
    list: { method: "get", url: "/users/list" },
    delete: { method: "delete", url: "/users/delete" },
    info: { method: "get", url: "/users/byId/:id" },
    update: { method: "patch", url: "/users/update/:id" },
  },
  role: {
    list: { method: "get", url: "/roles/list" },
    getCurrentPermissions: { method: "get", url: "/roles/get-permissions/:id" },
  },
  project: {
    create: { method: "post", url: "/projects/create" },
    update: { method: "patch", url: "/projects/update/:id" },
    list: { method: "get", url: "/projects/list" },
    info: { method: "get", url: "/projects/byId/:id" },
    delete: { method: "delete", url: "/projects/delete/:id" },
  },
  product: {
    create: { method: "post", url: "/products/create" },
    update: { method: "patch", url: "/products/update/:id" },
    list: { method: "get", url: "/products/list" },
    info: { method: "get", url: "/products/byId/:id" },
    delete: { method: "delete", url: "/products/delete/:id" },
  },
  permission: {
    update: { method: "patch", url: "/permissions/update/:id" },
    list: { method: "get", url: "/permissions/list" },
    info: { method: "get", url: "/permissions/byId/:id" },
    addRoleToPermission: { method: "post", url: "/permissions/addRole" },
    removeRoleFromPermission: {
      method: "delete",
      url: "/permissions/removeRole",
    },
  },
  task: {
    todoRoleList: { method: "get", url: "/taskManagement/todo" },
    done: {
      method: "post",
      url: "/taskManagement/done",
    },
    doneByMyUserList: {
      method: "get",
      url: "/taskManagement/userDonedTasks",
    },
  },
  file: {
    download: {
      method: "get",
      url: "/files/byId/:id",
    },
  },
  unit: {
    list: { method: "get", url: "/unit/list" },
  },
};
