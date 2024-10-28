import React, { useEffect } from "react";
import { useState } from "react";
import { Form, Modal, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const BookingForm = ({ visible, onCancel }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();
  const [detailItem, setDetailItem] = useState(null);
  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [formData, setFormData] = useState({
    fullName: userName,
    userEmail: userEmail,
    tourTitle: "",
    phoneNumber: "",
    guestSize: "",
    bookAt: "",
    totalPrice: "",
  });
  const saveData = async (e) => {
    e.preventDefault();
    try {
      let loginUser = localStorage.getItem("login");
      if (loginUser === "true") {
        formData.totalPrice = parseInt(formData.guestSize) * detailItem?.price;

        const res = await api.post("/Booking/DoBooking", formData);
        if (res) {
          setFormData(res.data.data);
          toast.success(res.data.message);
          form.resetFields();
        } else {
          toast.error(res.err.message);
        }
      } else {
        toast.error("User is not logged in. Cannot save the data.");
      }
    } catch (error) {
      toast.error("Form filled with wrong information");
    }
  };

  //for geeting user name and email and tourtitle in the form.//

  const fetchDetails = async () => {
    try {
      const [tourResponse, userResponse] = await Promise.all([
        api.get(`/tour/${id}`),
        api.get("/user/me"),
      ]);

      if (tourResponse && userResponse) {
        setDetailItem(tourResponse.data.data);
        const initialFormData = {
          fullName: userResponse.data.name,
          userEmail: userResponse.data.email,
          tourTitle: tourResponse.data.data.title || "", // Set tourTitle to an empty string if it doesn't exist
          phoneNumber: "",
          guestSize: "",
          bookAt: "",
          totalPrice: "",
        };
        setFormData(initialFormData);
        form.setFieldsValue(initialFormData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

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
              <label htmlFor="fullname">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="FullName"
                name="fullName"
                value={formData.fullName}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="userEmail"
                value={formData.userEmail}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="tourName">Tour Name</label>
              <input
                className="form-control"
                id="TourName"
                name="tourTitle"
                value={formData.tourTitle}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                maxLength={10}
                pattern="[0-9]{10}"
              />
            </div>
            <div className="form-group">
              <label htmlFor="size">Guest Size</label>
              <input
                type="number"
                className="form-control"
                id="size"
                name="guestSize"
                value={formData.guestSize}
                onChange={handleChange}
                required
              />
            </div>
            <h2>Total Price</h2>
            <p>{parseInt(formData.guestSize) * detailItem?.price}</p>
            <div className="form-group">
              <label htmlFor="bookat">Date</label>
              <input
                className="form-control"
                type="date"
                id="bookAt"
                name="bookAt"
                value={formData.bookAt}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={saveData}
            >
              Submit
            </button>
          </form>
        </Form>
      </Modal>
    </>
  );
};
