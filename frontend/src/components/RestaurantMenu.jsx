import "./restaurantmenu.css";
import RestaurantFilter from "./RestaurantFilter";

const RestaurantMenu = () => {
  return (
    <>
      <div>
        <div className="row justify-content-center mb-5 pb-3">
          <div className="heading-section our-menu-header">
            <h2 className="mb-4">Our Menu</h2>
          </div>
        </div>
      </div>
      <RestaurantFilter />
    </>
  );
};

export default RestaurantMenu;
