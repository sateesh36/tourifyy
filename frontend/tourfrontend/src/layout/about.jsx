import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Footer } from "./components/footer";
import { Navbar } from "./components/navbar";

export const About = () => {
  return (
    <>
      <Navbar />
      <Container style={{ marginTop: "100px" }}>
        <Row>
          <Col>
            <h2>About Us</h2>
            <p>
              Welcome to our tour agency, where we specialize in providing
              unforgettable journeys to the fascinating destinations of Nepal.
              From world heritage sites and historic landmarks to national
              parks, worship areas, and adventure spots, we offer diverse tours
              that showcase the best of Nepal's natural and cultural treasures.
            </p>
            <h3>Our Tours</h3>
            <p>
              At our agency, we offer a wide range of tours that cater to
              different interests and preferences. Some of our popular tours in
              Nepal include:
            </p>
            <ul>
              <li>
                <strong>World Heritage Sites Expedition:</strong> Explore the
                UNESCO World Heritage sites of Nepal, such as the Kathmandu
                Durbar Square, Pashupatinath Temple, Boudhanath Stupa, and
                Swayambhunath. Immerse yourself in the rich history, art, and
                architecture of these iconic cultural landmarks.
              </li>
              <li>
                <strong>Historic Kathmandu Valley Tour:</strong> Discover the
                historic sites of the Kathmandu Valley, including the ancient
                cities of Kathmandu, Bhaktapur, and Patan. Visit the palaces,
                temples, and squares that reflect Nepal's rich heritage and
                vibrant cultural traditions.
              </li>
              <li>
                <strong>National Parks Exploration:</strong> Experience the
                natural beauty and wildlife of Nepal's national parks, such as
                Chitwan National Park and Bardia National Park. Embark on jungle
                safaris, spot rare wildlife species, and immerse yourself in the
                biodiversity of these protected areas.
              </li>
              <li>
                <strong>Spiritual Pilgrimage:</strong> Embark on a spiritual
                journey to sacred places like Muktinath, Lumbini, and Janakpur.
                Explore the birthplace of Lord Buddha, witness ancient temples,
                and partake in religious rituals that hold deep cultural
                significance.
              </li>
              <li>
                <strong>Adventure Expeditions:</strong> Indulge in thrilling
                adventures in Nepal, including trekking to Everest Base Camp,
                Annapurna Circuit, or Langtang Valley. Experience breathtaking
                mountain views, challenging trails, and the hospitality of local
                communities.
              </li>
            </ul>
            <h3>Why Choose Us?</h3>
            <p>
              There are several reasons why you should choose our tour agency
              for your Nepal adventure:
            </p>
            <ul>
              <li>
                Local expertise and knowledgeable guides who offer insights into
                Nepal's history, culture, and natural wonders.
              </li>
              <li>
                Customizable itineraries tailored to your preferences, allowing
                you to create a unique and personalized journey.
              </li>
              <li>
                Small group sizes for a more intimate and immersive experience.
              </li>
              <li>
                Comfortable accommodations and reliable transportation
                arrangements for a hassle-free trip.
              </li>
              <li>
                Commitment to sustainable tourism practices, supporting local
                communities and preserving Nepal's natural and cultural
                heritage.
              </li>
            </ul>
            <p>
              Join us on an extraordinary expedition to explore the wonders of
              Nepal's world heritage sites, historic landmarks, national parks,
              worship areas, and adventure spots. Contact us today to book your
              tour!
            </p>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};
