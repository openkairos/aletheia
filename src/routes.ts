import AuthLayout from '@/pages/AuthLayout.tsx';
import DashboardLayout from '@/pages/DashboardLayout.tsx';
import Login from '@/pages/Login.tsx';
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
        path: '/',
        Component: DashboardLayout,
        children: [],
      },
    ],
  },
]);
