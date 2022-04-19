import { lazy } from "react";

const routes = [
  {
    path: "/index",
    component: lazy(() => import("@/pages/home")),
  },
  {
    path: "/permis/menu",
    component: lazy(() => import("@/pages/permis/menu")),
  },
  {
    path: "/permis/role",
    component: lazy(() => import("@/pages/permis/role")),
  },
  {
    path: "/permis/user",
    component: lazy(() => import("@/pages/permis/user")),
  },
  {
    path: "/table",
    component: lazy(() => import("@/pages/table")),
  },
];

export default routes;
