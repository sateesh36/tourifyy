import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Header } from "../../components/header/header";
import { Sidemenu } from "../../components/sidemenu/sidemenu";
import api from "../../api";

export const GetDays = () => {
  //for getting days//
  const [daysData, setDaysData] = useState([]);

  const fetchDays = async () => {
    try {
      const res = await api.get("Days/getAllDay");
      if (res && res.data.days) {
        setDaysData(res.data.days);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDays();
  }, []);
  //for deleting days//

  const DeleteDays = async (id) => {
    try {
      const res = await api.delete(`Days/deleteDay/${id}`);
      if (res.data) {
        fetchDays();
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
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
                <h4 className="card-title">Customer details</h4>

                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>SNo</th>
                        <th>TotalDays</th>
                        <th>Descriptions</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {daysData.map((day, index) => (
                        <tr key={day._id}>
                          <td>{index + 1}</td>
                          <td style={{ fontWeight: "bold" }}>
                            {day.totalDays}
                          </td>
                          <td>
                            <ul>
                              {day.descriptions.map((description) => (
                                <li key={description._id}>
                                  <strong>Day {description.day}:</strong>{" "}
                                  <br></br>
                                  {description.description.description}
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger custom-medium-btn"
                              style={{
                                fontSize: "12px",
                                padding: "4px 8px",
                              }}
                              onClick={() => {
                                DeleteDays(day._id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
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
