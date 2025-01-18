import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home/Home";
import SignUp from "../pages/Home/SignUp/SignUp";
import Login from "../pages/Home/Login/Login";
import Secret from "../shared/Secret";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element:<Main></Main>,
        children:[
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: 'login',
                element:<Login></Login>
            },
            {
                path: "signUp",
                element:<SignUp></SignUp>
            },
            {
                path: 'secret',
                element: <PrivateRoute><Secret></Secret></PrivateRoute>
            }
        ]
    }
]);
export default router;