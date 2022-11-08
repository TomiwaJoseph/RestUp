import "./hero.css";

const Hero = (params) => {
  let sectionStyle = {
    backgroundImage: `url(${params.img})`,
    backgroundPosition: params.orient,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  return (
    <div className="hero-wrap" style={sectionStyle}>
      <div className="overlay"></div>
      <div className="container">
        <div className="row no-gutters slider-text d-flex align-itemd-end justify-content-center">
          <div className="col-md-9 ftco-animate text-center d-flex align-items-end justify-content-center">
            <div className="text">
              <h1 className="mb-4 bread">{params.section}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
