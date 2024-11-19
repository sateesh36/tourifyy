import React, { useState } from "react";
import { Navbar } from "../components/navbar";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Input, Button } from "antd";
import { MailOutlined } from "@ant-design/icons";

export const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleForgotPassword = async (values) => {
    try {
      const res = await api.post("/user/forgot", values);
      if (res && res.data.success) {
        toast.success("OTP sent to your email. Proceed to reset password.");
        navigate("/reset-password", { state: { email: values.email } }); // Pass email to ResetPassword
      } else {
        toast.error(res.data.message || "Failed to send reset link.");
      }
    } catch (error) {
      console.error("Error during OTP request:", error.response || error);
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
                    <h2 className="fw-bold mb-5">Forgot Password</h2>
                    <Form onFinish={handleForgotPassword}>
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
                            type: "email",
                            message: "Please enter a valid email address.",
                          },
                        ]}
                      >
                        <Input
                          prefix={<MailOutlined />}
                          placeholder="Enter your email address"
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="btn-primary primary rounded"
                        >
                          Send OTP
                        </Button>
                      </Form.Item>
                      <div className="mt-3 text-center">
                        <span>Remembered your password? </span>
                        <a href="/login" className="text-decoration-none">
                          Login here
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
