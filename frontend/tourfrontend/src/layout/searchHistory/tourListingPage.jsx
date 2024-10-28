import React, { useState, useEffect } from "react";
import api from "../../api";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "../components/navbar";
import { Form, Row, Col, Button } from "react-bootstrap";

export const TourList = () => {
  const [priceRanges, setPriceRanges] = useState("");
  const [city, setCity] = useState("");
  const [categories, setCategories] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [listItem, setListItem] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const url =
        "/tour/searchAlgorithm" +
        `?priceRange=${priceRanges}` +
        `&category=${categories}` +
        `&city=${city.trim()}` +
        `&sortBy=${priceSort}`;

      const response = await api.post(url);
      setSearchResult(response.data);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const fetchDestination = async () => {
    try {
      const response = await api.get("/tour/");
      setListItem(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDestination();
  }, []);
  
  const getUniqueCities = (list) => {
    const cities = list.map((item) => item.city);
    return [...new Set(cities)]; // This will filter out duplicate cities
  };

  useEffect(() => {
    api
      .get("category/Get")
      .then((res) => {
        setCategoryData(res.data.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <Navbar />
      <ToastContainer />

      <div className="row" style={{ marginLeft: "30px", marginTop: "100px" }}>
        <Form>
          <Row className="mb-2">
            <Col sm={12} md={6} lg={3} className="mb-3 mb-lg-0">
              <Form.Control
                as="select"
                name="priceRange"
                value={priceRanges}
                onChange={(e) => setPriceRanges(e.target.value)}
              >
                <option value="">Price Range</option>
                <option>100-1000</option>
                <option>100-2000</option>
                <option>100-3000</option>
                <option>100-5000</option>
                <option>100-10000</option>
                <option>100-50000</option>
                <option>100-100000</option>
              </Form.Control>
            </Col>

            <Col sm={12} md={6} lg={3}>
              <Form.Control
                as="select"
                name="category"
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                {categoryData?.map((item) => (
                  <option key={item._id} value={item.name}>
                    {item?.name}
                  </option>
                ))}
              </Form.Control>
            </Col>
            <Col sm={12} md={6} lg={3}>
              <Form.Control
                as="select"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="custom-select"
              >
                <option value="">City</option>
                            {getUniqueCities(listItem).map((cityName) => (
                              <option key={cityName} value={cityName}>
                                {cityName}
                              </option>
                ))}
              </Form.Control>
            </Col>
            <Col sm={12} md={6} lg={3}>
              <Form.Control
                as="select"
                name="priceSort"
                value={priceSort}
                onChange={(e) => setPriceSort(e.target.value)}
                className="custom-select"
              >
                <option value="">Sort By</option>
                <option value="priceHighToLow">priceHighToLow</option>
                <option value="priceLowToHigh">priceLowToHigh</option>
              </Form.Control>
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={6} lg={3} offset={{ lg: 9 }}>
              <Button
                type="submit"
                className="btn btn-primary btn-block"
                onClick={handleFormSubmit}
              >
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </div>

      <div className="row" style={{ marginLeft: "30px", marginTop: "60px" }}>
        {searchResult.length === 0 ? (
          <h5 className="text-center" style={{ marginLeft: "480px" }}>
            No search result found
          </h5>
        ) : (
          searchResult?.map((item) => (
            <div
              className="col-6 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0  imageID"
              key={item._id}
            >
              <div className="media-1">
                <div style={{ height: "30%" }}>
                  <img src={item?.photo?.url} alt="imageHo" />
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
                          className="btn btn-primary  rounded custom-small-btn ml-5"
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
        )}
      </div>
    </>
  );
};
