// import { lazy } from "react";

import Home from "../pages/home";
import Menu from "../pages/permis/menu";
import Role from "../pages/permis/role";
import User from "../pages/permis/user";

const routes = [
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/permis/menu",
    component: Menu,
  },
  {
    path: "/permis/role",
    component: Role,
  },
  {
    path: "/permis/user",
    component: User,
  },
];

export default routes;
