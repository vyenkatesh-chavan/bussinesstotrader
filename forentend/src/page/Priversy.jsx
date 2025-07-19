import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Priversy = () => {
  const user = localStorage.getItem("user");
  const shopkeeper = localStorage.getItem("shop-keeper");

  return user || shopkeeper ? <Outlet /> : <Navigate to="/signup" />;
};

export default Priversy;
