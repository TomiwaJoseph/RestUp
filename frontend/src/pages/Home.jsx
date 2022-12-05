import FeaturedApartments from "../components/FeaturedApartments";
import Features from "../components/Features";
import LandingPageCarousel from "../components/LandingPageCarousel";
import Testimonials from "../components/Testimonials";
import VideoText from "../components/VideoText";
import { useSelector } from "react-redux";
import NoInternet from "../components/NoInternet";
import Preloader from "../components/Preloader";
import { useEffect } from "react";
import { fetchFeaturedApartments } from "../redux/actions/fetchers";

const Home = () => {
  const storeContext = useSelector((state) => state.store);
  const { backendUrl, fetchingData, noInternet, featuredApartmentData } =
    storeContext;
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

  useEffect(() => {
    fetchFeaturedApartments();
  }, []);

  useEffect(() => {
    const getBody = document.body;
    if (noInternet) {
      getBody.classList.add("no-internet");
    } else {
      getBody.classList.remove("no-internet");
    }
    return () => {
      getBody.classList.remove("no-internet");
    };
  }, [noInternet]);

  if (fetchingData) {
    return <Preloader />;
  }

  if (noInternet) {
    return <NoInternet />;
  }

  return (
    <>
      <LandingPageCarousel />
      <VideoText />
      <Features />
      <FeaturedApartments
        data={featuredApartmentData}
        backendUrl={backendUrl}
      />
      <Testimonials />
    </>
  );
};

export default Home;
