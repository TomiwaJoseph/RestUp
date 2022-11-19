// import "./page-styles.css";

const Search = () => {
  const handleStarsClick = (star) => {
    let allStars = document.getElementsByClassName("fa-star");

    for (var i = 0; i < allStars.length; i++) {
      // console.log(allStars[i]);
      allStars[i].classList.remove("starred");
    }
    for (var j = 0; j < star; j++) {
      // console.log(allStars[j]);
      allStars[j].classList.add("starred");
    }
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted...");
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="sidebar-wrapper">
              <h4>Search Rooms</h4>
              <form onSubmit={handleSearchSubmit}>
                <div className="form-group">
                  <div className="select-wrap one-third">
                    <select
                      name="room-type"
                      id="room-type"
                      className="form-control"
                    >
                      <option value="">Room Type</option>
                      <option value="">Suite</option>
                      <option value="">Family Room</option>
                      <option value="">Deluxe Room</option>
                      <option value="">Classic Room</option>
                      <option value="">Superior Room</option>
                      <option value="">Luxury Room</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <div className="select-wrap one-third">
                    <select name="" id="" className="form-control">
                      <option value="">Adult Count</option>
                      <option value="">1 Adult</option>
                      <option value="">2 Adult</option>
                      <option value="">3 Adult</option>
                      <option value="">4 Adult</option>
                      <option value="">5 Adult</option>
                      <option value="">6 Adult</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <div className="select-wrap one-third">
                    <select name="" id="" className="form-control">
                      <option value="">Children Count</option>
                      <option value="">0 Children</option>
                      <option value="">1 Children</option>
                      <option value="">2 Children</option>
                      <option value="">3 Children</option>
                      <option value="">4 Children</option>
                      <option value="">5 Children</option>
                      <option value="">6 Children</option>
                    </select>
                  </div>
                </div>
                <div className="stars-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i
                      key={star}
                      onClick={() => handleStarsClick(star)}
                      className="fa fa-star starred"
                    ></i>
                  ))}
                </div>
                <button type="submit" className="btn search-btn">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
