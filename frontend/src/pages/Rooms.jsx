import AllRooms from "../components/AllRooms";
import Hero from "../components/Hero";
import { hero } from "../data";

const Rooms = () => {
  return (
    <>
      <Hero section={"Rooms"} orient={"right"} img={hero.room} />
      <AllRooms />
    </>
  );
};

export default Rooms;
