import { createBrowserRouter } from 'react-router-dom'
import Login from './views/Login';
import NotFound from './views/NotFound';
import Signup from './views/Signup';
import Users from './views/Users';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },

    {
        path: '/signup',
        element: <Signup />
    },

    {
        path: '/users',
        element: <Users />
    },

    {
        path: '*',
        element: <NotFound />
    },
])

export default router;