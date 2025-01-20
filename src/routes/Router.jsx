import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home/Home";
import SignUp from "../pages/Home/SignUp/SignUp";
import Login from "../pages/Home/Login/Login";
import Secret from "../shared/Secret";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layouts/Dashboard";
import BookParcel from "../pages/Dashboard/User/BookParcel/BookParcel";
import MyParcels from "../pages/Dashboard/User/MyParcel/MyParcels";
import UpdateParcel from "../pages/Dashboard/User/UpdateParcel/UpdateParcel";
import MyProfile from "../pages/Dashboard/User/MyProfile/MyProfile";
import AllDeliveryMen from "../pages/Dashboard/Admin/AllDeliveryMen/AllDeliveryMen";

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
    },
    {
        path: "dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'book-parcel',
                element: <BookParcel></BookParcel>
            },
            {
                path: 'my-parcels',
                element:<MyParcels></MyParcels>
            },
            {
                path: 'updateParcel/:id',
                element: <UpdateParcel></UpdateParcel>
            },
            {
                path: 'my-profile',
                element: <MyProfile></MyProfile>
            },
            {
                path: 'all-delivery-men',
                element: <AllDeliveryMen></AllDeliveryMen>
            }
        ]
    }
]);
export default router;