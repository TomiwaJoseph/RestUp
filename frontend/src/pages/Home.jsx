import FeaturedRooms from "../components/FeaturedRooms";
import Features from "../components/Features";
import LandingPageCarousel from "../components/LandingPageCarousel";
import Testimonials from "../components/Testimonials";
import VideoText from "../components/VideoText";
import { useSelector } from "react-redux";

const Home = () => {
  const storeContext = useSelector((state) => state.store);
  const { backendUrl, fetchingData, featuredRoomsData } = storeContext;
  // const carouselOptions = {
  //   margin: 30,
  //   responsiveClass: true,
  //   autoplay: true,
  //   autoplayTimeout: 3000,
  //   loop: true,
  //   nav: true,
  //   dots: false,
  //   responsive: {
  //     0: {
  //       items: 1,
  //     },
  //     425: {
  //       items: 2,
  //     },
  //     475: {
  //       items: 2,
  //     },
  //     768: {
  //       items: 3,
  //     },
  //     1024: {
  //       items: 4,
  //     },
  //     1440: {
  //       items: 5,
  //     },
  //   },
  // };

  return (
    <>
      <LandingPageCarousel />
      <VideoText />
      <Features />
      <FeaturedRooms data={featuredRoomsData} />
      <Testimonials />
    </>
  );
};

export default Home;
