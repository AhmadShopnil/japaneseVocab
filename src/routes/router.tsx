import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Lessons from "../pages/user/Lessons";
import LessonDetail from "../pages/user/LessonDetail";
import Tutorials from "../pages/user/Tutorials";

import LessonManagement from "../pages/admin/LessonManagement";
import TutorialManagement from "../pages/admin/TutorialManagement";
import VocabularyManagement from "../pages/admin/VocabularyManagement";
import UserManagement from "../pages/admin/UserManagement";

import NotFound from "../components/NotFound";

import UserDashboard from "../pages/user/UserDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Help from "../pages/Help";
import { DashboardLayout } from "@/layout/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import CommonLayout from "@/layout/CommonLayout";
import CommonRoute from "./CommonRoute";
export const router = createBrowserRouter([
  // Routes under CommonLayout
  {
    path: "/",
    element: (
      <CommonRoute>
        <CommonLayout />
      </CommonRoute>
    ),
    children: [
      { index: true, element: <Login /> }, // Root route rendering Home
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  // { path: "login", element: <Login /> },
  // { path: "register", element: <Register /> },

  // Routes under DashboardLayout
  {
    path: "/dashboard",
    element: (
      <PrivateRoute allowedRoles={["user"]}>
        <DashboardLayout />{" "}
      </PrivateRoute>
    ),
    children: [
      // User Routes
      {
        path: "user",
        element: <UserDashboard />,
      },
      {
        path: "user/lessons",
        element: <Lessons />,
      },
      {
        path: "user/lessons/:lessonId",
        element: <LessonDetail />,
      },
      {
        path: "user/vocabularies",
        element: <Lessons />,
      },
      {
        path: "user/vocabularies/:vocabularyId",
        element: <LessonDetail />,
      },
      {
        path: "user/tutorials",
        element: <Tutorials />,
      },
      { path: "user/help", element: <Help /> },

      // Admin Routes
      {
        path: "admin",
        element: (
          // <AdminRoute>
          //   <AdminDashboard />
          // </AdminRoute>
          <AdminDashboard />
        ),
      },
      {
        path: "admin/users",
        element: (
          // <AdminRoute>
          //   <UserManagement />
          // </AdminRoute>
          <UserManagement />
        ),
      },
      {
        path: "admin/lessons",
        element: (
          // <AdminRoute>
          //   <LessonManagement />
          // </AdminRoute>
          <LessonManagement />
        ),
      },
      {
        path: "admin/vocabulary",
        element: (
          // <AdminRoute>
          //   <VocabularyManagement />
          // </AdminRoute>

          <VocabularyManagement />
        ),
      },
      {
        path: "admin/tutorials",
        element: (
          // <AdminRoute>
          //   <TutorialManagement />
          // </AdminRoute>
          <TutorialManagement />
        ),
      },
    ],
  },

  // Fallback route for undefined paths
  {
    path: "*",
    element: <NotFound />,
  },
]);
