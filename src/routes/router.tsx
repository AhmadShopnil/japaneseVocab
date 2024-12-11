import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Lessons from "../pages/user/Lessons";
import LessonDetail from "../pages/LessonDetail";
import Tutorials from "../pages/user/Tutorials";

import LessonManagement from "../pages/admin/LessonManagement";
import TutorialManagement from "../pages/admin/TutorialManagement";
import VocabularyManagement from "../pages/admin/VocabularyManagement";
import UserManagement from "../pages/admin/UserManagement";

import CommonLayout from "../layout/CommonLayout";

import NotFound from "../components/NotFound";

import UserDashboard from "../pages/user/UserDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Help from "../pages/Help";
import { DashboardLayout } from "@/layout/DashboardLayout";

export const router = createBrowserRouter([
  // Routes under CommonLayout
  {
    path: "/",
    element: <CommonLayout />,
    children: [
      { index: true, element: <Home /> }, // Root route rendering Home
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  // Routes under DashboardLayout
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      // User Routes
      {
        path: "user",
        element: (
          // <PrivateRoute>
          //   <UserDashboard />
          // </PrivateRoute>

          <UserDashboard />
        ),
      },
      {
        path: "user/lessons",
        element: (
          // <PrivateRoute>
          //   <Lessons />
          // </PrivateRoute>
          <Lessons />
        ),
      },
      {
        path: "user/lessons/:lessonId",
        element: (
          // <PrivateRoute>
          //   <LessonDetail />
          // </PrivateRoute>
          <LessonDetail />
        ),
      },
      {
        path: "user/tutorials",
        element: (
          // <PrivateRoute>
          //   <Tutorials />
          // </PrivateRoute>
          <Tutorials />
        ),
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
