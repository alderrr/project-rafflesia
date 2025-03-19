import { createBrowserRouter, redirect } from "react-router-dom";
import ParentPage from "../pages/ParentPage";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import RoomPage from "../pages/RoomPage";
import RulesPage from "../pages/RulesPage";
import AdminPage from "../pages/AdminPage";
import AdminHomePage from "../pages/AdminHomePage";
import AdminLoginPage from "../pages/AdminLoginPage";
import AdminRoomPage from "../pages/AdminRoomPage";
import AdminGuestPage from "../pages/AdminGuestPage";
import AdminHistoryPage from "../pages/AdminHistoryPage";

const router = createBrowserRouter([
  {
    element: <ParentPage />,
    children: [
      {
        path: "*",
        element: <HomePage />,
      },
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/rooms",
        element: <RoomPage />,
      },
      {
        path: "/rules",
        element: <RulesPage />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLoginPage />,
    loader: async () => {
      if (localStorage.access_token) {
        return redirect("/admin");
      }
      return null;
    },
  },
  {
    element: <AdminPage />,
    loader: async () => {
      if (!localStorage.access_token) {
        return redirect("/admin/login");
      }
      return null;
    },
    children: [
      {
        path: "/admin",
        element: <AdminHomePage />,
      },
      {
        path: "/admin/room",
        element: <AdminRoomPage />,
      },
      {
        path: "/admin/guest",
        element: <AdminGuestPage />,
      },
      {
        path: "/admin/history",
        element: <AdminHistoryPage />,
      },
    ],
  },
]);

export default router;
