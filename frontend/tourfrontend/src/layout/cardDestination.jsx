import React, { useEffect, useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

export const CardDestinarion = () => {
  // const [Tours, setDestination] = useState([]);
  const [listItem, setListItem] = useState();

  //for fetching all tour with all category

  const fetchDestination = async () => {
    try {
      const res = await api.get("/tour/");
      // debugger;
      if (res) {
        setListItem(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDestination();
  }, []);

  //for fetching category such as history in list//

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await api.get("/category/Get");
        if (res) {
          setCategories(res.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getCategory();
  }, []);

  //for getting seperate item with seperate category//

  const getItemCategory = async (id) => {
    try {
      const res = await api.get(`/category/${id}`);
      setListItem(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="untree_co-section">
        <div className="container">
          <div className="text-center">
            <h2>Packages &amp; categories</h2>
            <p className=" row text-center font-weight-bold">
              As a traveller, you'll have the opportunity to explore new
              destinations, meet new people, and broaden your horizons. You'll
              be able to immerse yourself in different cultures, try new foods,
              and experience life from a different perspective.
            </p>

            <ul style={{ listStyleType: "square" }}>
              {categories?.map((item) => {
                return (
                  <>
                    <li className="list-inline-item" key={item._id}>
                      <button
                        className="btn btn-primary btn-rounded"
                        type="button"
                        onClick={() => {
                          getItemCategory(item._id);
                        }}
                      >
                        {item.name}
                      </button>
                    </li>
                  </>
                );
              })}
              <li className="list-inline-item">
                <button
                  className="btn btn-danger btn-rounded"
                  type="button"
                  onClick={() => {
                    fetchDestination();
                  }}
                >
                  AllCategory
                </button>
              </li>
            </ul>
          </div>
          <div className="row">
            {/* {JSON.stringify(Tours)} */}
            {listItem?.map((item) => {
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
                          // className="img-fluid"
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
        </div>
      </div>
    </>
  );
};
