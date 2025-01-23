import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home/Home";
import SignUp from "../pages/Home/SignUp/SignUp";
import Login from "../pages/Home/Login/Login";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layouts/Dashboard";
import BookParcel from "../pages/Dashboard/User/BookParcel/BookParcel";
import MyParcels from "../pages/Dashboard/User/MyParcel/MyParcels";
import UpdateParcel from "../pages/Dashboard/User/UpdateParcel/UpdateParcel";
import MyProfile from "../pages/Dashboard/User/MyProfile/MyProfile";
import AllDeliveryMen from "../pages/Dashboard/Admin/AllDeliveryMen/AllDeliveryMen";
import AllUsers from "../pages/Dashboard/Admin/AllUsers/AllUsers";
import Statistics from "../pages/Dashboard/Admin/Statistics/Statistics";
import MyDeliveryList from "../pages/Dashboard/DeliveryMen/MyDeliveryList/MyDeliveryList";
import AllParcels from "../pages/Dashboard/Admin/AllParcels/AllParcels";
import MyReviews from "../pages/Dashboard/DeliveryMen/MyReviews/MyReviews";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/PaymentSuccess/PaymentSuccess";

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
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // User Related Route
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
                path: "payment",
                element: <Payment></Payment>
            },
            {
                path: "payment-success",
                element: <PaymentSuccess></PaymentSuccess>
            },

            // Admin Route Only
            {
                path: 'all-parcels',
                element: <AllParcels></AllParcels>
            },
            {
                path: 'all-delivery-men',
                element: <AllDeliveryMen></AllDeliveryMen>
            },
            {
                path: 'all-users',
                element: <AllUsers></AllUsers>
            },
            {
                path: 'statistics',
                element: <Statistics></Statistics>
            },

            // Delivery Men Route
            {
                path: 'my-delivery-list',
                element: <MyDeliveryList></MyDeliveryList>
            },
            {
                path: 'my-reviews',
                element: <MyReviews></MyReviews>
            }
        ]
    }
]);
export default router;