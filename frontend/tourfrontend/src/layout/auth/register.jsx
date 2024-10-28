import React, { useState } from "react";
import { Navbar } from "../components/navbar";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (values) => {
    try {
      const res = await api.post("/user/register", values);

      if (res.status === 200) {
        navigate("/login");
      } else {
        // Handle different error cases based on response
        const errorMessage = res.data.message || "Registration failed";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Error during registration:", error.response || error); // Log detailed error
      const errorMessage = error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Navbar />
      <section style={{ marginLeft: "260px" }} className="text-center">
        <div className="row ">
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
                    <h2 className="fw-bold mb-5">Register Now</h2>
                    <Form onFinish={handleSubmit}>
                      <Form.Item
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your name.",
                          },
                          {
                            pattern: /^[A-Za-z][A-Za-z0-9]*$/,
                            message: "Username must start with a letter and can include numbers.",
                          },
                        ]}
                      >
                        <Input
                          prefix={<UserOutlined />}
                          placeholder="Enter name"
                          onChange={(e) => handleChange("name", e.target.value)}
                        />
                      </Form.Item>
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
                          placeholder="Enter email"
                          onChange={(e) =>
                            handleChange("email", e.target.value)
                          }
                        />
                      </Form.Item>
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Please enter a password.",
                          },
                          {
                            min: 8,
                            message: "Password must be at least 8 characters.",
                          },
                          {
                            pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                            message: "Password must contain at least 8 characters, including both letters, numbers, and special characters.",
                          },
                        ]}
                      >
                        <Input.Password
                          prefix={<LockOutlined />}
                          placeholder="Password"
                          onChange={(e) =>
                            handleChange("password", e.target.value)
                          }
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="btn-primary primary rounded"
                        >
                          Register
                        </Button>
                      </Form.Item>
                      <div className="mt-3 text-center">
                        <span>Already Registered? </span>
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
      <div
        className="p-12 bg-image"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/637696304/photo/patan.jpg?s=612x612&w=0&k=20&c=-53aSTGBGoOOqX5aoC3Hs1jhZ527v3Id_xOawHHVPpg=')",
          height: "100vh",
          position: "fixed",
          backgroundSize: "cover",
          top: 0,
          left: 0,
          right: 0,
          zIndex: -1,
        }}
      ></div>
    </>
  );
};
