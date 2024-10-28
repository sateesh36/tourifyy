import { Button, Modal, Form } from "antd";
import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../api";
import { useNavigate } from "react-router-dom";

export const AddCat1 = ({ visible, onClose }) => {
  const navigate = useNavigate;
  const handleCancel = () => {
    form.resetFields();
    onClose();
  };
  const [form] = Form.useForm();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [formData, setFormData] = useState({
    name: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/category/", formData);
      if (res) {
        setFormData(res.data);

        window.location.reload();
        toast.success(res.data.message);

        navigate("/category");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <Modal
        visible={visible}
        title="Data Form"
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        <Form form={form} initialValues={formData}>
          <form>
            <div className="form-group">
              <label htmlFor="name">name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </Form>
      </Modal>
    </>
  );
};
