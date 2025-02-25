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
  };
  project: {
    create: IRoute;
    list: IRoute;
    update: IRoute;
    info: IRoute;
    delete: IRoute;
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
  },
  project: {
    create: { method: "post", url: "/projects/create" },
    update: { method: "patch", url: "/projects/update/:id" },
    list: { method: "get", url: "/projects/list" },
    info: { method: "get", url: "/projects/byId/:id" },
    delete: { method: "delete", url: "/projects/delete/:id" },
  },
};
