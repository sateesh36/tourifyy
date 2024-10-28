import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import api from "../../api";
import { useParams } from "react-router-dom";
import { Sidemenu } from "../../components/sidemenu/sidemenu";
import { Header } from "../../components/header/header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AddDays = () => {
  const { id } = useParams();

  const [totalDays, setTotalDays] = useState("");
  const [descriptions, setDescriptions] = useState([]);

  const handleTotalDaysChange = (event) => {
    const days = parseInt(event.target.value);
    setTotalDays(days);

    // Generate initial descriptions array with empty values
    const initialDescriptions = Array.from({ length: days }, (_, index) => ({
      day: index + 1,
      description: "",
    }));
    setDescriptions(initialDescriptions);
  };

  const handleDescriptionChange = (index, field, value) => {
    const updatedDescriptions = [...descriptions];
    updatedDescriptions[index][field] = value;
    setDescriptions(updatedDescriptions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate if all descriptions are filled
    const areAllDescriptionsFilled = descriptions.every(
      (description) => description.description.trim() !== ""
    );

    if (!areAllDescriptionsFilled) {
      // Handle the case where not all descriptions are filled
      return;
    }
    // Convert totalDays to a number
    const parsedTotalDays = parseInt(totalDays, 10);

    // Prepare the payload
    const payload = {
      totalDays,
      descriptions,
    };

    // Make an API call to your backend server
    api
      .post(`Days/createDay/${id}`, payload)
      .then((response) => {
        // Handle the successful response from the server
        console.log(response.data);
        toast.success(response.data.message);

        // Reset the form
        setTotalDays(0);
        setDescriptions([]);
      })
      .catch((error) => {
        // Handle the error response from the server
        console.log(error);
      });
  };

  return (
    <>
      <Header />
      <Sidemenu />
      <ToastContainer />

      <section style={{ marginLeft: "360px" }}>
        <div className="row ">
          <div className="col-10 ">
            <div className="card ">
              <div className="card-body ">
                <h2>Create Day</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="totalDays">
                    <Form.Label>Total Days:</Form.Label>
                    <Form.Control
                      type="number"
                      value={totalDays}
                      onChange={handleTotalDaysChange}
                      required
                    />
                  </Form.Group>

                  {totalDays > 0 && (
                    <>
                      {descriptions.map((description, index) => (
                        <div key={index}>
                          <h4>Day {description.day}</h4>
                          <Form.Group controlId={`description${index}`}>
                            <Form.Label>Description:</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              value={description.description}
                              onChange={(event) =>
                                handleDescriptionChange(
                                  index,
                                  "description",
                                  event.target.value
                                )
                              }
                              required
                            />
                          </Form.Group>
                        </div>
                      ))}

                      <Button variant="primary" type="submit">
                        Create
                      </Button>
                    </>
                  )}
                </Form>{" "}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
