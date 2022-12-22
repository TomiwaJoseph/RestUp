import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import { fetchDashboardInfo, logOutUser } from "../redux/actions/fetchers";
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

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/login", { state: { previousPath: pathname } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDashboardInfo();
  }, []);

  if (fetchingData) {
    return <Preloader />;
  }

  if (noInternet) {
    return <NoInternet />;
  }

  return (
    <>
      <Hero
        section={"Dashboard"}
        orient="center"
        img={random_dashboard_image}
        backendUrl={backendUrl}
      />
      <div className="dashboard-container">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
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
            <div className="col-md-7">
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
                  <div className="booking-info-container">
                    {booked_room_info.length ? (
                      <>
                        <h3>Booked Room info goes here</h3>
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
  );
};

export default Dashboard;
