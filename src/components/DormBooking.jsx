import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import "../styles/DormBooking.css";
import Navbar from "./Navbar";

function DormBooking() {
  const cardRef = useRef(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();

  // Show overlay only once per tab session
  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("overlayShown");

    if (!alreadyShown) {
      setShowOverlay(true);
      sessionStorage.setItem("overlayShown", "true");

      // Hide overlay after 3 seconds
      const timer = setTimeout(() => setShowOverlay(false), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  // 3D tilt effect
  useEffect(() => {
    const card = cardRef.current;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 15;
      const rotateY = (x - centerX) / 15;
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = `rotateX(0deg) rotateY(0deg)`;
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleDormSelect = (dorm) => {
    console.log(`Dorm ${dorm} from client side..`);
    navigate(`/dorm-booking/dorm-view/${dorm}`);
  };

  return (
    <>
      {showOverlay && (
        <div className="dorm-overlay">
          <p className="dorm-overlay-mahalasa-text">SHREE MAHALASA SAUNSTHAN</p>
          <p>DORMITORY</p>
        </div>
      )}

      <div className="dorm-main-container">
        <div className="dorm-booking-container" ref={cardRef}>
          <h1 className="dorm-heading">Temple Dormitory Booking</h1>
          <h2 id="select-dorm-text">- Select a Dormitory -</h2>

          <div className="dorm-inside-container" id="dorm-inside-container">
            {["Simhapurush", "Graampurush", "Mhaalpurush"].map((dorm) => (
              <button
                key={dorm}
                className="m-2 p-2 border rounded"
                onClick={() => handleDormSelect(dorm)}
                id="dorm-btns"
              >
                {dorm}
              </button>
            ))}
          </div>
        </div>
        <Navbar />
      </div>
    </>
  );
}

export default DormBooking;
