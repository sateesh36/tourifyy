import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import api from "../../api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AddPackage1 = ({ visible, onClose }) => {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    city: "",
    address: "",
    distance: "",
    desc: "",
    price: "",
    category: "",
    maxGroupSize: "",
  });

  //api for storing tour data//

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("city", formData.city);
      data.append("address", formData.address);
      data.append("distance", formData.distance);
      data.append("desc", formData.desc);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("photo", selectedFile);
      data.append("maxGroupSize", formData.maxGroupSize);
      console.log(formData);

      // Logging the FormData object
      for (const entry of data.entries()) {
        console.log(entry[0], entry[1]);
      }

      const res = await axios.post(
        "http://localhost:5000/api/tour/create",

        data,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to FormData
          },
        }
      );

      if (res) {
        setFormData(res.data.data);
        window.location.reload();

        navigate("/package");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Fill all the form");
    }
  };

  //getting category list//
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    api
      .get("category/Get")
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {});
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="distance">Distance</label>
              <input
                type="number"
                className="form-control"
                id="distance"
                name="distance"
                value={formData.distance}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="photo">Photo</label>
              <input type="file" required onChange={handleFileChange} />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="desc"
                value={formData.desc}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="maxGroupSize">Max Group Size</label>
              <input
                type="number"
                className="form-control"
                id="maxGroupSize"
                name="maxGroupSize"
                value={formData.maxGroupSize}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                className="form-control"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>

                {categories?.map((item) => {
                  return (
                    <option key={item._id} value={item._id}>
                      {item?.name}
                    </option>
                  );
                })}
              </select>
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
