import React from "react";
import { Link } from "react-router-dom";

export const Explore = () => {
  return (
    <>
      <div className="py-5 cta-section">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-12">
              <h2 className="mb-2 text-white">
                Lets you Explore the Best. Login Now
              </h2>
              <p className="mb-4 lead text-white text-white-opacity">
                So, if you're looking for an escape from the ordinary, travel is
                the perfect way to satisfy your curiosity, expand your mind, and
                create unforgettable experiences! Please click the Button.
              </p>
              <p className="mb-0">
                <Link to="/login">
                  <a className="btn btn-outline-white text-white btn-md font-weight-bold">
                    Login
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
