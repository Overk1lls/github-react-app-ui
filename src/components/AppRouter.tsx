import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const LazyLoginPage = lazy(() => import('../pages/Login'));
const LazyHomePage = lazy(() => import('../pages/Home'));

export enum RouteName {
  Home = '/home',
}

export default function AppRouter() {
  return useRoutes([
    {
      index: true,
      element: (
        <Suspense fallback={<CircularProgress />}>
          <LazyLoginPage />
        </Suspense>
      ),
    },
    {
      path: RouteName.Home,
      element: (
        <Suspense fallback={<CircularProgress />}>
          <LazyHomePage />
        </Suspense>
      ),
    }
  ]);
}
