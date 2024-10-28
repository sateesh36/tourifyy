import React, { useEffect, useState } from "react";
import api from "../../api";
import { Navbar } from "../components/navbar";
import { Modal } from "antd";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Table, Button } from "react-bootstrap";
import KhaltiCheckout from "khalti-checkout-web";

export const Payment = () => {
  const [bookings, setBookings] = useState([]);
  const [paymentInProgress, setPaymentInProgress] = useState(false);

  useEffect(() => {
    fetchBookingHistory();
  }, []);

  const fetchBookingHistory = async () => {
    try {
      const response = await api.get("/Booking/history");

      if (response.data.success) {
        setBookings(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching booking history:", error);
    }
  };

  const deleteBooking = async (id) => {
    try {
      const response = await api.delete(`/Booking/DeleteBooking/${id}`);
      if (response.data) {
        fetchBookingHistory();
        toast.success(response.data.message);
      } // Handle the response data as needed
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusButtonVariant = (status) => {
    return status === "pending" ? "danger" : "success";
  };

  const getpaymentStatusButton = (paymentStatus) => {
    return paymentStatus === "pending" ? "danger" : "success";
  };
  //----------------**********************************************************************************************//
  //for khalit payment//

  const handlePayment = (booking) => {
    // Set the payment in progress to prevent multiple clicks
    // const amountInPaisa = booking.totalPrice * 100;
    setPaymentInProgress(true);

    const config = {
      publicKey: "test_public_key_a5865ce5ae8d4dc085006c3fc49330e9",
      secrectKey: "test_secret_key_ef3d9f7a7cc74583b26f00d1d6719b54",

      productIdentity: booking._id,
      productName: "Booking Payment",
      productUrl: window.location.href,
      eventHandler: {
        onSuccess(payload) {
          console.log(payload); // Payment success callback
          // Perform any necessary actions after successful payment

          // Reset the payment in progress
          setPaymentInProgress(false);

          // Refresh the booking history
          fetchBookingHistory();
          toast.success("Payment successful");
        },
        onError(error) {
          console.log(error); // Payment error callback

          // Reset the payment in progress
          setPaymentInProgress(false);
          toast.error("Payment failed");
        },
        onClose() {
          console.log("Payment closed"); // Payment closed callback

          // Reset the payment in progress
          setPaymentInProgress(false);
        },
      },
    };

    const checkout = new KhaltiCheckout(config);

    // Open Khalti Checkout when the payment button is clicked
    checkout.show({ amount: 20000 }); // Use the booking's total price for payment

    // checkout.show({ amount: amountInPaisa });
  };

  //for message model//

  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Navbar />

      <div style={{ marginTop: "100px" }}>
        <h2 className="text-center">Booking History</h2>
        {bookings.length === 0 ? (
          <h1 className="text-center" style={{ marginTop: "100px" }}>
            You havenot booked Yet
          </h1>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Tour Title</th>
                <th>Full Name</th>
                <th>Guest Size</th>
                <th>Total Price</th>
                <th>Number</th>
                <th>Book Date</th>
                <th className="text-center">Status</th>
                <th className="text-center">PaymentStatus</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.tourTitle}</td>
                  <td>{booking.fullName}</td>
                  <td>{booking.guestSize}</td>
                  <td>{booking.totalPrice}</td>
                  <td>{booking.phoneNumber}</td>
                  <td>{booking.bookAt}</td>
                  <td>
                    <Button
                      size="sm"
                      variant={getStatusButtonVariant(booking.status)}
                      disabled
                    >
                      {booking.status}
                    </Button>
                    {booking.status === "approved" && (
                      <>
                        <Button
                          onClick={handleOpenModal}
                          variant="outline-info"
                          size="sm"
                          style={{ marginLeft: "8px" }}
                        >
                          Message
                        </Button>

                        <Modal
                          title="Message Description"
                          visible={modalVisible}
                          onCancel={handleCloseModal}
                          footer={null}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "50vh",
                            }}
                          >
                            <div
                              style={{
                                backgroundColor: "#f2f2f2",
                                borderRadius: "5px",
                                padding: "20px",
                                textAlign: "center",
                                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                              }}
                            >
                              <h4
                                style={{
                                  color: "#333",
                                  fontSize: "24px",
                                  marginBottom: "10px",
                                }}
                              >
                                Message
                              </h4>
                              <p
                                style={{
                                  color: "#555",
                                  fontSize: "18px",
                                  lineHeight: "1.5",
                                }}
                              >
                                Your booking has been approved
                                <br />
                                For more information, contact this number
                                <p style={{ color: "red" }}>: 9840284937</p>
                              </p>
                            </div>
                          </div>
                        </Modal>
                      </>
                    )}

                    {booking.status === "pending" && (
                      <>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          style={{
                            marginLeft: "10px",
                          }}
                          onClick={() => {
                            deleteBooking(booking?._id);
                          }}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </td>
                  <td>
                    <Button
                      size="sm"
                      variant={getpaymentStatusButton(booking.paymentStatus)}
                      disabled
                    >
                      {booking.paymentStatus}
                    </Button>
                    {booking.paymentStatus === "pending" && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handlePayment(booking)}
                          disabled={paymentInProgress}
                          style={{
                            backgroundColor: " #5c2d91",
                            color: "white",
                            marginLeft: "8px",
                          }}
                        >
                          Pay
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </>
  );
};
