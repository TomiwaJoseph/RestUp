import RoomsPlusPagination from "../components/RoomsPlusPagination";
import Hero from "../components/Hero";
import { hero } from "../data";
import { useSelector } from "react-redux";
import Preloader from "../components/Preloader";
import { useState } from "react";

const Rooms = () => {
  const [doneLoading, setDoneLoading] = useState(false);
  const storeContext = useSelector((state) => state.store);
  const { backendUrl, allRoomsData, currentFilterData } = storeContext;
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
        <RoomsPlusPagination data={allRoomsData} backendUrl={backendUrl} />
      );
    }
  };

  // Helps with not showing no dress match your parameters because
  // of empty list before api promise is fulfilled
  // useEffect(() => {
  //   if (currentFilterData.length !== 0) {
  //     setDoneLoading(true);
  //   }
  // }, [currentFilterData.length]);

  return (
    <>
      <Hero section={"Rooms"} orient={"left"} img={hero.room} />
      {/* <RoomsPlusPagination data={allRoomsData} backendUrl={backendUrl} /> */}
      {renderRooms()}
    </>
  );
};

export default Rooms;
