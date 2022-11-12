import "./featuredrooms.css";
import HeaderSection from "./HeaderSection";
import RoomCards from "./RoomCards";

const FeaturedRooms = () => {
  return (
    <>
      <HeaderSection title={"Featured Rooms"} />
      <RoomCards data={[..."abc"]} />
    </>
  );
};

export default FeaturedRooms;
