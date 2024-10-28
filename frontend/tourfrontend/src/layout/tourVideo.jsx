import React from "react";

export const TourVideo = () => {
  return (
    <>
      <div className="untree_co-section  ">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-4">
              <figure className="img-play-video">
                <a
                  id="play-video"
                  className="video-play-button"
                  style={{ height: "20px" }}
                  href="https://www.youtube.com/watch?v=j61j9X4xCnA"
                  data-fancybox
                  target="_blank"
                >
                  <span></span>
                </a>
                <img
                  src="images/mountains.avif"
                  alt="Image"
                  className="img-fluid rounded-20 "
                />
              </figure>
            </div>

            <div className="col-lg-7">
              <h2 className="section-title text-left mb-4">
                Take a look at Video about Nepal places
              </h2>
              <p>
                The Nepal video showcases the beauty and diversity of this South
                Asian country. With its stunning mountain ranges, ancient
                temples, and intricate stupas, Nepal is a must-visit destination
                for travelers seeking a rich cultural and natural experience.
              </p>
              <p className="mb-4">
                The video takes viewers on a journey through Nepal's
                breathtaking landscapes, showcasing the towering Himalayan peaks
                and lush green valleys. The country's spiritual side is also
                highlighted through its many temples and stupas, which are
                adorned with intricate carvings and ornate decorations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
