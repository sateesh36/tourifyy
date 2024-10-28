import React from "react";

export const Footer = () => {
  return (
    <>
      <div className="site-footer">
        <div className="inner first">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-lg-4">
                <div className="widget">
                  <h3 className="heading">About Tour</h3>
                  <p>
                    Travel is also a great way to create lasting memories with
                    loved ones or to take some time for yourself. You can relax
                    on a beach, go on a hiking adventure, or explore a bustling
                    city - the possibilities are endless.
                  </p>
                </div>
                <div className="widget">
                  <ul className="list-unstyled social">
                    <li>
                      <a to="#">
                        <span className="icon-twitter"></span>
                      </a>
                    </li>
                    <li>
                      <a to="#">
                        <span className="icon-instagram"></span>
                      </a>
                    </li>
                    <li>
                      <a to="#">
                        <span className="icon-facebook"></span>
                      </a>
                    </li>
                    <li>
                      <a to="#">
                        <span className="icon-linkedin"></span>
                      </a>
                    </li>
                    <li>
                      <a to="#">
                        <span className="icon-dribbble"></span>
                      </a>
                    </li>
                    <li>
                      <a to="#">
                        <span className="icon-pinterest"></span>
                      </a>
                    </li>
                    <li>
                      <a to="#">
                        <span className="icon-apple"></span>
                      </a>
                    </li>
                    <li>
                      <a to="#">
                        <span className="icon-google"></span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6 col-lg-2 pl-lg-5">
                <div className="widget">
                  <h3 className="heading">Pages</h3>
                  <ul className="links list-unstyled">
                    <li>
                      <a to="/login">login</a>
                    </li>
                    <li>
                      <a to="#">About</a>
                    </li>
                    <li>
                      <a to="#">Contact</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6 col-lg-2">
                <div className="widget">
                  <h3 className="heading">Resources</h3>
                  <ul className="links list-unstyled">
                    <li>
                      <a to="#">Blog</a>
                    </li>
                    <li>
                      <a to="#">About</a>
                    </li>
                    <li>
                      <a to="#">Contact</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="widget">
                  <h3 className="heading">Contact</h3>
                  <ul className="list-unstyled quick-info links">
                    <li className="email">
                      <a to="#">Satish.karki.330@gmail.com</a>
                      <br></br>
                      <a to="#">Biplovmalla69@gmail.com</a>
                    </li>
                    <li className="phone">
                      <a to="#">+9779840287847</a>
                      <a to="#">+9779805477742</a>
                    </li>
                    <li className="address">
                      <a>Sinamangal, Kathmandu </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div id="overlayer"></div>
      <div className="loader">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div> */}
    </>
  );
};
