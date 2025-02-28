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
  _USERS_ = "/users",
  USERS_LIST = "/users/list",
  USERS_UPDATE = "/users/update/:id",
  USERS_CREATE = "/users/create",
  USERS_DELETE = "/users/delete/:id",

  //
  //
  //
  // ####################################
  //          projects
  _PROJECTS_ = "/projects",
  PROJECTS_LIST = "/projects/list",
  PROJECTS_UPDATE = "/projects/update/:id",
  PROJECTS_CREATE = "/projects/create",
  PROJECTS_DELETE = "/projects/delete/:id",

  //
  //
  //
  // ####################################
  //          product
  _PRODUCT_ = "/product",
  PRODUCT_LIST = "/product/list",
  PRODUCT_UPDATE = "/product/update/:id",
  PRODUCT_CREATE = "/product/create",
  PRODUCT_DELETE = "/product/delete/:id",

  //
  //
  //
  // ####################################
  //          permission
  _PERMISSION_ = "/permission",
  ROLE_LIST = "/role/list",

  //
  //
  //
  // ####################################
  //          tasks
  _TASKS_ = "/tasks",
  TASKS_TODO_ROLE_LIST = "/tasks/todo",
  TASKS_DONE_BY_ME_LIST = "/tasks/doneByMe",
}
