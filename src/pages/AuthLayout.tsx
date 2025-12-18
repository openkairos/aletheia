import { Outlet } from 'react-router';

function AuthLayout() {
  return (
    <main>
      <h1>Auth</h1>
      <Outlet />
    </main>
  );
}

export default AuthLayout;
