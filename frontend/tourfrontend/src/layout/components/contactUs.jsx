import React from "react";
import { Form, Input, Button, Card } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import api from "../../api";

export const ContactUs = () => {
  const onFinish = async (values) => {
    try {
      const response = await api.post("/ContactUs/", values);
      const { message } = response.data;

      // Display a success toast message
      toast.success(message);

      // Clear the form fields
      form.resetFields();
    } catch (error) {
      if (error.response && error.response.data) {
        // Display an error toast message
        toast.error("Email is already used");
      } else {
        console.error("Error submitting contact information:", error);
        // Display a generic error toast message
        toast.error(
          "Error submitting contact information. Please try again later."
        );
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Form validation failed:", errorInfo);
  };

  const cardStyle = {
    width: "400px",
    margin: "100px auto 10px",
    background: "rgba(255, 255, 255, 0.8)",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
  };

  let form;

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Card title="Contact Us" style={cardStyle}>
        <Form
          name="contactUsForm"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          ref={(f) => (form = f)}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email address" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: "Please enter your message" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
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
      <Footer />
    </>
  );
};
