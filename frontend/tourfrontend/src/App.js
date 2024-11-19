import React from "react";
import { Login } from "./layout/auth/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home";
import { Register } from "./layout/auth/register";
import { About } from "./layout/about";
import { ContactUs } from "./layout/components/contactUs";
import { BookingForm } from "./layout/booking/bookingForm";
import { Booking } from "./layout/booking/booking";
import { BookingHistory } from "./layout/booking/bookingHistory";
import { CardPackages } from "./layout/cardPackages/cardPackages";
import { TourList } from "./layout/searchHistory/tourListingPage";
import { Payment } from "./layout/booking/payment";
import { ChatBot } from "./layout/chatBot/chatBot";
import { ChangePassword } from "./layout/auth/changePassword";
import { Navbar } from "./layout/components/navbar";
import { ForgotPassword } from "./layout/auth/ForgetPassword";
import { ResetPassword } from "./layout/auth/ResetPassword";

// import "../public/css/style.css";
function Navigation() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" Component={Login} />
          <Route exact path="/forgot" Component={ForgotPassword} />
          <Route exact path="/reset-password" Component={ResetPassword} />
          <Route exact path="/" Component={Home} />
          <Route exact path="/register" Component={Register} />
          <Route exact path="/contact" Component={ContactUs} />
          <Route exact path="/about" Component={About} />
          <Route exact path="/bookingForm" Component={BookingForm} />
          <Route exact path="/booking/:id" Component={Booking} />
          <Route exact path="/customerBooking" Component={BookingHistory} />
          <Route exact path="/cardPage" Component={CardPackages} />
          <Route exact path="/searchAlgorithm" Component={TourList} />
          <Route exact path="/payment" Component={Payment} />
          <Route exact path="/chatBot" Component={ChatBot} />
          <Route exact path="/changePassword/:id" Component={ChangePassword} />
          <Route path="/*" element={Navbar} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Navigation;
