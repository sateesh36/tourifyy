import React, { useEffect, useState } from "react";
import { Sidemenu } from "../../components/sidemenu/sidemenu";
import { Header } from "../../components/header/header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import api from "../../api";

export const AddReviews = () => {
  //to get category data//

  const [Reviews, getReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const res = await api.get("/Review/findRatings");

      if (res) {
        getReviews(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchReviews();
  }, []);

  //to delete category data//
  const DeleteReview = async (id) => {
    try {
      const Del = await api.delete(`/Review/deleteRatings/${id}`);
      if (Del.data) {
        fetchReviews();
        toast.success(Del.data.message);
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
                <h4 className="card-title">Reviews details</h4>

                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>SNo</th>
                        <th>Name</th>
                        <th>Comments</th>
                        <th>Ratings</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Reviews.length > 0 &&
                        Reviews?.map((ReviewsData, id) => {
                          return (
                            <>
                              <tr kry={id}>
                                <td>{id + 1}</td>
                                <td>{ReviewsData?.name}</td>
                                <td>{ReviewsData?.comment}</td>

                                <td>
                                  {Array.from(
                                    { length: ReviewsData?.rating },
                                    (_, index) => (
                                      <FontAwesomeIcon
                                        icon={faStar}
                                        key={index}
                                        style={{ color: "goldenrod" }}
                                      />
                                    )
                                  )}
                                </td>

                                <td>
                                  <button
                                    className="btn btn-danger  custom-medium-btn"
                                    style={{
                                      fontSize: "12px",
                                      padding: " 4px 8px",
                                    }}
                                    onClick={() => {
                                      DeleteReview(ReviewsData?._id);
                                    }}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            </>
                          );
                        })}
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
