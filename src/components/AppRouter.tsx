import { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import LoginPage from '../pages/Login/Login';
import CircularProgress from '@mui/material/CircularProgress';

const LazyHomePage = lazy(() => import('../pages/Home/Home'));

export enum RouteName {
  Home = '/home',
}

export default function AppRouter() {
  return useRoutes([
    {
      index: true,
      element: <LoginPage />,
    },
    {
      path: RouteName.Home,
      element: (
        <Suspense fallback={<CircularProgress />}>
          <LazyHomePage />
        </Suspense>
      ),
    },
  ]);
}
