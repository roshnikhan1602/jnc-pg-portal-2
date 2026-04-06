import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";
/* ================= API ================= */
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});




/* ================= MAP ================= */
const slugToDepartmentMap = {
  "computer-science": "Department of Computer Science",
  "management": "Department of Management",
  "chemistry": "Department of Chemistry",
  "biological-sciences": "Department of Biological Sciences",
  "mathematics": "Department of Mathematics",
  "english": "Department of English",
  "psychology": "Department of Psychology",
  "commerce": "Department of Commerce",
};

export default function PostgraduateDetails() {
  const { dept } = useParams();

const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [activeBox, setActiveBox] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState([]);

  const departmentName = slugToDepartmentMap[dept];

  /* ================= FETCH ================= */
  useEffect(() => {
    if (!departmentName) return;

    fetchData();
  }, [dept]);

  const fetchData = async () => {
    try {
      const res = await api.get(`/postgraduate/${departmentName}`);
      setData(res.data || {});
    } catch (err) {
      alert("Postgraduate data not found");
    }
  };

  /* ================= MODAL ================= */
  const openModal = (title, content) => {
    setModalTitle(title);
    setModalContent(content || []);
    setActiveBox(true);
  };

  if (!data) return <p>Loading...</p>;

  /* ================= SAFE ARRAYS ================= */
  const objectives = Array.isArray(data.objectives)
    ? data.objectives
    : [];

  const outcomes = Array.isArray(data.outcomes)
    ? data.outcomes
    : [];

  /* ================= UI ================= */
  return (
    <div className="pg-container">

      {/* HEADER */}
      <h1 className="pg-header">{departmentName}</h1>

      {/* VISION & MISSION */}
      <div className="vm-grid">
        <div className="vm-card card-gradient">
          <h3>Vision</h3>
          <p>{data.vision || "No data available"}</p>
        </div>

        <div className="vm-card card-gradient-alt">
          <h3>Mission</h3>
          <p>{data.mission || "No data available"}</p>
        </div>
      </div>

      {/* OBJECTIVES & OUTCOMES */}
      <div className="vm-grid">
        <div className="vm-card">
          <h3>Programme Objectives</h3>
<p>{data.objectives || "No data available"}</p>
 
        </div>

        <div className="vm-card">
          <h3>Programme Specific Outcomes</h3>

          {outcomes.length > 0 ? (
            <ul>
              {outcomes.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>

      {/* ACTION BOXES */}
{/* ACTION BOXES */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

  {/* PLACEMENTS */}
  <div
    className="bg-blue-100 hover:bg-blue-200 cursor-pointer p-4 rounded-lg text-center font-semibold transition"
    onClick={() => navigate("/placements")}
  >
    PLACEMENTS
  </div>

  {/* EVENTS */}
  <div
    className="bg-green-100 hover:bg-green-200 cursor-pointer p-4 rounded-lg text-center font-semibold transition"
    onClick={() => navigate("/student")}
  >
    EVENTS
  </div>

  {/* ANNOUNCEMENTS */}
  <div
    className="bg-yellow-100 hover:bg-yellow-200 cursor-pointer p-4 rounded-lg text-center font-semibold transition"
    onClick={() => navigate("/student")}
  >
    ANNOUNCEMENTS
  </div>

  {/* 🔥 FACULTY (MAIN PART) */}
  <div
    className="bg-purple-100 hover:bg-purple-200 cursor-pointer p-4 rounded-lg text-center font-semibold transition"
    onClick={() =>
      navigate(`/faculty?dept=${(departmentName)}`)
    }
  >
    FACULTY
  </div>

</div>

      {/* MODAL */}
      {activeBox && (
        <div className="modal">
          <div className="modal-box">

            <h3>{modalTitle}</h3>

            <ul>
              {modalContent && modalContent.length > 0 ? (
                modalContent.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))
              ) : (
                <li>No data available</li>
              )}
            </ul>

            <button onClick={() => setActiveBox(false)}>
              Close
            </button>

          </div>
        </div>
      )}
    </div>
  );
}