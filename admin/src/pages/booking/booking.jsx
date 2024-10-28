import { Header } from "../../components/header/header";
import api from "../../api";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Sidemenu } from "../../components/sidemenu/sidemenu";

export const Booking = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await api.get("Booking/AllBooking");
      if (res) {
        setBookings(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const deleteBooking = async (id) => {
    try {
      const res = await api.delete(`Booking/DeleteBooking/${id}`);
      if (res.data) {
        fetchBookings();
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const approveBooking = async (id) => {
    try {
      const res = await api.put(`Booking/approve/${id}`);
      if (res.data) {
        fetchBookings();
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  const approvePayment = async (id) => {
    try {
      const res = await api.put(`Booking/payment/${id}`);
      if (res.data) {
        fetchBookings();
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  return (
    <>
      <Header />
      <Sidemenu />
      <ToastContainer />

      <section style={{ marginLeft: "270px" }}>
        <div className="row">
          <div className="col-15">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Booking details</h4>

                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>SNo</th>
                        <th>User FullName</th>
                        <th>User Email</th>
                        <th>Tour Title</th>
                        <th>Number</th>
                        <th>GuestSize</th>
                        <th>Book Date</th>
                        <th>Total Price</th>
                        <th className="text-center">Action</th>
                        <th className="text-center">PaymentStatus</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.length > 0 &&
                        bookings.map((booking, index) => {
                          return (
                            <tr key={booking._id}>
                              <td>{index + 1}</td>
                              <td>{booking.fullName}</td>
                              <td>{booking.userEmail}</td>
                              <td>{booking.tourTitle}</td>
                              <td>{booking.phoneNumber}</td>
                              <td>{booking.guestSize}</td>
                              <td>{booking.bookAt}</td>
                              <td>{booking.totalPrice}</td>

                              <td>
                                {booking.status === "pending" ? (
                                  <>
                                    {" "}
                                    <button
                                      className="btn btn-danger custom-medium-btn"
                                      style={{
                                        fontSize: "12px",
                                        padding: "4px 8px",
                                      }}
                                      onClick={() => {
                                        approveBooking(booking._id);
                                      }}
                                    >
                                      Approve
                                    </button>
                                    <button
                                      className="btn btn-danger custom-medium-btn"
                                      style={{
                                        margin: "5px",
                                        fontSize: "12px",
                                        padding: "4px 8px",
                                      }}
                                      onClick={() => {
                                        deleteBooking(booking._id);
                                      }}
                                    >
                                      Delete
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    className="btn btn-success custom-medium-btn"
                                    style={{
                                      fontSize: "12px",
                                      padding: "4px 8px",
                                    }}
                                    disabled
                                  >
                                    Approved
                                  </button>
                                )}
                              </td>
                              <td className="text-center">
                                {booking.paymentStatus === "pending" ? (
                                  <>
                                    <button
                                      className="btn btn-danger custom-medium-btn"
                                      style={{
                                        fontSize: "12px",
                                        padding: "4px 8px",
                                      }}
                                      onClick={() => {
                                        approvePayment(booking._id);
                                      }}
                                    >
                                      Approve
                                    </button>

                                    <button
                                      className="btn btn-danger custom-medium-btn"
                                      style={{
                                        margin: "5px",
                                        fontSize: "12px",
                                        padding: "4px 8px",
                                      }}
                                      onClick={() => {
                                        deleteBooking(booking._id);
                                      }}
                                    >
                                      Delete
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    className="btn btn-success custom-medium-btn"
                                    style={{
                                      fontSize: "12px",
                                      padding: "4px 8px",
                                    }}
                                    disabled
                                  >
                                    paid
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
