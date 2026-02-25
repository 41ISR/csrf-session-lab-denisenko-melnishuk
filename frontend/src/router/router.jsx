import { createBrowserRouter } from "react-router-dom"
import Index from "../pages/Index"
import Signup from "../pages/Signup"
import Signin from "../pages/Signin"
import Logout from "../pages/Logout"
import Leaderboard from "../pages/Leaderboard"
import AuthProvider from "../components/AuthProvider"


export const router = createBrowserRouter ([
    {
        path: "/",
        element: <AuthProvider />,
        children: [{
            // index: true,
            path: "/game",
            element: <Index />
        },

        {
            path: "/leaderboard",
            element: <Leaderboard />,
        }
    ]
    },
    {
        path: "/logout",
        element: <Logout />
    }, 

    {
        path: "/signup",
        element: <Signup />
    },

    {
        path: "/signin",
        element: <Signin />
    },
])