import React, { useState, useEffect } from "react";
import api from "./../api";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Body = () => {
  const [city, setCity] = useState("");
  const [distance, setDistance] = useState("");
  const [maxGroupSize, setMaxGroupSize] = useState("");
  const [listItem, setListItem] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const searchParams = `city=${encodeURIComponent(
        city.trim()
      )}&distance=${encodeURIComponent(
        distance.trim()
      )}&maxGroupSize=${encodeURIComponent(maxGroupSize.trim())}`;
      const response = await api.post(`/tour/search?${searchParams}`);
      setSearchResult(response.data.data);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
    console.log(searchResult);
  };

  const fetchDestination = async () => {
    try {
      const response = await api.get("/tour/");
      setListItem(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Get unique city names
  const getUniqueCities = (list) => {
    const cities = list.map((item) => item.city);
    return [...new Set(cities)]; // This will filter out duplicate cities
  };

  useEffect(() => {
    fetchDestination();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="intro-wrap">
                <h1 className="mb-5">
                  <span className="d-block">Let's Enjoy Your</span> Holidays
                </h1>

                <div className="row">
                  <div className="col-12">
                    <form className="form" onSubmit={handleFormSubmit}>
                      <div className="row mb-2">
                        
                        <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-5">
                          <select
                            name="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="form-control custom-select"
                          >
                            <option value="">City</option>
                            {getUniqueCities(listItem).map((cityName) => (
                              <option key={cityName} value={cityName}>
                                {cityName}
                              </option>
                            ))}
                          </select>
                        </div>

                        
                        <div className="col-sm-12 col-md-6 mb-1 mb-lg-0 col-lg">
                          <input
                            type="number"
                            className="form-control"
                            name="distance"
                            value={distance}
                            onChange={(e) => setDistance(e.target.value)}
                            placeholder="Distance (km)"
                            min="0"
                          />
                        </div>

                        
                        <div className="col-sm-12 col-md-6 mb-1 mb-lg-0 col-lg">
                          <input
                            type="number"
                            className="form-control"
                            name="maxGroupSize"
                            value={maxGroupSize}
                            onChange={(e) => setMaxGroupSize(e.target.value)}
                            placeholder="Max no of People"
                            min="1"
                          />
                        </div>
                      </div>

                      
                      <div className="row align-items-center">
                        <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-4">
                          <button type="submit" className="btn btn-primary btn-block">
                            Search
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

           
            <div className="col-lg-5">
              <div className="slides">
                <img
                  src="images/hero-slider-1.jpg"
                  alt="Image"
                  className="img-fluid active"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="row" style={{ marginLeft: "30px" }}>
        {searchResult?.map((item) => {
          return (
            <>
              <div
                className="col-6 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0  imageID"
                key={item._id}
              >
                <div className="media-1">
                  <div style={{ height: "30%" }}>
                    <img
                      src={item.photo.url}
                      alt="imageHo"
                      style={{ width: "70%", height: "250px", objectFit: "cover" }}
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
                            className="btn btn-primary  rounded custom-small-btn ml-5"
                            style={{
                              fontSize: "12px",
                              padding: " 4px 8px",
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
            </>
          );
        })}
      </div>
    </>
  );
};
