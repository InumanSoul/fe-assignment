import AdminPage from "./AdminPage";
import LoginPage from "./auth/LoginPage";
import DashboardPage from "./DashboardPage";
import OnboardingPage from "./OnboardingPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/onboarding",
    element: <OnboardingPage />,
  }
]);

const Router = () => {
  return <RouterProvider router={routes} />
}

export default Router;