import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { slugToDepartmentMap } from "../utils/slugMap";

/* ================= API ================= */
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

export default function Research() {
  const { dept } = useParams();
  const navigate = useNavigate();

  const departmentName = slugToDepartmentMap[dept];

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */
  useEffect(() => {
    if (!dept) return;
    fetchResearch();
  }, [dept]);

  const fetchResearch = async () => {
    try {
      const res = await api.get(`/research/${dept}`);
      setData(res.data || {});
    } catch (err) {
      console.error("Research fetch error:", err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  /* ================= STATES ================= */
  if (loading) return <p style={{ padding: 20 }}>Loading research data...</p>;
  if (!data) return <p style={{ padding: 20 }}>No Research Data</p>;

  const guides = data.guides || [];
  const scholars = data.scholars || [];

  /* ================= IMAGE FIX FUNCTION ================= */
  const getImageUrl = (image) => {
    if (!image) return "/avatar.png";

    // already full path
    if (image.startsWith("http")) return image;

    // already has /uploads
    if (image.startsWith("/uploads")) {
      return `${import.meta.env.VITE_API_URL}${image}`;
    }

    // normal case (filename only)
    return `${import.meta.env.VITE_API_URL}/uploads/${image}`;
  };

  return (
    <div className="research-page">

      {/* HEADER */}
      <h1 className="research-header">
        RESEARCH CENTRE – {departmentName?.toUpperCase()} (PG)
      </h1>

      {/* INTRO */}
      <p className="research-intro">
        {data.intro || "No introduction available"}
      </p>

      {/* GUIDES */}
      <h2>RECOGNISED GUIDES</h2>

      <div className="guide-grid  ">
        {guides.length > 0 ? (
          guides.map((g, index) => (
            <div 
              key={index}
              className="guide-card cursor-pointer hover:shadow-lg transition"
              onClick={() => navigate(`/faculty/${g._id}`)}
            >
              <img
                src={getImageUrl(g.image)}  // ✅ FIXED HERE
                alt={g.name}
                onError={(e) => {
                  e.target.src = "/avatar.png"; // fallback
                }}
              />

                
              <h4>{g.name}</h4>
              
              <h4 style={{ fontSize: "12px", color: "gray" }}>Designation : {g.designation}</h4>

              {g.user && (
                <h4 style={{ fontSize: "12px", color: "gray" }}>Email : 
                  {g.user.email}
                </h4>
              )}
            
            </div>
          ))
        ) : (
          <p>No guides available</p>
        )}
      </div>

      {/* SCHOLARS */}
      <h3>
        Currently, {scholars.length} Ph.D. scholars are pursuing research under the centre:
      </h3>

      {scholars.length > 0 ? (
        <ol>
          {scholars.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      ) : (
        <p>No scholars data available</p>
      )}

      {/* CONCLUSION */}
      <p className="research-conclusion">
        {data.conclusion || ""}
      </p>

    </div>
  );
}