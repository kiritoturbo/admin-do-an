// import React from "react";
// import { Route, Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";
// import store from "./myStore";
// const PrivateRoute = ({ element: Element, ...rest }) => {
//   const isSignedIn = store.getState().auth.isSignedIn;

//   // if authorized, return an outlet that will render child elements
//   // if not, return element that will navigate to login page
//   return isSignedIn ? <Outlet /> : <Navigate to="/login" />;
// };

// export default PrivateRoute;
import React from "react";
import {
  Route,
  Navigate,
  Outlet,
  useParams,
  redirect,
  useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

// const PrivateRoute = ({ element: Element, ...rest }) => {
const PrivateRoute = (props) => {
  const navigate = useNavigate();
  const { Component, ...rest } = props;
  const { id } = useParams();
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);

  // if authorized, return an outlet that will render child elements
  // if not, return element that will navigate to login page
  // return isSignedIn ? <Outlet /> : <Navigate to="/login" />;
  return isSignedIn ? (
    <Component idss={id} {...rest} {...props} />
  ) : (
    // <Navigate to="/login" />
    navigate("/login")
  );
};

export default PrivateRoute;
