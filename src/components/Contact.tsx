import { MdArrowOutward, MdCopyright } from "react-icons/md";
import { FaPhone, FaEnvelope } from "react-icons/fa6";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>
              <FaEnvelope style={{ marginRight: "8px", verticalAlign: "middle" }} />
              Email
            </h4>
            <p>
              <a href="mailto:harshpratap122436@gmail.com" data-cursor="disable">
                harshpratap122436@gmail.com
              </a>
            </p>
            <h4>
              <FaPhone style={{ marginRight: "8px", verticalAlign: "middle" }} />
              Phone
            </h4>
            <p>
              <a href="tel:+918178604608" data-cursor="disable" style={{ fontWeight: 500, letterSpacing: "0.5px" }}>
                +91 8178604608
              </a>
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/harshpratap3205"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href="https://linkedin.com/in/harsh4536"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
            <a
              href="https://github.com/harshpratap3205"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Portfolio <MdArrowOutward />
            </a>
            <a
              href="mailto:harshpratap122436@gmail.com"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Direct Mail <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Harsh Pratap Singh</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
