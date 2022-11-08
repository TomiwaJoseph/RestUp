import "./features.css";

const Features = () => {
  return (
    <div className="container features-container">
      <hr />
      <div className="row features-row">
        <div className="col-md-2 icon-container text-center">
          <div className="icon">
            <i className="flaticon-restaurant"></i>
            <p>Restaurant</p>
          </div>
        </div>
        <div className="col-md-2 icon-container text-center">
          <div className="icon">
            <i className="flaticon-cup"></i>
            <p>Bar</p>
          </div>
        </div>
        <div className="col-md-2 icon-container text-center">
          <div className="icon">
            <i className="flaticon-car"></i>
            <p>Pick-Up</p>
          </div>
        </div>
        <div className="col-md-2 icon-container text-center">
          <div className="icon">
            <i className="flaticon-swimming"></i>
            <p>Pool</p>
          </div>
        </div>
        <div className="col-md-2 icon-container text-center">
          <div className="icon">
            <i className="flaticon-massage"></i>
            <p>Spa</p>
          </div>
        </div>
        <div className="col-md-2 icon-container text-center">
          <div className="icon">
            <i className="flaticon-bicycle"></i>
            <p>Gym</p>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Features;
