import Hero from "../components/Hero";
import { hero } from "../data";
// import "./page-styles.css";
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
// import Preloader from "../components/Preloader";
// import { useSelector } from "react-redux";
// import { fetchTestPage } from "../redux/actions/fetchers";

const Contact = () => {
  const formRef = useRef();
  const modalRef = useRef();
  const containerRef = useRef();
  // const storeContext = useSelector((state) => state.store);
  // const { fetchingData } = storeContext;
  const [openModal, setOpenModal] = useState(false);
  const [sendButtonClicked, setSendButtonClicked] = useState(false);

  // useEffect(() => {
  //   fetchTestPage();
  // }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (openModal) {
      // console.log("modal is open");
      document.body.style["overflow-y"] = "hidden";
    } else {
      // console.log("modal is now closed");
      document.body.style["overflow-y"] = "auto";
    }
  }, [openModal]);

  const closeModal = (e) => {
    if (modalRef.current === e.target || containerRef.current === e.target) {
      setOpenModal(false);
    }
  };

  const validateInput = (name, email, message) => {
    if (name.length === 0) {
      return false;
    }
    if (message.length < 10) return false;
    if (
      !/^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9/-]+\.)+[A-Za-z]{2,4}$/i.test(email)
    ) {
      return false;
    }
    return true;
  };

  const sendEmail = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    let name = data.get("name");
    let email = data.get("email");
    let message = data.get("message");
    let validate = validateInput(name, email, message);
    if (validate) {
      setSendButtonClicked(true);
      emailjs
        .sendForm(
          "service_zmd8dcn",
          "template_gv6q2f6",
          formRef.current,
          "hun951qpYgepyST8-"
        )
        .then(
          (result) => {
            if (result.status === 200) {
              let icon = document.getElementById("modalIcon");
              icon.classList.remove("fa-times-circle");
              icon.classList.add("fa-check-circle");
              let modalHTwo = document.getElementById("modalHTwo");
              let modalP = document.getElementById("modalP");
              modalHTwo.innerHTML = "Message sent!";
              modalP.innerHTML =
                "You will receive a response pretty soon. Thank you.";
              setOpenModal(true);
              setSendButtonClicked(false);
              e.target.reset();
            }
          },
          (error) => {
            let icon = document.getElementById("modalIcon");
            icon.classList.remove("fa-check-circle");
            icon.classList.add("fa-times-circle");
            let modalHTwo = document.getElementById("modalHTwo");
            let modalP = document.getElementById("modalP");
            modalHTwo.innerHTML = "Message not sent!";
            modalP.innerHTML =
              "Please check your internet connection and try again.";
            setSendButtonClicked(false);
            setOpenModal(true);
          }
        );
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // if (fetchingData) {
  //   return <Preloader />;
  // }

  return (
    <>
      <Hero section={"Contact Us"} orient={"top"} img={hero.contact} />
      <div className="container">
        <div
          onClick={closeModal}
          ref={containerRef}
          className={openModal ? "contactModal" : "contactModal hidden"}
        >
          <div ref={modalRef} className="modalContainer">
            <div className="modalBody">
              <i id="modalIcon" className="fa"></i>
              <h2 id="modalHTwo">Status</h2>
              <p id="modalP">Message</p>
              <button
                type="button"
                onClick={() => setOpenModal((prev) => !prev)}
                className="btn"
              >
                close
              </button>
            </div>
          </div>
        </div>
        <div className="row contact__info">
          <div className="ml-auto col-md-3 text-center">
            <div className="phone-div">
              <h5>Phone</h5>
              <p>+123 456 789</p>
            </div>
          </div>
          <div className="col-md-3 text-center">
            <div className="email-div">
              <h5>Email</h5>
              <p>restupemail@ymail.com</p>
            </div>
          </div>
          <div className="mr-auto col-md-3 text-center">
            <div className="website-div">
              <h5>Website</h5>
              <p>tomiwajoseph.vercel.app</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mx-auto">
            <form ref={formRef} onSubmit={sendEmail} className="contact-form">
              <div className="row">
                <div className="col-12">
                  <input
                    type="text"
                    name="name"
                    required
                    className="form-control"
                    placeholder="Your Name"
                  />
                </div>
                <div className="col-12">
                  <input
                    type="text"
                    name="email"
                    required
                    className="form-control"
                    placeholder="Your Email"
                  />
                </div>
                <div className="col-12">
                  <textarea
                    className="form-control"
                    name="message"
                    id="message"
                    rows="7"
                    required
                    placeholder="Your message to the developer."
                  ></textarea>
                </div>
                <div className="col-12">
                  <button
                    disabled={sendButtonClicked}
                    type="submit"
                    className="btn"
                  >
                    {sendButtonClicked ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <hr className="mt-5" />
      </div>
    </>
  );
};

export default Contact;
