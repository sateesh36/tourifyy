import React, { useEffect, useState } from "react";
import { Sidemenu } from "../../components/sidemenu/sidemenu";
import { Header } from "../../components/header/header";
import api from "../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const MessageGet = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await api.get("ContactUs/getAllContact");
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
      // Display an error toast message
      toast.error("Error fetching messages. Please try again later.");
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      await api.delete(`ContactUs/deleteContact/${id}`);
      // Display a success toast message
      toast.success("Message deleted successfully");
      // Fetch the updated messages
      fetchMessages();
    } catch (error) {
      console.error("Error deleting message:", error);
      // Display an error toast message
      toast.error("Error deleting message. Please try again later.");
    }
  };

  return (
    <>
      <ToastContainer />
      <Header />
      <Sidemenu />
      <section style={{ marginLeft: "360px" }}>
        <div className="row ">
          <div className="col-10 ">
            <div className="card ">
              <div className="card-body ">
                <h4 className="card-title">Customer messages</h4>

                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>SNo</th>
                        <th>Name</th>
                        <th>E-mail</th>
                        <th>Messages</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {messages.length > 0 &&
                        messages?.map((message, id) => {
                          return (
                            <tr key={id}>
                              <td>{id + 1}</td>
                              <td>{message.name}</td>
                              <td>{message.email}</td>
                              <td>{message.message}</td>
                              <td>
                                <button
                                  className="btn btn-danger  custom-medium-btn"
                                  style={{
                                    fontSize: "12px",
                                    padding: " 4px 8px",
                                  }}
                                  onClick={() =>
                                    handleDeleteMessage(message._id)
                                  }
                                >
                                  Delete
                                </button>
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
