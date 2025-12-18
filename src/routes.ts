import AuthLayout from '@/pages/auth/AuthLayout.tsx';
import Login from '@/pages/auth/Login/Login.tsx';
import DashboardLayout from '@/pages/dashboard/DashboardLayout.tsx';
import Root from '@/Root.tsx';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    Component: Root,
    children: [
      {
        path: 'auth',
        Component: AuthLayout,
        children: [
          {
            path: 'login',
            Component: Login,
          },
        ],
      },
      {
        path: '/dashboard',
        Component: DashboardLayout,
        children: [],
      },
    ],
  },
]);
