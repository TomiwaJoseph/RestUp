import "./preloader.css";
import preloaderImg from "../statics/04de2e31234507.564a1d23645bf.gif";

const Preloader = () => {
  return (
    <div className="preloader">
      <img src={preloaderImg} alt="preloader" className="loader img-fluid" />
    </div>
  );
};

export default Preloader;
