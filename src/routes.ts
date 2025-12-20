import { RootRedirect } from '@/auth';
import { LoginPage } from '@/pages/LoginPage.tsx';
import { createBrowserRouter, Outlet } from 'react-router';

export const router = createBrowserRouter([
  {
    Component: Outlet,
    children: [
      {
        path: '/',
        Component: RootRedirect,
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
