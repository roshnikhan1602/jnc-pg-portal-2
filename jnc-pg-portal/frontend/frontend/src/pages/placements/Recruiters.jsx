import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Recruiters.css";

const API = "http://localhost:3000/api/recruiters";

export default function Recruiters() {
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    axios.get(API).then((res) => setLogos(res.data));
  }, []);

  return (
    <section className="recruiters">
      <div className="recruiters-container">

        <h2>Our Recruiters</h2>
        <p className="subtitle">
          Leading companies that recruit from our institution
        </p>

        <div className="recruiter-grid">
          {logos.map((item) => (
            <div key={item._id} className="recruiter-card">
              <img
                src={`${import.meta.env.VITE_API_URL}${item.logo}`} // ✅ FIX
                alt="recruiter"
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}