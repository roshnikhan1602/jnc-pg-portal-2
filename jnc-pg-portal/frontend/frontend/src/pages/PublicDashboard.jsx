import { useEffect, useState } from "react";
import axios from "axios";
import DepartmentCard from "../components/DepartmentCard";

/* ================= API ================= */
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export default function PublicDashboard() {
  const [feeData, setFeeData] = useState({});
  const [loading, setLoading] = useState(true);

  /* ================= DEPARTMENTS ================= */
  const departments = [
    "Department of Computer Science",
    "Department of Management",
    "Department of Chemistry",
    "Department of English",
    "Department of Biological Sciences",
    "Department of Mathematics",
    "Department of Psychology",
    "Department of Commerce",
  ];

  /* ================= FETCH ================= */
  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    try {
      const res = await api.get("/department/fees");
      setFeeData(res.data || {});
    } catch (err) {
      console.error("Error fetching fees:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div>

      {/* HERO SECTION */}
      <div className="hero-section">
        <h1>Postgraduate Programmes</h1>
        <p>Explore advanced degrees across multiple disciplines</p>
      </div>

      {/* LOADING */}
      {loading && <p style={{ textAlign: "center" }}>Loading departments...</p>}

      {/* GRID */}
      <div className="grid">
        {departments.map((dept, i) => (
          <DepartmentCard
            key={i}
            title={dept}
            role="public"
            feeData={feeData}
          />
        ))}
      </div>

    </div>
  );
}