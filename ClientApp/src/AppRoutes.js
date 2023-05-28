import React from "react";
import { Home } from "./components/Home";
import Restaurants from "./components/Restaurant/Restaurants";
import RestaurantItems from "./components/Restaurant/RestaurantItems";
import Cart from "./components/Cart/Cart";
import OrderDetails from "./components/Order/OrderDetails";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/restaurants",
    element: <Restaurants />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },

  {
    path: "/restaurant-items",
    element: <RestaurantItems />,
  },
  {
    path: "/orderdetails/:code",
    element: <OrderDetails />,
  },
];

export default AppRoutes;
