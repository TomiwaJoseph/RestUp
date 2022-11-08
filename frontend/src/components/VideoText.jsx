import videoUrl from "../statics/pexels-your-whiteboard-5305327.mp4";

const VideoText = () => {
  return (
    <div className="container video-text-container">
      <div className="row">
        <div className="col-md-7">
          <video controls className="img-fluid">
            <source src={videoUrl} type="video/mp4"></source>
          </video>
        </div>
        <div className="col-md-5 my-auto the-text">
          <h1>Welcome to our Hotel</h1>
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
  );
};

export default VideoText;
