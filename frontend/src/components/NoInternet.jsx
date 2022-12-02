import errorImg from "../statics/404 Error Page not Found with people connecting a plug-bro.png";

const NoInternet = () => {
  return (
    <div className="error__div">
      <div className="error_image_wrapper">
        <img src={errorImg} alt="server-error" className="img-fluid" />
      </div>
      <h1>An error occurred...</h1>
      <p>Check your internet connection and try again.</p>
      <button onClick={() => window.location.reload()} className="refresh__btn">
        Refresh Page
      </button>
    </div>
  );
};

export default NoInternet;
