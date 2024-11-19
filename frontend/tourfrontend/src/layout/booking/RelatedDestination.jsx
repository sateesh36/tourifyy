// import React, { useEffect, useState } from "react";
// import { Card, Row, Col } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import api from "../../api";

// export const RelatedDestinations = ({ currentTour, allTours }) => {
//   const [relatedDestinations, setRelatedDestinations] = useState([]);
//   const [listItem, setListItem] = useState([]);


//   //for getting seperate item with seperate category//

//   const getItemCategory = async (id) => {
//     try {
//       const res = await api.get(`/category/${id}`);
//       setListItem(res.data);
//       console.log(res.data)
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     if ( listItem) {

//       const fetchCategory = async () => {
//         await getItemCategory(currentTour._id);
//         // Filter tours based on the current tour's category or city
//         console.warn("THe fetched category +====> ", listItem)
//       }

//       fetchCategory();
//       const related = listItem.filter(
//         (tour) =>
//           tour._id !== currentTour._id && // Exclude the current tour
//           (tour.category === currentTour.category || tour.city === currentTour.city)
//       );
//       setRelatedDestinations(related);
      
//     }
//   }, []);



//   return (
//     <section className="related-destinations section-padding">
//       <div className="container">
//         <h4 className="mb-4">Related Destinations</h4>
//         <Row>
//           {relatedDestinations.length > 0 ? (
//             relatedDestinations.map((destination) => (
//               <Col md={4} key={destination._id} className="mb-3">
//                 <Card>
//                   <Card.Img
//                     variant="top"
//                     src={destination.photo?.url || "https://via.placeholder.com/150"}
//                     alt={destination.title}
//                   />
//                   <Card.Body>
//                     <Card.Title>{destination.title}</Card.Title>
//                     <Card.Text>
//                       <strong>Price:</strong> Rs {destination.price}
//                       <br />
//                       <strong>Location:</strong> {destination.city}
//                     </Card.Text>
//                     <Link
//                       to={`/tour/${destination._id}`}
//                       className="btn btn-primary rounded"
//                     >
//                       View Details
//                     </Link>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))
//           ) : (
//             <p>No related destinations available</p>
//           )}
//         </Row>
//       </div>
//     </section>
//   );
// };

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";

export const RelatedDestinations = ({ currentTour }) => {
  const [listItem, setListItem] = useState([]);
  const [randomCards, setRandomCards] = useState([]);

  // Fetch all destinations
  const fetchDestination = async () => {
    try {
      const res = await api.get("/tour/");
      if (res) {
        setListItem(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching destinations:", error);
    }
  };

  // Get 1 to 3 random cards with unique titles and categories
  const getRandomCards = () => {
    if (listItem.length > 0) {
      // Filter out the current tour by title and category
      const filtered = listItem.filter(
        (tour) =>
          tour._id !== currentTour._id && // Exclude the current tour
          tour.title !== currentTour.title // Exclude the same title
      );

      // Shuffle and pick up to 3 random items from different categories
      const shuffled = [...filtered].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, Math.min(3, shuffled.length)); // Ensure no more than 3 items
      setRandomCards(selected);
    }
  };

  useEffect(() => {
    fetchDestination();
  }, []);

  useEffect(() => {
    if (listItem.length > 0) {
      getRandomCards();
    }
  }, [listItem, currentTour]);

  return (
    <div className="untree_co-section">
      <div className="container">
        <h4 className="mb-4 text-center">Related Destinations</h4>
        <div className="row">
          {randomCards.length > 0 ? (
            randomCards.map((item) => (
              <div
                className="col-6 col-sm-6 col-md-6 col-lg-3 mb-4"
                key={item._id}
              >
                <div className="media-1">
                  <div style={{ height: "30%" }}>
                    <img
                      src={item.photo?.url || "https://via.placeholder.com/150"}
                      alt={item.title}
                      className="img-fluid"
                    />
                  </div>
                  <span className="d-flex align-items-center loc mb-2">
                    <span className="icon-room mr-3"></span>
                    <span>{item.city}</span>
                  </span>
                  <div className="d-flex align-items-center">
                    <div>
                      <h3>
                        <a>{item.title}</a>
                      </h3>
                      <div className="price ml-auto">
                        <span>RS {item.price}</span>
                        <Link to={`/booking/${item._id}`}>
                          <button
                            className="btn btn-primary rounded custom-small-btn ml-5"
                            style={{
                              fontSize: "12px",
                              padding: "4px 8px",
                            }}
                          >
                            Read More
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No destinations available</p>
          )}
        </div>
      </div>
    </div>
  );
};
