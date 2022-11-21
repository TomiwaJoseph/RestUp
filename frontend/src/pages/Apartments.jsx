import ApartmentsPlusPagination from "../components/ApartmentsPlusPagination";
import Hero from "../components/Hero";
import { hero } from "../data";
import { useSelector } from "react-redux";
import Preloader from "../components/Preloader";
import MultiRangeSlider from "../components/MultiRangeSlider";
// import MultiRangeSliderTwo from "../components/MultiRangeSlider";
import { useState, useRef, useEffect } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";

const Rooms = () => {
  const calendarRef = useRef();
  const priceRef = useRef();
  const capacityRef = useRef();
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openSlider, setOpenSlider] = useState(false);
  const [openCapacity, setOpenCapacity] = useState(false);
  const [doneLoading, setDoneLoading] = useState(false);
  const [priceMinValue, setPriceMinValue] = useState(1);
  const [priceMaxValue, setPriceMaxValue] = useState(0);
  const [capacityMinValue, setCapacityMinValue] = useState(1);
  const [capacityMaxValue, setCapacityMaxValue] = useState(0);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const storeContext = useSelector((state) => state.store);
  const {
    backendUrl,
    allApartmentsData,
    currentFilterData,
    highestRoomPrice,
    highestCapacity,
  } = storeContext;
  const renderRooms = () => {
    if (currentFilterData.length === 0 && !doneLoading) {
      return <Preloader />;
    } else if (currentFilterData.length === 0 && doneLoading) {
      return (
        <div className="col-12 text-center">
          <p className="no-room">No room match your filter parameters</p>
        </div>
      );
    } else {
      return (
        <ApartmentsPlusPagination
          data={allApartmentsData}
          backendUrl={backendUrl}
        />
      );
    }
  };
  const handlePriceChange = (min, max) => {
    setPriceMinValue(min);
    setPriceMaxValue(max);
  };
  const handleCapacityChange = (min, max) => {
    setCapacityMinValue(min);
    setCapacityMaxValue(max);
  };

  const handleSearchFormSubmit = (e) => {
    e.preventDefault();
    let startDate = date[0].startDate;
    let endDate = date[0].endDate;
    console.log(`start date is ${startDate} and the end date is ${endDate}`);
    console.log(`price range is between ${priceMinValue} and ${priceMaxValue}`);
    console.log(
      `capacity is between ${capacityMinValue} and ${capacityMaxValue} persons`
    );
  };
  const handleOutsideClick = (e) => {
    if (calendarRef.current.contains(e.target)) {
      setOpenSlider(false);
      setOpenCapacity(false);
    } else if (priceRef.current.contains(e.target)) {
      setOpenCalendar(false);
      setOpenCapacity(false);
    } else if (capacityRef.current.contains(e.target)) {
      setOpenSlider(false);
      setOpenCalendar(false);
    } else {
      setOpenCalendar(false);
      setOpenSlider(false);
      setOpenCapacity(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, false);
    return () =>
      void document.removeEventListener("click", handleOutsideClick, false);
  }, []);

  // Helps with not showing no room match your parameters because
  // of empty list before api promise is fulfilled
  // useEffect(() => {
  //   if (currentFilterData.length !== 0) {
  //     setDoneLoading(true);
  //   }
  // }, [currentFilterData.length]);

  return (
    <>
      <Hero section={"Apartments"} orient={"left"} img={hero.room} />
      <div className="container" onClick={handleOutsideClick}>
        <div className="row">
          <div className="col-md-12">
            <div className="search-box">
              <form onSubmit={handleSearchFormSubmit}>
                <div className="row">
                  <div className="my-auto col-4">
                    <div ref={calendarRef} className="search-item">
                      <i className="fa fa-calendar-alt"></i>
                      <span
                        // ref={calendarRef}
                        onClick={() => setOpenCalendar(!openCalendar)}
                        // className={openCalendar ? "search-item-date hide-date" : null}
                      >{`${format(date[0].startDate, "dd/MM/yyy")} to ${format(
                        date[0].endDate,
                        "dd/MM/yyy"
                      )}`}</span>
                      {openCalendar && (
                        <DateRange
                          editableDateInputs={false}
                          onChange={(item) => setDate([item.selection])}
                          moveRangeOnFirstSelection={false}
                          ranges={date}
                          className="the-date-range"
                        />
                      )}
                    </div>
                  </div>
                  <div className="my-auto col-3">
                    <div ref={priceRef} className="search-item">
                      <i className="fa fa-lock"></i>
                      <span
                        onClick={() => setOpenSlider(!openSlider)}
                        className="search-item-slider"
                      >
                        price of ${priceMinValue} to ${priceMaxValue}
                      </span>
                      {openSlider && (
                        <div className="slider-div">
                          <MultiRangeSlider
                            min={1}
                            max={highestRoomPrice}
                            onChange={({ min, max }) =>
                              handlePriceChange(min, max)
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="my-auto col-3">
                    <div ref={capacityRef} className="search-item">
                      <i className="fa fa-user"></i>
                      <span
                        onClick={() => setOpenCapacity(!openCapacity)}
                        className="search-item-capacity"
                      >
                        {capacityMinValue} to {capacityMaxValue} persons
                      </span>
                      {openCapacity && (
                        <div className="slider-div">
                          <MultiRangeSlider
                            min={1}
                            max={highestCapacity}
                            onChange={({ min, max }) =>
                              handleCapacityChange(min, max)
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-2">
                    <button type="submit" className="room-search-btn">
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <ApartmentsPlusPagination data={allApartmentsData} backendUrl={backendUrl} /> */}
      {renderRooms()}
    </>
  );
};

export default Rooms;