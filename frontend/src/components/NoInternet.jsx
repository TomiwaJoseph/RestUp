import errorImg from "../statics/no-connection-illustration-concept-vector.jpg";

const NoInternet = () => {
  return (
    <div className="error-div">
      <div className="error-image-wrapper">
        <img src={errorImg} alt="server-error" className="img-fluid" />
      </div>
      <h1>An error occurred...</h1>
      <p>Check your internet connection and try again.</p>
      <button onClick={() => window.location.reload()} className="refresh-btn">
        Refresh Page
      </button>
    </div>
  );
};

export default NoInternet;
