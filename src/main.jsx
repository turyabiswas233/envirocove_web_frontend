import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { 
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Consumer from "./components/Consumer.jsx"; 
import Product from "./components/Product.jsx"; 
import Cart from "./components/Cart.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import VerifyPhone from "./components/VerifyPhone.jsx";
import VerifyID from "./components/VerifyId.jsx";
import RequestProgress from "./components/RequestProgress.jsx";
import CheckoutShip from "./components/CheckoutShip.jsx";
import CheckoutPay from "./components/CheckoutPay.jsx";
import AdminHome from "./components/admin/Home.jsx";
import AddProduct from "./components/admin/AddProduct.jsx";
import Orders from "./components/admin/Orders.jsx";
import AdminPage from "./components/admin/AdminPage.jsx";
import Home from "./components/Home.jsx";

const rootRouter = createBrowserRouter([
  {
    path: "/",
    element: <App /> ,
    errorElement: (
      <div className="px-10 mx-auto bg-black text-white h-screen w-full flex justify-center items-center flex-col gap-4 text-center">
        <p className="text-3xl">404 Not Found</p>
        <hr className="border border-white w-2/3" />
        <p className="text-lg text-gray-400/50">
          The page you are looking for may not available
        </p>
      </div>
    ),
    children: [
      {
        path: '/account',
        element: <Home />,
      },
      {
        path: "/",
        element: <Consumer />,
      },
      {
        path: "/product",
        element: <Product />,
      },
      {
        path: "/mycart",
        element: <Cart />,
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
        path: "/verify_phone",
        element: <VerifyPhone />,
      },
      {
        path: "/verify_id",
        element: <VerifyID />,
      },
      {
        path: "/requestprogress",
        element: <RequestProgress />,
      },
      {
        path: "/checkout/ship",
        element: <CheckoutShip />,
      },
      {
        path: "/checkout/pay",
        element: <CheckoutPay />,
      },
      {
        path: '/admin',
        element: <AdminPage />,
        children:[
          {
            path: 'products',
            element: <AdminHome />
          },
          {
            path:"addproduct",
            element: <AddProduct />
          },
          {
            path:"orders",
            element: <Orders />
          },
           
        ]
      }
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={rootRouter} />
);
