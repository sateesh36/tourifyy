import React, { useState } from "react";
import { Navbar } from "../components/navbar";
import api from "../../api";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Input, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleResetPassword = async (values) => {
    try {
      const res = await api.post("/user/reset", {
        email,
        ...values,
      });
      if (res && res.data.success) {
        toast.success("Password reset successful. Redirecting to login...");
        navigate("/login");
      } else {
        toast.error(res.data.message || "Failed to reset password.");
      }
    } catch (error) {
      console.error("Error during password reset:", error.response || error);
      toast.error(
        error.response?.data?.message || "An error occurred. Try again later."
      );
    }
  };

  return (
    <>
      <Navbar />
      <section style={{ marginLeft: "260px" }} className="text-center">
        <div className="row">
          <div className="col-10">
            <div
              className="card mx-4 mx-md-5 shadow-4-light"
              style={{
                marginTop: "100px",
                background: "rgba(255, 255, 255, 0.8)",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div className="card-body py-5 px-md-5">
                <div className="row d-flex justify-content-center">
                  <div className="col-lg-8">
                    <h2 className="fw-bold mb-5">Reset Password</h2>
                    <Form onFinish={handleResetPassword}>
                      <Form.Item
                        name="otp"
                        rules={[
                          {
                            required: true,
                            message: "Please enter the OTP sent to your email.",
                          },
                          {
                            pattern: /^\d{6}$/,
                            message: "OTP must be a 6-digit number.",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Enter OTP"
                          maxLength={6}
                          style={{ textTransform: "uppercase" }}
                        />
                      </Form.Item>
                      <Form.Item
                        name="newPassword"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your new password.",
                          },
                          {
                            min: 8,
                            message: "Password must be at least 8 characters long.",
                          },
                          {
                            pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                            message:
                              "Password must include letters, numbers, and special characters.",
                          },
                        ]}
                      >
                        <Input.Password
                          prefix={<LockOutlined />}
                          placeholder="New Password"
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="btn-primary primary rounded"
                        >
                          Reset Password
                        </Button>
                      </Form.Item>
                      <div className="mt-3 text-center">
                        <span>Back to </span>
                        <a href="/login" className="text-decoration-none">
                          Login
                        </a>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
