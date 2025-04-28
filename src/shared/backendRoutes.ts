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
  form: {
    create: IRoute;
    list: IRoute;
    // update: IRoute;
    // info: IRoute;
    // delete: IRoute;
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
  workflow: {
    list: IRoute;
    create: IRoute;
    delete: IRoute;
    info: IRoute;
    listOfAvailableWorkflowsToStart: IRoute;
    engine: {
      startWorkflow: IRoute;
      listOfAvailableWorkflowTasksForRole: IRoute;
      listOfUserDonedTasks: IRoute;
      doneAndApproveWorkflowTask: IRoute;
      doneAndRejectWorkflowTask: IRoute;
    };
    steps: {
      create: IRoute;
      delete: IRoute;
      conditions: {
        create: IRoute;
        delete: IRoute;
      };
    };
  };
  forms: {
    list: IRoute;
  };
  workflowTask: {
    createFormData: IRoute;
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
    myself: { method: "get", url: "/user/myself" },
    list: { method: "get", url: "/user/list" },
    delete: { method: "delete", url: "/user/delete" },
    info: { method: "get", url: "/user/byId/:id" },
    update: { method: "patch", url: "/user/update/:id" },
  },
  role: {
    list: { method: "get", url: "/role/list" },
    getCurrentPermissions: { method: "get", url: "/role/get-permissions/:id" },
  },
  form: {
    create: { method: "post", url: "/form/create" },
    list: { method: "get", url: "/form/list" },
  },
  project: {
    create: { method: "post", url: "/project/create" },
    update: { method: "patch", url: "/project/update/:id" },
    list: { method: "get", url: "/project/list" },
    info: { method: "get", url: "/project/byId/:id" },
    delete: { method: "delete", url: "/project/delete/:id" },
  },
  product: {
    create: { method: "post", url: "/product/create" },
    update: { method: "patch", url: "/product/update/:id" },
    list: { method: "get", url: "/product/list" },
    info: { method: "get", url: "/product/byId/:id" },
    delete: { method: "delete", url: "/product/delete/:id" },
  },
  permission: {
    update: { method: "patch", url: "/permission/update/:id" },
    list: { method: "get", url: "/permission/list" },
    info: { method: "get", url: "/permission/byId/:id" },
    addRoleToPermission: { method: "post", url: "/permission/addRole" },
    removeRoleFromPermission: {
      method: "delete",
      url: "/permission/removeRole",
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
      url: "/file/byId/:id",
    },
  },
  unit: {
    list: { method: "get", url: "/unit/list" },
  },
  workflow: {
    list: { method: "get", url: "/workflow/list" },
    create: { method: "post", url: "/workflow/create" },
    delete: { method: "delete", url: "/workflow/delete/:id" },
    info: { method: "get", url: "/workflow/byId/:id" },
    engine: {
      startWorkflow: {
        method: "post",
        url: "/workflow-engine/start-workflow/:id",
      },
      listOfUserDonedTasks: {
        method: "get",
        url: "/workflow-engine/list-of-user-doned-tasks",
      },
      listOfAvailableWorkflowTasksForRole: {
        method: "get",
        url: "/workflow-engine/list-of-available-task",
      },
      doneAndApproveWorkflowTask: {
        method: "post",
        url: "/workflow-engine/approve-task/:id",
      },
      doneAndRejectWorkflowTask: {
        method: "post",
        url: "/workflow-engine/reject-task/:id",
      },
    },
    listOfAvailableWorkflowsToStart: {
      method: "get",
      url: "/workflow/list-of-available-workflows",
    },
    steps: {
      create: { method: "post", url: "/workflow/create-step" },
      delete: { method: "delete", url: "/workflow/delete-step" },
      conditions: {
        create: { method: "post", url: "/workflow/create-step-conditions" },
        delete: { method: "delete", url: "/workflow/delete-step-condition" },
      },
    },
  },
  forms: {
    list: { method: "get", url: "/form/list" },
  },
  workflowTask: {
    createFormData: {
      method: "post",
      url: "/workflow-task/create-formData",
    },
  },
};
