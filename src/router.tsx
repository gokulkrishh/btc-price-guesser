import { createBrowserRouter } from 'react-router-dom';

import ProtectedRoutes from './pages/protected';
import Home from './pages/home';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import Error from './pages/error';

export const routes = [
  {
    path: '/',
    element: <ProtectedRoutes />,
    errorElement: <Error />,
    children: [{ path: '/', element: <Home /> }],
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
];

const router = createBrowserRouter(routes);

export default router;
