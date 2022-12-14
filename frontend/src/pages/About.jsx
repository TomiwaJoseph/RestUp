import Hero from "../components/Hero";
import { hotelBranches, hero } from "../data";
import Features from "../components/Features";
import HeaderSection from "../components/HeaderSection";
import aboutImg from "../statics/pexels-donald-tong-189296.jpg";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Hero section={"About Us"} orient={"center"} img={hero.about} />
      <div className="container picture-text-container">
        <div className="row">
          <div className="col-md-6">
            <img src={aboutImg} alt="about-visual" className="img-fluid" />
          </div>
          <div className="col-md-6 my-auto the-text">
            <h1>Be Rest Assured!</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
              error soluta odit, explicabo vero fugit tempore! Iusto facere
              nesciunt veritatis. Fugiat ipsam consequatur eius. Sit?
            </p>
            <div className="icons">
              <i className="fab fa-pinterest"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-facebook"></i>
            </div>
          </div>
        </div>
      </div>
      <Features />
      <HeaderSection title={"Our Branches"} />
      <div className="container">
        <div className="row">
          {hotelBranches.map((branch) => (
            <div key={branch.id} className="col-md-4 mb-4 text-center branch">
              <div className="branch-img-container">
                <img src={branch.image} alt="hotel1" className="img-fluid" />
              </div>
              <p>{branch.name}</p>
            </div>
          ))}
        </div>
      </div>
      <hr />
    </>
  );
};

export default About;
