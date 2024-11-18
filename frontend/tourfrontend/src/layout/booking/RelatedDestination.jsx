import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export const RelatedDestinations = ({ currentTour, allTours }) => {
  const [relatedDestinations, setRelatedDestinations] = useState([]);

  useEffect(() => {
    if (currentTour && allTours) {
      // Filter tours based on the current tour's category or city
      const related = allTours.filter(
        (tour) =>
          tour._id !== currentTour._id && // Exclude the current tour
          (tour.category === currentTour.category || tour.city === currentTour.city)
      );
      setRelatedDestinations(related);
    }
  }, [currentTour, allTours]);

  return (
    <section className="related-destinations section-padding">
      <div className="container">
        <h4 className="mb-4">Related Destinations</h4>
        <Row>
          {relatedDestinations.length > 0 ? (
            relatedDestinations.map((destination) => (
              <Col md={4} key={destination._id} className="mb-3">
                <Card>
                  <Card.Img
                    variant="top"
                    src={destination.photo?.url || "https://via.placeholder.com/150"}
                    alt={destination.title}
                  />
                  <Card.Body>
                    <Card.Title>{destination.title}</Card.Title>
                    <Card.Text>
                      <strong>Price:</strong> Rs {destination.price}
                      <br />
                      <strong>Location:</strong> {destination.city}
                    </Card.Text>
                    <Link
                      to={`/tour/${destination._id}`}
                      className="btn btn-primary rounded"
                    >
                      View Details
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>No related destinations available</p>
          )}
        </Row>
      </div>
    </section>
  );
};
