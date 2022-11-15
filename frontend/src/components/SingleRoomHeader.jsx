import roomImg3 from "../statics/room-4.jpg";

const SingleRoomHeader = () => {
  return (
    <div className="room__header">
      <div className="img-container">
        <img src={roomImg3} className="img-fluid" alt="heroku-promises" />
      </div>
      <div className="nav-hero"></div>
      <div className="name__hero">
        <h1>Single Economy</h1>
        <hr className="accent" />
      </div>
    </div>
  );
};

export default SingleRoomHeader;
