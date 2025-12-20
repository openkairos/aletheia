import { RootRedirect } from '@/auth/login/RootRedirect/RootRedirect.tsx';
import { createBrowserRouter, Outlet } from 'react-router';

export const router = createBrowserRouter([
  {
    Component: Outlet,
    children: [
      {
        path: '/',
        Component: RootRedirect,
      },
    ],
  },
]);
