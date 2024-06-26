import { createHashRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/menuPage/Menu";
import Signup from "../components/Signup";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import CartPage from "../pages/menuPage/CartPage";
import Login from "../components/Login";
import Order from "../pages/dashboard/user/Order";
import UserProfile from "../pages/dashboard/user/UserProfile";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";
import AddMenu from "../pages/dashboard/admin/AddMenu";
import ManageItems from "../pages/dashboard/admin/ManageItems";
import Payment from "../pages/menuPage/Payment";
import ManageBookings from "../pages/dashboard/admin/ManageBookings";
import Contact from "../pages/contact/Contact";
import About from "../pages/about/About";
import Error from "../pages/404";
import MenuDetail from "../pages/menuPage/MenuDetail";
import PrivateRouteAdmin from "../PrivateRoute/PrivateRouteAdmin";
import Termscondition from "../pages/terms-condition";
import Privacypolicy from "../pages/privacy-policy";
import Story from "../pages/about/Ourstory";

const router = createHashRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/menu/:id",
        element: <MenuDetail />,
      },
      {
        path: "/order",
        element: (
          <PrivateRoute>
            <Order />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-profile",
        element: <UserProfile />,
      },
      {
        path: "/cartpage",
        element: <CartPage />,
      },
      {
        path: "/process-checkout",
        element: <Payment />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/story",
        element: <Story />,
      },
      {
        path: "/terms-condition",
        element: <Termscondition />,
      },
      {
        path: "/privacy-policy",
        element: <Privacypolicy />,
      },
      {
        path: "/404",
        element: <Error />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: (
          <PrivateRouteAdmin>
            <Users />
          </PrivateRouteAdmin>
        ),
      },
      {
        path: "add-menu",
        element: <AddMenu />,
      },
      {
        path: "add-menu/:id",
        element: <AddMenu />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/menu/${params.id}`),
      },
      {
        path: "manage-items",
        element: <ManageItems />,
      },
      {
        path: "bookings",
        element: <ManageBookings />,
      },
    ],
  },
]);

export default router;
