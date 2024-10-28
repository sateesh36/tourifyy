import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Dashboard } from "./dashboard";
import { Login } from "./pages/auth/login";
import { Customer } from "./pages/customer/customer";
// import PageNotFound from "./pages/PageNotFound";
import { Packages } from "./pages/package/package";
import { AddCategory } from "./pages/category/addCategory";
import { Booking } from "./pages/booking/booking";
import { UpdatePackage } from "./pages/package/updatePackage";
import { AddReviews } from "./pages/reviews/reviews";
import { AddDays } from "./pages/days/addDays";
import { GetDays } from "./pages/days/getDays";
import { CardDays } from "./pages/days/cardDay";
import { BookingChart } from "./pages/charts/bookingCharts";
import { MessageGet } from "./pages/message/messageGet";

function Navigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("login"))
  );

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace={true} />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          <Route
            path="/customer"
            element={
              isAuthenticated ? (
                <Customer />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          <Route
            path="/package"
            element={
              isAuthenticated ? (
                <Packages />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          <Route
            path="/category"
            element={
              isAuthenticated ? (
                <AddCategory />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          <Route
            path="/booking"
            element={
              isAuthenticated ? <Booking /> : <Navigate to="/" replace={true} />
            }
          />
          <Route
            path="/reviews"
            element={
              isAuthenticated ? (
                <AddReviews />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          <Route
            path="/updatePackage/:id"
            element={
              isAuthenticated ? (
                <UpdatePackage />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          <Route
            path="/AddDays/:id"
            element={
              isAuthenticated ? <AddDays /> : <Navigate to="/" replace={true} />
            }
          />
          <Route
            path="/getDays"
            element={
              isAuthenticated ? <GetDays /> : <Navigate to="/" replace={true} />
            }
          />
          <Route
            path="/cardDays"
            element={
              isAuthenticated ? (
                <CardDays />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          <Route
            path="/BookingChart"
            element={
              isAuthenticated ? (
                <BookingChart />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          <Route
            path="/customerMessage"
            element={
              isAuthenticated ? (
                <MessageGet />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Navigation;
