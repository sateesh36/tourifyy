import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link, useNavigate } from "react-router-dom";
import api from "../../api";
import { removeAccessToken } from "../../Auth";

import { Dropdown, Menu } from "antd";
import { DownOutlined, LogoutOutlined } from "@ant-design/icons";

export const Navbar = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [users, setUsers] = useState({});

  useEffect(() => {
    setIsLogin(JSON.parse(localStorage.getItem("login")));
    api
      .get("/user/me")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {});
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("_id");
    localStorage.setItem("login", false);
    removeAccessToken();
    navigate("/login");
  };

  const handleMenuClick = ({ key }) => {
    if (key === "changePassword") {
      // Handle change password logic
    } else if (key === "logout") {
      // Handle logout logic
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item
        key="changePassword"
        style={{
          color: "black",
          backgroundColor: "wheat",
          marginBottom: "7px",
        }}
      >
        <Link to={`/changePassword/${users._id}`}>Change Password </Link>
      </Menu.Item>
      <Menu.Item
        key="logout"
        onClick={handleLogout}
        icon={<LogoutOutlined />}
        style={{ color: "black", backgroundColor: "orange" }}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <ToastContainer />
      <section className="fixed-top">
        <div className="site-mobile-menu site-navbar-target">
          <div className="site-mobile-menu-header">
            <div className="site-mobile-menu-close">
              <span className="icofont-close js-menu-toggle"></span>
            </div>
          </div>
          <div className="site-mobile-menu-body"></div>
        </div>

        <nav className="site-nav bg-primary d-flex">
          <div className="container">
            <div className="site-navigation">
              <Link to="/" className="logo m-0">
                Tourify
                <span className="text-primary"></span>
              </Link>
              {isLogin}
              <ul className="js-clone-nav d-none d-lg-inline-block text-left site-menu float-right ">
                <li>
                  {" "}
                  <Link to="/" className="text-light">
                    Home
                  </Link>{" "}
                </li>

                <li>
                  <Link className="text-light" to="/about">
                    About
                  </Link>
                </li>

                <li>
                  <Link className="text-light" to="/contact">
                    Contact Us
                  </Link>
                </li>
                <li>
                  {isLogin === false ? (
                    <div>
                      <Link to="/cardPage" className="text-light">
                        Packages
                      </Link>
                      <Link
                        style={{ marginLeft: "20px" }}
                        className="text-light"
                        to="/login"
                      >
                        Login
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <Link
                        style={{ marginRight: "20px" }}
                        className="text-light"
                        to="/payment"
                      >
                        Booking History
                      </Link>
                      <Link to="/searchAlgorithm" className="text-light">
                        search Packages
                      </Link>
                      {/* <button
                        style={{ margin: "10px" }}
                        className="text-black bg-light rounded"
                      >
                        {users.name}
                      </button>{" "} */}
                      <Dropdown overlay={menu} trigger={["click"]}>
                        <button
                          style={{
                            margin: "10px",
                            cursor: "pointer",
                            color: "black",
                          }}
                          className=" rounded ant-dropdown-link"
                        >
                          {users.name} <DownOutlined />
                        </button>
                      </Dropdown>
                      {/* <button
                        className="text-black btn-warning rounded"
                        onClick={handleLogout}
                      >
                        Logout
                      </button> */}
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </section>
    </>
  );
};
