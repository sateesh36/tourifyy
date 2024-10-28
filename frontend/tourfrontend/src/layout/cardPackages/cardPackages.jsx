import React, { useEffect, useState } from "react";
import api from "../../api";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
// import { toast } from "react-toastify";

export const CardPackages = () => {
  // const [Tours, setDestination] = useState([]);
  const [listItem, setListItem] = useState();

  //for fetching all tour with all category

  const fetchDestination = async () => {
    try {
      const res = await api.get("/recommended/sorts/hello");
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
      <Navbar />
      <div className="untree_co-section" style={{ marginTop: "50px" }}>
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
            {listItem?.map((item) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                key={item._id}
              >
                <div className="card h-100">
                  <img
                    src={item.photo.url}
                    alt={item.title}
                    className="card-img-top"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">
                      <span className="icon-room mr-2"></span>
                      {item.city}
                    </p>
                    <div className="d-flex align-items-center">
                      <div>
                        <span>
                          {item.averageRating ? (
                            <>
                              {[...Array(Math.floor(item.averageRating))].map(
                                (star, index) => (
                                  <i
                                    key={index}
                                    className="fa fa-star"
                                    style={{ color: "gold" }}
                                  ></i>
                                )
                              )}
                              {item.averageRating % 1 !== 0 ? (
                                <i
                                  className="fa fa-star-half"
                                  style={{ color: "gold" }}
                                ></i>
                              ) : null}
                            </>
                          ) : (
                            "Not rated"
                          )}
                        </span>
                        <div className="price ml-auto">RS {item.price}</div>
                      </div>
                    </div>

                    <Link
                      to={`/booking/${item._id}`}
                      className="btn btn-primary mt-3"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
