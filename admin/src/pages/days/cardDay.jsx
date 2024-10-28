import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card } from "react-bootstrap";
import { Header } from "../../components/header/header";
import { Sidemenu } from "../../components/sidemenu/sidemenu";
import api from "../../api";

export const CardDays = () => {
  const [daysData, setDaysData] = useState([]);

  const fetchDays = async () => {
    try {
      const res = await api.get("Days/getAllDay");
      if (res) {
        setDaysData(res.data.days);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDays();
  }, []);

  return (
    <>
      <ToastContainer />
      <Header />
      <Sidemenu />
      <section style={{ marginLeft: "360px" }}>
        <div className="row">
          <div className="col-10">
            <Card>
              <Card.Body>
                <Card.Title>Customer Details</Card.Title>
                <div>
                  <h2>Days</h2>
                  {daysData.map((day) => (
                    <Card key={day._id} className="my-3">
                      <Card.Header>
                        <strong>Total Days: {day.totalDays}</strong>
                      </Card.Header>
                      <Card.Body>
                        <ul>
                          {day.descriptions.map((description) => (
                            <li key={description._id}>
                              <strong>Day {description.day}:</strong>{" "}
                              <span className="font-weight-bold">
                                {description.description.day}
                              </span>{" "}
                              -{" "}
                              <span className="font-weight-light">
                                {description.description.description}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};
