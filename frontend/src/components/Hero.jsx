import "./hero.css";

const Hero = (params) => {
  let backgroundImg = ``;
  if (params.backendUrl === undefined) {
    backgroundImg = `url(${params.img})`;
  } else {
    backgroundImg = `url(${params.backendUrl}${params.img})`;
  }
  let sectionStyle = {
    backgroundImage: backgroundImg,
    backgroundPosition: params.orient,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  return (
    <div className="hero-wrap" style={sectionStyle}>
      <div className="nav-hero"></div>
      <div className="overlay"></div>
      <div className="container">
        <div className="row no-gutters slider-text d-flex align-itemd-end justify-content-center">
          <div className="col-md-9 text-center d-flex align-items-end justify-content-center">
            <div className="text">
              <h1 className="bread">{params.section}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
