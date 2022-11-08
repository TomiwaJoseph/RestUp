import { useState, useEffect } from "react";
import "./restaurantfilter.css";
import { menuData } from "../data";

const RestaurantFilter = () => {
  const [activeBtn, setActiveBtn] = useState("All");
  const [selectMenu, setSelectMenu] = useState([]);

  useEffect(() => {
    // Filter data based on button selected
    if (activeBtn !== "All") {
      const filtered = menuData.filter((menu) => menu.category === activeBtn);
      setSelectMenu(filtered);
    } else {
      setSelectMenu(menuData);
    }
  }, [activeBtn]);

  return (
    <>
      <div className="container text-center">
        <div className="categories__btn">
          <button
            onClick={() => setActiveBtn("All")}
            className={activeBtn === "All" ? "active" : ""}
            type="button"
          >
            All
          </button>
          <button
            onClick={() => setActiveBtn("Drinks")}
            className={activeBtn === "Drinks" ? "active" : ""}
            type="button"
          >
            Drinks
          </button>
          <button
            onClick={() => setActiveBtn("Lunch")}
            className={activeBtn === "Lunch" ? "active" : ""}
            type="button"
          >
            Lunch
          </button>
          <button
            onClick={() => setActiveBtn("Dinner")}
            className={activeBtn === "Dinner" ? "active" : ""}
            type="button"
          >
            Dinner
          </button>
        </div>
      </div>
      <div className="container filter-data-container">
        <div className="row">
          {selectMenu.map((menu) => {
            return (
              <div key={menu.id} className="col-lg-3 col-md-4">
                <div className="gallery-single fix">
                  <img
                    src={menu.image}
                    className="img-fluid"
                    alt={menu.title}
                  />
                  <div className="menu-text">
                    <div className="test">
                      <h4>{menu.title}</h4>
                      <h5>${menu.price}</h5>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RestaurantFilter;
