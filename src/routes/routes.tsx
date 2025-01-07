import React from "react";

import Dashboard from "../pages/Dashboard";
const Students = React.lazy(() => import("../pages/Students"));
const Finances = React.lazy(() => import("../pages/Finances"));
const StudentRegister = React.lazy(() => import("../pages/StudentRegister"));
const LoginScreen = React.lazy(() => import("../pages/LoginScreen"));
const Account = React.lazy(() => import("../pages/Account"));
const Training = React.lazy(() => import("../pages/Training"));
const Checkin = React.lazy(() => import("../pages/Checkin"));
const CreateTraining = React.lazy(() => import("../pages/CreateTraining"));
const TrainingDetail = React.lazy(() => import("../pages/TrainingDetail"));
const StudentDetail = React.lazy(() => import("../pages/StudentDetail"));

const appRoutes = [
  { path: "/", Component: Dashboard },
  { path: "/alunos", Component: Students },
  { path: "/alunos/registro", Component: StudentRegister },
  { path: "/alunos/:id", Component: StudentDetail },
  { path: "/financeiro", Component: Finances },
  { path: "/conta", Component: Account },
  { path: "/treino", Component: Training },
  { path: "/treino/:id", Component: TrainingDetail },
  { path: "/treino/registro", Component: CreateTraining },
  { path: "/checkin", Component: Checkin },
  { path: "/login", Component: LoginScreen },
];

export default appRoutes;