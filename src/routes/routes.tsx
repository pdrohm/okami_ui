import React from "react";

import Dashboard from "../pages/Dashboard";
import ClassDetail from "../pages/ClassDetail";
const Students = React.lazy(() => import("../pages/Students"));
const Finances = React.lazy(() => import("../pages/Finances"));
const StudentRegister = React.lazy(() => import("../pages/StudentRegister"));
const LoginScreen = React.lazy(() => import("../pages/LoginScreen"));
const Account = React.lazy(() => import("../pages/Account"));
const Class = React.lazy(() => import("../pages/Classes"));
const Checkin = React.lazy(() => import("../pages/Checkin"));
const CreateClass = React.lazy(() => import("../pages/CreateClass"));
const StudentDetail = React.lazy(() => import("../pages/StudentDetail"));

const appRoutes = [
  { path: "/", Component: Dashboard },
  { path: "/alunos", Component: Students },
  { path: "/alunos/registro", Component: StudentRegister },
  { path: "/alunos/:id", Component: StudentDetail },
  { path: "/financeiro", Component: Finances },
  { path: "/conta", Component: Account },
  { path: "/treino", Component: Class },
  { path: "/treino/:id", Component: ClassDetail },
  { path: "/treino/registro", Component: CreateClass },
  { path: "/checkin", Component: Checkin },
  { path: "/login", Component: LoginScreen },
];

export default appRoutes;