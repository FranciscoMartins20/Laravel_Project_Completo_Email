import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Users from "./pages/User";
import NotFound from "./pages/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import TasksForm from "./pages/TasksForm";
import Tasks from "./pages/Tasks";

const router = createBrowserRouter([

    {
        path: "/",
        element: <DefaultLayout />,
        children: [{
            path: "/users",
            element: <Users />
        },
        {
            path: "/tasks/new",
            element: <TasksForm  />
        },
        {
            path: "/tasks/:id",
            element: <TasksForm />
        },
        {
            path: "/tasks",
            element: <Tasks />
        },
        {
            path: "/",
            element: <Navigate to="/users" />
        },

        ]
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [{
            path: "/login",
            element: <Login />
        },
        {
            path: "/register",
            element: <Register />
        },

        ]
    },

    {
        path: "*",
        element: <NotFound />
    }

])

export default router;