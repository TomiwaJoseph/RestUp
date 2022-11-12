import "./headersection.css";

const HeaderSection = ({ title }) => {
  return (
    <>
      <div className="container">
        <div className="row justify-content-center mb-2">
          <div className="heading-section header">
            <h2 className="mb-4">{title}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderSection;
