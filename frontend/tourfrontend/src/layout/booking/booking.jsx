import React, { useEffect, useState } from "react";
import { Navbar } from "../components/navbar";
import { useParams } from "react-router-dom";
import { StarFill, Star } from "react-bootstrap-icons";
import api from "../../api";
import { BookingForm } from "./bookingForm";
import { Card, Row, Col, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RelatedDestinations } from "./RelatedDestination";

export const Booking = () => {
  const [detailItem, setDetailItem] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await api.get(`/tour/${id}`);
        if (res) {
          setDetailItem(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, []);

  console.log(detailItem);
  // debugger;
  //this is for the booking formm//
  const [visible, setVisible] = useState(false);

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCreate = (values) => {
    console.log("Form values:", values);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [userName, setUserName] = useState(""); // User's name from another API

  useEffect(() => {
    fetchReviews();
    fetchUserName(); // Fetch user's name from another API
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await api.get(`/tour/${id}`);
      setReviews(response.data.data.reviews);
    } catch (error) {
      console.error(error);
    }
  };

  //used to fetch login user's  name //
  const fetchUserName = async () => {
    try {
      const response = await api.get("/user/me"); // Replace with the appropriate endpoint to fetch the user's name
      setUserName(response.data.name);
    } catch (error) {
      console.error(error);
    }
  };

  //used in submit and create reviews// Algorithm
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post(`/Review/Create/${id}`, {
        name: userName, // Use the fetched user's name
        comment,
        rating,
      });

      console.log(response.data);

      fetchReviews();

      setName("");
      setComment("");
      setRating(0);
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  //used to render star to the guven value such as 1 to 5// Algorithm
  const renderStars = (ratingValue) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${ratingValue >= i ? "filled" : ""}`}
          onClick={() => handleRatingChange(i)}
        >
          {ratingValue >= i ? (
            <StarFill color="gold" size={24} />
          ) : (
            <Star color="gray" size={24} />
          )}
        </span>
      );
    }
    return stars;
  };

  return (
    <>
      <Navbar />
      <ToastContainer />

      <section
        className="section-padding"
        style={{ marginBottom: "-40%", marginTop: "10%" }}
      >
        <div className="container">
          <Row justify-content-between align-items-center>
            <Col md={7}>
              <div className="img-container">
                {detailItem.photo && detailItem.photo.url ? (
                  <img
                    src={detailItem.photo.url}
                    alt="image"
                    className="img-fluid rounded"
                  />
                ) : (
                  <p>No image available</p>
                )}
              </div>
              <Col md={15}>
                <div>
                  {detailItem &&
                  detailItem.days &&
                  detailItem.days.length > 0 ? (
                    detailItem.days.map((day) => (
                      <Card key={day._id} className="my-3">
                        <Card.Header>
                          <strong>Total Days: {day.totalDays}</strong>
                        </Card.Header>
                        <Card.Body>
                          <ul>
                            {day.descriptions.map((description) => (
                              <li key={description._id}>
                                <strong>Day {description.day}:</strong>{" "}
                                <br></br>
                                <span className="font-weight-light">
                                  {description.description.description}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </Card.Body>
                      </Card>
                    ))
                  ) : (
                    <p>No days available</p>
                  )}
                </div>

                <div className="text-center">
                  <div>
                    <Button
                      className="btn btn-primary rounded"
                      type="primary"
                      onClick={handleOpenModal}
                    >
                      Book Now
                    </Button>
                    <BookingForm
                      visible={visible}
                      onCreate={handleCreate}
                      onCancel={handleCancel}
                    />
                  </div>
                </div>
              </Col>
              <Col md={7}>
                <div>
                  <h5>All Reviews</h5>
                  {reviews?.map((review) => (
                    <div key={review._id}>
                      <h6> Name: {review.name} </h6>
                      <h6>Comment: {review.comment}</h6>

                      <div className="star-rating">
                        {renderStars(review.rating)}
                      </div>
                      <hr />
                    </div>
                  ))}
                </div>
              </Col>
            </Col>
            <Col md={5}>
              <div>
                <h2 id="about-banner" className="text-center">
                  We provide the best quality
                  <br />
                  {detailItem.title}
                  <br />
                  <span className="text-warning">Tour Ever</span>
                </h2>

                <Card className="my-3">
                  <Card.Body>
                    <Card.Title>Price</Card.Title>
                    <Card.Text>Rs {detailItem.price}</Card.Text>
                  </Card.Body>
                </Card>

                <Card className="my-3">
                  <Card.Body>
                    <Card.Title>Location</Card.Title>
                    <Card.Text>{detailItem.address}</Card.Text>
                  </Card.Body>
                </Card>

                <Card className="my-3">
                  <Card.Body>
                    <Card.Title>Distance</Card.Title>
                    <Card.Text>{detailItem.distance} KM</Card.Text>
                  </Card.Body>
                </Card>

                <Card className="my-3">
                  <Card.Body>
                    <Card.Title>Maximum Group Size</Card.Title>
                    <Card.Text>{detailItem.maxGroupSize} people</Card.Text>
                  </Card.Body>
                </Card>

                <Card className="my-3">
                  <Card.Body>
                    <Card.Title>Short Description</Card.Title>
                    <Card.Text>{detailItem.desc}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <Col md={10}>
                <div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={userName} // Use the fetched user's name
                        readOnly
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="comment">Comment:</label>
                      <textarea
                        className="form-control"
                        id="comment"
                        rows="3"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        required
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="rating">Rating:</label>
                      <div className="star-rating">
                        {renderStars(rating)}{" "}
                        <button
                          type="submit"
                          className="btn btn-primary rounded"
                        >
                          Rate Tour
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </Col>
            </Col>
          </Row>
          <RelatedDestinations currentTour={detailItem} />

        </div>
      </section>
    </>
  );
};
