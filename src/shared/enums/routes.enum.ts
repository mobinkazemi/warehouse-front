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
}
