import React from "react";
import "./map.css";

function Map() {
  return (
    <div className="map-container">
      <h3>Our Location</h3>

      <iframe
        title="jyoti-nivas-location"
        src="https://www.google.com/maps?q=Jyoti+Nivas+College&output=embed"
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
}

export default Map;