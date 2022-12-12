import { useState, useEffect } from "react";
import "./apartmentspluspagination.css";
import { NavLink } from "react-router-dom";
import featured1 from "../statics/room-1.jpg";

const ApartmentsPlusPagination = ({ data, backendUrl }) => {
  const dataToRender = data;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const pageNumberLimit = 3;
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(dataToRender.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataToRender.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          id={number}
          key={number}
          onClick={handleClick}
          className={currentPage === number ? "numbers active" : "numbers"}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [currentPage]);

  return (
    <>
      <div className="container">
        <div className="row room-card">
          {currentItems.map((apartment, index) => (
            <div key={index} className="col-lg-4 mb-4">
              <div className="card">
                <img
                  src={`${backendUrl}${apartment.main_image}`}
                  alt={apartment.slug}
                  className="img-fluid"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{apartment.name}</h5>
                </div>
                <div className="card-footer text-center">
                  <NavLink
                    to={`/apartments/apartment-detail/${apartment.slug}`}
                  >
                    <button className="btn">
                      Check Rooms <span className="fa fa-arrow-right"></span>
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
        <hr />
        {pages.length > 1 ? (
          <div className="pageNumbers">
            <div className="btn__cover__prev">
              <button
                onClick={handlePrevBtn}
                disabled={currentPage === pages[0] ? true : false}
              >
                Prev
              </button>
            </div>
            <div className="numbers">
              <ul>{renderPageNumbers}</ul>
            </div>
            <div className="btn__cover__next">
              <button
                onClick={handleNextBtn}
                disabled={
                  currentPage === pages[pages.length - 1] ? true : false
                }
              >
                Next
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ApartmentsPlusPagination;
