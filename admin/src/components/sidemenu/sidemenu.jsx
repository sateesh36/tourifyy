import React from "react";
import { removeAccessToken } from "../../api/tokenAcess";
import { Link, useNavigate } from "react-router-dom";

export const Sidemenu = () => {
  const navigate = useNavigate();
  return (
    <div>
      <aside className="left-sidebar">
        {/* <!-- Sidebar scroll--> */}
        <div className="scroll-sidebar">
          {/* <!-- Sidebar navigation--> */}
          <nav className="sidebar-nav">
            <ul id="sidebarnav">
              {/* <li>
                {" "}
                <a
                  className="waves-effect waves-dark"
                  to="#"
                  aria-expanded="false"
                >
                  <Link className="hide-menu" to="/dashboard">
                    <i className="fas fa-tachometer-alt"></i>Dashboard
                  </Link>
                </a>
              </li> */}
              <li>
                <a className="waves-effect waves-dark" aria-expanded="false">
                  <Link className="hide-menu " to="/customer">
                    <i className="fas fa-user"></i>
                    Customer
                  </Link>
                </a>
              </li>
              <li>
                <a className="waves-effect waves-dark" aria-expanded="false">
                  <Link className="hide-menu" to="/category">
                    <i className="fa fa-table"></i>
                    Category
                  </Link>
                </a>
              </li>
              <li>
                {" "}
                {/* <a
                  className="waves-effect waves-dark"
                  to="icon-fontawesome.html"
                  aria-expanded="false"
                >
                  <i className="fa fa-smile-o"></i>
                  <span className="hide-menu">Icons</span>
                </a> */}
              </li>
              <li>
                {" "}
                <a className="waves-effect waves-dark" aria-expanded="false">
                  <Link className="hide-menu" to="/package">
                    <i className="fas fa-box"></i>Packages
                  </Link>
                </a>
              </li>
              <li>
                {" "}
                <a
                  className="waves-effect waves-dark"
                  to="#"
                  aria-expanded="false"
                >
                  <Link className="hide-menu" to="/booking">
                    <i className="fas fa-ticket-alt"></i>Booking
                  </Link>
                </a>
              </li>
              <li>
                {" "}
                <a className="waves-effect waves-dark" aria-expanded="false">
                  <Link className="hide-menu" to="/reviews">
                    <i className="fas fa-star"></i>Reviews
                  </Link>
                </a>
              </li>
              <li>
                {" "}
                <a className="waves-effect waves-dark" aria-expanded="false">
                  <Link className="hide-menu" to="/getDays">
                    <i class="fas fa-rocket"></i>Days
                  </Link>
                </a>
              </li>
              <li>
                {" "}
                <a className="waves-effect waves-dark" aria-expanded="false">
                  <Link className="hide-menu" to="/customerMessage">
                    <i class="fas fa-envelope"></i>
                    Messages
                  </Link>
                </a>
              </li>

              <div className="text-center mt-4">
                <li>
                  <a
                    className="waves-effect waves-dark"
                    to="#"
                    aria-expanded="false"
                  >
                    <i class="fas fa-sign-out-alt"></i>

                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        localStorage.removeItem("login");
                        // Reload the current page
                        removeAccessToken();
                        navigate("/");
                        window.location.reload();
                      }}
                    >
                      Logout
                    </button>
                  </a>
                </li>
              </div>
            </ul>
          </nav>
          {/* <!-- End Sidebar navigation --> */}
        </div>
        {/* <!-- End Sidebar scroll--> */}
      </aside>
    </div>
  );
};
