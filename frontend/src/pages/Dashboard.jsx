import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import { cancelBooking, fetchDashboardInfo, logOutUser } from "../redux/actions/fetchers";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import NoInternet from "../components/NoInternet";
import Preloader from "../components/Preloader";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const storeContext = useSelector((state) => state.store);
  const {
    fetchingData,
    noInternet,
    isAuthenticated,
    dashboard_info,
    userInfo,
    backendUrl,
  } = storeContext;
  const { first_name, last_name, email } = userInfo;
  const { booked_room_info, random_dashboard_image } = dashboard_info;
  const [currentSection, setCurrentSection] = useState(0);
  const [singleBooking, setSingleBooking] = useState({});

  useEffect(() => {
    if (!isAuthenticated) {
      <Preloader />;
      return navigate("/login", { state: { previousPath: pathname } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDashboardInfo();
  }, []);

  useEffect(() => {
    const getBody = document.body;
    if (noInternet) {
      getBody.classList.add("dark-nav");
    } else {
      getBody.classList.remove("dark-nav");
    }
    return () => {
      getBody.classList.remove("dark-nav");
    };
  }, [noInternet]);

  const handleBookingClick = (code) => {
    let allBookingDiv = document.getElementsByClassName("all-bookings")[0];
    let detailsDiv = document.getElementsByClassName("booking-details")[0];
    allBookingDiv.classList.add("hide");
    detailsDiv.classList.remove("hide");
    for (let index = 0; index < booked_room_info.length; index++) {
      const element = booked_room_info[index];
      if (booked_room_info[index].ref_code === code) {
        setSingleBooking(element);
      }
    }
  };
  const handleBackButton = () => {
    let allBookingDiv = document.getElementsByClassName("all-bookings")[0];
    let detailsDiv = document.getElementsByClassName("booking-details")[0];
    detailsDiv.classList.add("hide");
    setCurrentSection(1);
    allBookingDiv.classList.remove("hide");
  };

  if (fetchingData) {
    return <Preloader />;
  }

  if (noInternet) {
    return <NoInternet />;
  }

  return (
    <>
      {!isAuthenticated ? (
        <Preloader />
      ) : (
        <>
          <Hero
            section={"Dashboard"}
            orient="center"
            img={random_dashboard_image}
            backendUrl={backendUrl}
          />
          <div className="dashboard-container">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-4">
                  <div className="list-group">
                    <button
                      onClick={() => setCurrentSection(0)}
                      className={`list-group-item btn ${
                        currentSection === 0 ? "active" : null
                      }`}
                    >
                      My Info
                    </button>
                    <button
                      onClick={() => setCurrentSection(1)}
                      className={`list-group-item btn ${
                        currentSection === 1 ? "active" : null
                      }`}
                    >
                      My Bookings
                    </button>
                    <button onClick={() => logOutUser()} className="logout-btn">
                      Logout
                    </button>
                  </div>
                </div>
                <div className="col-md-5">
                  {currentSection === 0 && (
                    <div className="user-info-container">
                      <div className="user-information">
                        <p>
                          First Name:
                          <span className="text-muted"> {first_name}</span>
                        </p>
                        <p>
                          Last Name:
                          <span className="text-muted"> {last_name}</span>
                        </p>
                        <p>
                          Email:
                          <span className="text-muted"> {email}</span>
                        </p>
                      </div>
                    </div>
                  )}
                  {currentSection === 1 && (
                    <>
                      <div
                        id="booking-info-container"
                        className="booking-info-container"
                      >
                        {booked_room_info.length ? (
                          <>
                            <div className="all-bookings">
                              <h3>Bookings</h3>
                              <div className="booking-div">
                                {booked_room_info.map((booking) => (
                                  <button
                                    onClick={() =>
                                      handleBookingClick(`${booking.ref_code}`)
                                    }
                                    className={`btn ${
                                      booking.spent ? "spent" : null
                                    }`}
                                    key={booking.ref_code}
                                  >
                                    {booking.ref_code}
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div className="booking-details hide">
                              <i
                              id='back-arrow'
                                onClick={handleBackButton}
                                className="fa fa-arrow-left"
                              ></i>

                              <div className="booking-information">
                                <p>
                                  Apartment:
                                  <span className="text-muted">
                                    {" "}
                                    {singleBooking.room_apartment}
                                  </span>
                                </p>
                                <p>
                                  Room Name:
                                  <span className="text-muted">
                                    {" "}
                                    {singleBooking.room_name}
                                  </span>
                                </p>
                                <p>
                                  Start Date:
                                  <span className="text-muted">
                                    {" "}
                                    {singleBooking.start_date}
                                  </span>
                                </p>
                                <p>
                                  End Date:
                                  <span className="text-muted">
                                    {" "}
                                    {singleBooking.end_date}
                                  </span>
                                </p>
                                {singleBooking.show_cancel ? (
                                  <button onClick={()=> cancelBooking(singleBooking.ref_code)} className="btn">
                                    Cancel booking
                                  </button>
                                ) : null}
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="no-booked-room">
                            <h3>You have no booked room yet.</h3>
                            <NavLink className="btn" to={"/apartments"}>
                              Book one now!
                            </NavLink>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
