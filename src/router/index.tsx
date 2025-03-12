import { createBrowserRouter } from "react-router";
import { RegularLayout } from "@/components/Layouts/RegularLayout";
import { Home } from "@/screens/Home";
import { AppLayout } from "@/components/Layouts/AppLayout";
import { Pools } from "@/screens/AppScreens/Pools";
import { AppScreens } from "@/screens/AppScreens";
import { Dashboard } from "@/screens/AppScreens/Dashboard";
import { Navigate } from "react-router";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { WagmiAppProvider } from "@/providers/WagmiAppProvider";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RegularLayout />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: "/app",
    element: (
      <WagmiAppProvider>
        <AppLayout />
      </WagmiAppProvider>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/app/pools" replace />,
      },
      {
        path: "pools",
        element: <Pools />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
            children: [{ index: true, element: <AppScreens /> }],
          },
        ],
      },
    ],
  },
]);
