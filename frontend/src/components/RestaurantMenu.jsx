import RestaurantFilter from "./RestaurantFilter";
import HeaderSection from "./HeaderSection";

const RestaurantMenu = () => {
  return (
    <>
      <HeaderSection title={"Our Menu"} />
      <RestaurantFilter />
    </>
  );
};

export default RestaurantMenu;
