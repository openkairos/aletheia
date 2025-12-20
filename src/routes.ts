import { RootRedirect } from '@/auth';
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
