import restaurantIntroImg from "../statics/gallery-img-04.jpg";

const RestaurantIntro = () => {
  return (
    <div className="container restaurant-intro-container">
      <div className="row">
        <div className="col-md-6">
          <img
            src={restaurantIntroImg}
            alt=""
            className="img-fluid flip-image"
          />
        </div>
        <div className="col-md-6 my-auto the-text">
          <h1>We are Food Lovers</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            tempora magnam ab alias eius deserunt recusandae vel perferendis
            consectetur nisi ea repellendus, voluptas dolorem, quasi dignissimos
            doloribus! Delectus, impedit veritatis.
          </p>
          <div className="icons">
            <i className="fab fa-pinterest"></i>
            <i className="fab fa-instagram"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantIntro;
