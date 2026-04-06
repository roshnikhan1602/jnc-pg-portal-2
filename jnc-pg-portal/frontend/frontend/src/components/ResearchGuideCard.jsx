import { useNavigate } from "react-router-dom";
import "./Researchguidecardcss.css"
/* ================= CONFIG ================= */
const BASE_URL = `${import.meta.env.VITE_API_URL}`;

export default function ResearchGuideCard({ guide, dept }) {
  const navigate = useNavigate();

  /* ================= SAFE IMAGE ================= */
  const imageSrc = guide?.image
    ? `${BASE_URL}${guide.image}`
    : "https://via.placeholder.com/300x300?text=No+Image";

  return (
    <div className="guide-card">

      {/* IMAGE */}
      <div className="guide-image-wrapper">
        <img src={imageSrc} alt={guide?.name || "Guide"} />
      </div>

      {/* CONTENT */}
      <div className="guide-content">
        <h4>{guide?.name || "No Name"}</h4>
        <p className="designation">{guide?.designation || ""}</p>
        <p className="qualification">{guide?.qualification || ""}</p>
      </div>

      {/* ACTION */}
      <button
        className="guide-btn"
        onClick={() =>
          navigate(`/research/${dept}/guide/${guide.slug}`)
        }
      >
        View Details →
      </button>

    </div>
  );
}