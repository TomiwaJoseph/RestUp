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

  useEffect(() => {
    fetchFeaturedApartments();
  }, []);

  useEffect(() => {
    const getBody = document.body;
    if (noInternet) {
      getBody.classList.add("dark-nav");
    } else {
      getBody.classList.remove("dark-nav");
    }
    return () => {
      getBody.classList.remove("dark-nav");
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
