import { Body } from "./layout/body";
import { CardDestinarion } from "./layout/cardDestination";
import { Footer } from "./layout/components/footer";
import { Navbar } from "./layout/components/navbar";
import { Explore } from "./layout/explore";
import { TourVideo } from "./layout/tourVideo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  return (
    <>
      <div>
        <ToastContainer />
        <Navbar />
        <Body />
        <CardDestinarion />
        <TourVideo />
        <Explore />
        <Footer />
      </div>
    </>
  );
}

export default Home;
