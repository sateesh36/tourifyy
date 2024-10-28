import React, { useState } from "react";
import api from "../../api";
import { useParams } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { Form, Input, Button } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { id } = useParams();

  const handleChangePassword = async () => {
    try {
      const response = await api.put(`/user/ChangePassword/${id}`, {
        oldPassword,
        newPassword,
      });

      if (response.data.message === "Password changed successfully") {
        toast.success(response.data.message);
      } else if (
        response.status === 401 &&
        response.data.message === "Invalid old password"
      ) {
        toast.error("Invalid old password");
      } else if (oldPassword === newPassword) {
        toast.error("Old password and new password matched");
      }
    } catch (error) {
      toast.error(
        error.response.data.message ||
          "Password must be greater than 8 characters"
      );
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
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
                  <div className="col-lg-8 ">
                    <h2 className="fw-bold mb-5">Change Password</h2>
                    <Form onFinish={handleChangePassword}>
                      <Form.Item
                        name="oldPassword"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your old password.",
                          },
                        ]}
                      >
                        <Input.Password
                          prefix={<LockOutlined />}
                          placeholder="Old Password"
                          iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                          }
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
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
                            message: "Password must be at least 8 characters.",
                          },
                          {
                            pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                            message:
                              "Password must contain at least 8 characters, including both letters, numbers, and special characters.",
                          },
                        ]}
                      >
                        <Input.Password
                          prefix={<LockOutlined />}
                          placeholder="New Password"
                          iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                          }
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="btn-primary primary rounded"
                        >
                          Change Password
                        </Button>
                      </Form.Item>
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
