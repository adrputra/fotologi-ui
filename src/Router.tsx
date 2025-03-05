import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/login';
import { HomePage } from './pages/Home.page';
import { authenticator } from './libs/authenticator';
import AppShellWrapper from './pages/AppShell';
import StudioPage from './pages/studio';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <AppShellWrapper />,
    children: [
      {
        path: '/',
        element: <HomePage />,
        loader: authenticator,
      },
      {
        path: '/dashboard',
        element: <StudioPage />,
        // loader: authenticator,
      },
      {
        path: '/studio',
        element: <StudioPage />,
        // loader: authenticator,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
