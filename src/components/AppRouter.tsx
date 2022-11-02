import { lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import LoginPage from '../pages/Login/Login';
import CircularProgress from '@mui/material/CircularProgress';

const LazyHomePage = lazy(() => import('../pages/Home/Home'));

export const START_PAGE = '/github-react-app-ui';

export default function AppRouter() {
  return useRoutes([
    {
      path: START_PAGE,
      children: [
        {
          index: true,
          element: <LoginPage />,
        },
        {
          path: 'home',
          element: (
            <Suspense fallback={<CircularProgress />}>
              <LazyHomePage />
            </Suspense>
          ),
        },
        {
          path: '*',
          element: <Navigate to={START_PAGE} />,
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to={START_PAGE} />,
    },
  ]);
}
