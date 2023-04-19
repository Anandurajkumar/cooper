import React from "react";
import { Redirect } from "react-router-dom";

// //Dashboard

import DashboardProject from "../pages/DashboardProject";

// Project
import ProjectList from "../pages/Projects/ProjectList";
import ProjectOverview from "../pages/Projects/ProjectOverview";
import CreateProject from "../pages/Projects/CreateProject";
import UpdateProject from "../pages/Projects/UpdateProject/UpdateProject";


//login
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";

import TaskDetails from "../pages/Tasks/TaskDetails";
import TaskList from "../pages/Tasks/TaskList";
import KanbanBoard from "../pages/Tasks/KanbanBoard/Index";

const authProtectedRoutes = [
  { path: "/dashboard", component: DashboardProject },
  { path: "/bugs", component: TaskList },
  //Projects
  { path: "/projects", component: ProjectList },
  { path: "/projects-overview", component: ProjectOverview },
  { path: "/projects-create", component: CreateProject },
  { path: "/projects-update", component:UpdateProject}
  
];

const publicRoutes = [
  // Authentication Page
  // { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  // { path: "/forgot-password", component: ForgetPasswordPage },
  { path: "/register", component: Register },
];

export { authProtectedRoutes, publicRoutes };
