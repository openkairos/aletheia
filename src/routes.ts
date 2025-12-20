import AuthLayout from '@/pages/AuthLayout.tsx';
import DashboardLayout from '@/pages/DashboardLayout.tsx';
import Login from '@/pages/Login.tsx';
import { createBrowserRouter, Outlet } from 'react-router';

export const router = createBrowserRouter([
  {
    Component: Outlet,
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
        path: '/',
        Component: DashboardLayout,
        children: [],
      },
    ],
  },
]);
