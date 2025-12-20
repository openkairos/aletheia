import { createBrowserRouter, Outlet } from 'react-router';

export const router = createBrowserRouter([
  {
    Component: Outlet,
    children: [
      {
        path: '/',
      },
    ],
  },
]);
