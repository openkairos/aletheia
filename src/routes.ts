import { DashboardPage } from '@/pages/DashboardPage.tsx';
import { LoginPage } from '@/pages/LoginPage.tsx';
import { createBrowserRouter, Outlet } from 'react-router';

export const router = createBrowserRouter([
  {
    Component: Outlet,
    children: [
      {
        path: '/',
        Component: DashboardPage,
      },
      {
        path: '/auth',
        children: [
          {
            path: 'login',
            Component: LoginPage,
          },
        ],
      },
    ],
  },
]);
