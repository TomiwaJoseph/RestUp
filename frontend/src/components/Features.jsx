import "./features.css";

const Features = () => {
  return (
    <div className="container features-container">
      <hr />
      <div className="row features-row">
        <div className="col-sm-6 col-md-4 col-lg-4 icon-container text-center">
          <div className="icon">
            <i className="fas fa-utensils"></i>
            <p>Restaurant</p>
          </div>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-4 icon-container text-center">
          <div className="icon">
            <i className="fas fa-wine-glass"></i>
            <p>Bar</p>
          </div>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-4 icon-container text-center">
          <div className="icon">
            <i className="fas fa-car"></i>
            <p>Pick-Up</p>
          </div>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-4 icon-container text-center">
          <div className="icon">
            <i className="fas fa-swimmer"></i>
            <p>Pool</p>
          </div>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-4 icon-container text-center">
          <div className="icon">
            <i className="fas fa-spa"></i>
            <p>Spa</p>
          </div>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-4 icon-container text-center">
          <div className="icon">
            <i className="fas fa-dumbbell"></i>
            <p>Gym</p>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Features;
