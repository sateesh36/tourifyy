import React from "react";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export const Header = () => {
  return (
    <div>
      {/* <ToastContainer /> */}
      <header className="topbar">
        <nav className="navbar top-navbar navbar-expand-md navbar-light">
          <div classNameName="navbar-header">
            <a className="navbar-brand">
              <b className="font-weight-bold">
                <h2 style={{ marginBottom: "-40px" }}>Admin Dashboard</h2>
              </b>
            </a>
          </div>
        </nav>
      </header>
    </div>
  );
};
