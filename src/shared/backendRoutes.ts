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
  };
  switch: {
    create: IRoute;
    info: IRoute;
    list: IRoute;
    update: IRoute;
    delete: IRoute;
    execCommand: IRoute;
    createAsset: IRoute;
    checkHardening: IRoute;
    checkConnectionStatus: IRoute;
    hardeningSummaryDetail: IRoute;
  };
  cis: {
    create: IRoute;
    delete: IRoute;
    list: IRoute;
    info: IRoute;
    update: IRoute;
  };
  category: {
    create: IRoute;
    info: IRoute;
    update: IRoute;
    list: IRoute;
    categorizedlist: IRoute;
    delete: IRoute;
  };
  hardening: {
    create: IRoute;
    list: IRoute;
    delete: IRoute;
    info: IRoute;
    update: IRoute;
  };
  hardeningResult: {
    switches: {
      detailList: IRoute;
      version: IRoute;
    };
  };
  operatingSystem: {
    create: IRoute;
    delete: IRoute;
    info: IRoute;
    list: IRoute;
    update: IRoute;
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
  user: { myself: { method: "get", url: "/users/myself" } },
  switch: {
    create: {
      method: "post",
      url: "/switches/create",
    },
    info: {
      method: "get",
      url: "/switches/info/:id",
    },
    delete: {
      method: "delete",
      url: "/switches/delete/:id",
    },
    list: { method: "get", url: "/switches/list" },
    update: {
      method: "patch",
      url: "/switches/update",
    },
    execCommand: { method: "post", url: "/switches/execCommand" },
    checkHardening: {
      method: "get",
      url: "/switches/hardeningCheckNew/:id",
    },
    checkConnectionStatus: {
      method: "get",
      url: "/switches/checkConnectionStatus",
    },
    createAsset: {
      method: "post",
      url: "/switches/createAsset/:id",
    },
    hardeningSummaryDetail: {
      method: "get",
      url: "/switches/hardeningSummaryDetail/:id",
    },
  },
  cis: {
    create: {
      method: "post",
      url: "/cis/create",
    },
    delete: {
      method: "delete",
      url: "/cis/delete/:id",
    },
    list: {
      method: "get",
      url: "/cis/list",
    },
    info: {
      method: "get",
      url: "/cis/info/:id",
    },
    update: {
      method: "patch",
      url: "/cis/update",
    },
  },
  category: {
    create: {
      method: "post",
      url: "/category/create",
    },
    list: {
      method: "get",
      url: "/category/list",
    },
    categorizedlist: {
      method: "get",
      url: "/category/categorizedlist",
    },
    delete: {
      method: "delete",
      url: "/category/delete/:id",
    },
    update: {
      method: "patch",
      url: "/category/update",
    },
    info: {
      method: "get",
      url: "/category/info/:id",
    },
  },
  hardening: {
    create: {
      method: "post",
      url: "/hardening/create",
    },
    list: {
      method: "get",
      url: "/hardening/list",
    },
    delete: {
      method: "delete",
      url: "/hardening/delete/:id",
    },
    info: {
      method: "get",
      url: "/hardening/info/:id",
    },
    update: {
      method: "patch",
      url: "/hardening/update",
    },
  },
  hardeningResult: {
    switches: {
      detailList: {
        url: "/hardeningResults/switches/:id",
        method: "get",
      },
      version: {
        url: "/hardeningResults/switches/versions/:id",
        method: "get",
      },
    },
  },
  operatingSystem: {
    create: {
      method: "post",
      url: "/os/create",
    },
    delete: {
      method: "delete",
      url: "/os/delete/:id",
    },
    info: {
      method: "get",
      url: "/os/info/:id",
    },
    list: {
      method: "get",
      url: "/os/list",
    },
    update: {
      method: "patch",
      url: "/os/update",
    },
  },
};
