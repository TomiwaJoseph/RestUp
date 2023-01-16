// const Rooms = () => {

//   return (
//     <>
//       <Hero
//         section={"Apartments"}
//         orient={"center"}
//         img={randomApartmentImage}
//         backendUrl={backendUrl}
//       />
//       {/* <div className="container" onClick={handleOutsideClick}>
//         <div className="row">
//           <div className="col-md-12">
//             <div className="search-box">
//               <form onSubmit={handleSearchFormSubmit}>
//                 <div className="row">
//                   <div className="my-auto col-4 room-size-range">
//                     <div ref={sizeRef} className="search-item">
//                       <i className="fa fa-ruler-combined"></i>
//                       <span
//                         onClick={() => setOpenSize(!openSize)}
//                         className="search-item-slider"
//                       >
//                         room size of ${sizeMinValue}m<sup>2</sup> to $
//                         {sizeMaxValue}m<sup>2</sup>
//                       </span>
//                       {openSize && (
//                         <div className="slider-div">
//                           <MultiRangeSlider
//                             min={highestRoomPriceSizeAndCapacity["min_size"]}
//                             max={highestRoomPriceSizeAndCapacity["max_size"]}
//                             onChange={({ min, max }) =>
//                               handleSizeChange(min, max)
//                             }
//                           />
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <div className="my-auto col-3 price-range">
//                     <div ref={priceRef} className="search-item">
//                       <i className="fas fa-coins"></i>
//                       <span
//                         onClick={() => setOpenPrice(!openPrice)}
//                         className="search-item-slider"
//                       >
//                         price of ${priceMinValue} to ${priceMaxValue}
//                       </span>
//                       {openPrice && (
//                         <div className="slider-div">
//                           <MultiRangeSlider
//                             min={1}
//                             max={
//                               highestRoomPriceSizeAndCapacity["highest_price"]
//                             }
//                             onChange={({ min, max }) =>
//                               handlePriceChange(min, max)
//                             }
//                           />
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <div className="my-auto col-3 persons-range">
//                     <div ref={capacityRef} className="search-item">
//                       <i className="fa fa-user"></i>
//                       <span
//                         onClick={() => setOpenCapacity(!openCapacity)}
//                         className="search-item-capacity"
//                       >
//                         {capacityMinValue} to {capacityMaxValue} persons
//                       </span>
//                       {openCapacity && (
//                         <div className="slider-div">
//                           <MultiRangeSlider
//                             min={1}
//                             max={
//                               highestRoomPriceSizeAndCapacity[
//                                 "highest_capacity"
//                               ]
//                             }
//                             onChange={({ min, max }) =>
//                               handleCapacityChange(min, max)
//                             }
//                           />
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <div className="col-2 apartment-search-btn">
//                     <button type="submit" className="room-search-btn">
//                       Search
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//       {renderRooms()} */}
//     </>
//   );
// };

// export default Rooms;

import ApartmentsPlusPagination from "../components/ApartmentsPlusPagination";
import Hero from "../components/Hero";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "../components/Preloader";
import MultiRangeSlider from "../components/MultiRangeSlider";
import { useState, useRef, useEffect } from "react";
import {
  fetchAllApartments,
  fetchFilteredApartments,
  fetchHighestPriceSizeAndCapacity,
} from "../redux/actions/fetchers";
import NoInternet from "../components/NoInternet";
import { removeRandomImage } from "../redux/actions/roomActions";

const Apartments = () => {
  const sizeRef = useRef();
  const priceRef = useRef();
  const capacityRef = useRef();
  const dispatch = useDispatch();
  const [openSize, setOpenSize] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);
  const [openCapacity, setOpenCapacity] = useState(false);
  const [doneLoading, setDoneLoading] = useState(false);
  const [sizeMinValue, setSizeMinValue] = useState(0);
  const [sizeMaxValue, setSizeMaxValue] = useState(0);
  const [priceMinValue, setPriceMinValue] = useState(1);
  const [priceMaxValue, setPriceMaxValue] = useState(0);
  const [capacityMinValue, setCapacityMinValue] = useState(1);
  const [capacityMaxValue, setCapacityMaxValue] = useState(0);

  const storeContext = useSelector((state) => state.store);
  const {
    backendUrl,
    currentApartmentData,
    highestRoomPriceSizeAndCapacity,
    fetchingData,
    randomApartmentImage,
    noInternet,
  } = storeContext;

  useEffect(() => {
    fetchHighestPriceSizeAndCapacity();
    fetchAllApartments();
  }, []);

  useEffect(() => {
    const { highest_capacity, highest_price, min_size, max_size } =
      highestRoomPriceSizeAndCapacity;
    setSizeMinValue(min_size);
    setSizeMaxValue(max_size);
    setPriceMaxValue(highest_price);
    setCapacityMaxValue(highest_capacity);
  }, [highestRoomPriceSizeAndCapacity]);

  const renderRooms = () => {
    if (currentApartmentData.length === 0 && !doneLoading) {
      return <Preloader />;
    } else if (currentApartmentData.length === 0 && doneLoading) {
      return (
        <div className="col-12 no-room">
          <p>No room match your filter parameters</p>
        </div>
      );
    } else {
      return (
        <ApartmentsPlusPagination
          data={currentApartmentData}
          backendUrl={backendUrl}
        />
      );
    }
  };
  const handleSizeChange = (min, max) => {
    setSizeMinValue(min);
    setSizeMaxValue(max);
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
    fetchFilteredApartments([
      sizeMinValue,
      sizeMaxValue,
      priceMinValue,
      priceMaxValue,
      capacityMinValue,
      capacityMaxValue,
    ]);
  };
  const handleOutsideClick = (e) => {
    try {
      if (sizeRef.current.contains(e.target)) {
        setOpenPrice(false);
        setOpenCapacity(false);
      } else if (priceRef.current.contains(e.target)) {
        setOpenSize(false);
        setOpenCapacity(false);
      } else if (capacityRef.current.contains(e.target)) {
        setOpenPrice(false);
        setOpenSize(false);
      } else {
        setOpenSize(false);
        setOpenPrice(false);
        setOpenCapacity(false);
      }
    } catch (err) {
      console.log(" ");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, false);
    return () => {
      dispatch(removeRandomImage());
      void document.removeEventListener("click", handleOutsideClick, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helps with not showing no room match your parameters
  // because of empty list before api promise is fulfilled
  useEffect(() => {
    if (currentApartmentData.length !== 0) {
      setDoneLoading(true);
    }
  }, [currentApartmentData.length]);

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

  if (fetchingData) {
    return <Preloader />;
  }

  if (noInternet) {
    return <NoInternet />;
  }

  return (
    <>
      <Hero
        section={"Apartments"}
        orient={"center"}
        img={randomApartmentImage}
        backendUrl={backendUrl}
      />
    </>
  );
};

export default Apartments;
