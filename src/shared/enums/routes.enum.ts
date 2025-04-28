export enum ROUTES_ENUM {
  HOME = "/",

  //
  //
  //
  // ####################################
  //            AUTH
  LOGIN = "/login",
  REGISTER = "/register",

  //
  //
  //
  // ####################################
  //          users
  _USERS_ = "/users/list",
  USERS_LIST = "/users/list",
  USERS_UPDATE = "/users/update/:id",
  USERS_CREATE = "/users/create",
  USERS_DELETE = "/users/delete/:id",

  //
  //
  //
  // ####################################
  //          projects
  _PROJECTS_ = "/projects/list",
  PROJECTS_LIST = "/projects/list",
  PROJECTS_UPDATE = "/projects/update/:id",
  PROJECTS_CREATE = "/projects/create",
  PROJECTS_DELETE = "/projects/delete/:id",

    //
  //
  //
  // ####################################
  //          forms
  _FORMS_ = "/forms/list",
  FORMS_LIST = "/forms/list",
  FORMS_CREATE = "/forms/create",

  //
  //
  //
  // ####################################
  //          product
  _PRODUCT_ = "/product/list",
  PRODUCT_LIST = "/product/list",
  PRODUCT_UPDATE = "/product/update/:id",
  PRODUCT_CREATE = "/product/create",
  PRODUCT_DELETE = "/product/delete/:id",

  //
  //
  //
  // ####################################
  //          permission
  _PERMISSION_ = "/role/list",
  ROLE_LIST = "/role/list",

  //
  //
  //
  // ####################################
  //          tasks
  _TASKS_ = "/tasks",
  TASKS_TODO_ROLE_LIST = "/tasks/todo",
  TASKS_DONE_BY_ME_LIST = "/tasks/doneByMe",

  //
  //
  //
  // ####################################
  //          workflow
  _WORKFLOW_ = "/workflow",
  WORKFLOW_LIST = "/workflow/list",
  WORKFLOW_CREATE = "/workflow/create",
  WORKFLOW_START_ROLE_LIST = "/workflow/start/list",
  WORKFLOW_STEPS = "/workflow/steps/:workflowId",
}
