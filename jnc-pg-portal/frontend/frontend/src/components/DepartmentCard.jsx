import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ================= CONFIG ================= */
const API_BASE = "http://localhost:3000";

/* ================= SLUG MAP ================= */
const deptSlugMap = {
  "Department of Computer Science": "computer-science",
  "Department of Management": "management",
  "Department of Chemistry": "chemistry",
  "Department of Biological Sciences": "biological-sciences",
  "Department of Mathematics": "mathematics",
  "Department of English": "english",
  "Department of Psychology": "psychology",
  "Department of Commerce": "commerce",
};

/* ================= ICONS ================= */
const icons = {
  "Department of Computer Science": "💻",
  "Department of Management": "📊",
  "Department of Chemistry": "🧪",
  "Department of English": "📚",
  "Department of Biological Sciences": "🧬",
  "Department of Mathematics": "➗",
  "Department of Psychology": "🧠",
  "Department of Commerce": "💼",
};

export default function DepartmentCard({ title, role, feeData }) {
  const navigate = useNavigate();

  const [showFee, setShowFee] = useState(false);
  const [showSyllabus, setShowSyllabus] = useState(false);
  const [syllabusFile, setSyllabusFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fees = feeData?.[title] || {};

  /* ================= UPLOAD ================= */
  const handleUpload = async () => {
    if (!syllabusFile) {
      alert("Please select a file");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("department", title);
      formData.append("syllabus", syllabusFile);

      const res = await fetch(`${API_BASE}/api/department/syllabus`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      alert("Syllabus uploaded successfully");
      setShowSyllabus(false);
      setSyllabusFile(null);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="dept-card">

      {/* ICON */}
      <div className="dept-icon">{icons[title] || "🎓"}</div>

      {/* TITLE */}
      <h3 className="dept-title">{title}</h3>

      {/* BUTTONS */}
      <div className="dept-buttons">

        {/* Postgraduate */}
        <button
          className="primary-btn"
          onClick={() =>
            navigate(`/postgraduate/${deptSlugMap[title]}`)
          }
        >
          Postgraduate
        </button>

        {/* Research */}
        {(role === "admin" || role === "faculty" || role === "public") &&
          ![
            "Department of Biological Sciences",
            "Department of Commerce",
            "Department of Mathematics",
            "Department of Psychology",
          ].includes(title) && (
            <button
              className="primary-btn"
              onClick={() =>
                navigate(`/research/${deptSlugMap[title]}`)
              }
            >
              Research Centre
            </button>
        )}

        {/* PUBLIC */}
        {role === "public" && (
          <>
            <button
              className="info-btn"
              onClick={() => setShowFee(!showFee)}
            >
              {showFee ? "Hide Fees" : "Fee Structure"}
            </button>

            <button
              className="primary-btn apply-btn"
              onClick={() =>
                navigate(`/apply/${deptSlugMap[title]}`)
              }
            >
              Apply
            </button>
          </>
        )}

        {/* FACULTY */}
        {role === "faculty" && (
          <button
            className="edit-btn"
            onClick={() => setShowSyllabus(true)}
          >
            Upload Syllabus
          </button>
        )}

      </div>

      {/* ================= FEES ================= */}
{showFee && (
  <div className="bg-gray-100 p-4 rounded-xl mt-4 shadow-sm">

    <h4 className="text-lg font-semibold text-blue-600 mb-3">
      Fee Structure
    </h4>

    {Object.keys(fees).length === 0 ? (
      <p className="text-gray-500">No fee data available</p>
    ) : (
      <div className="space-y-3">

        {Object.entries(fees).map(([type, value]) => (
          <div
            key={type}
            className="flex justify-between items-center bg-white px-4 py-3 rounded-lg shadow-sm"
          >
            <span className="capitalize font-medium text-gray-700">
              {type}
            </span>

            <span className="font-semibold text-gray-900">
              ₹ {value || 0}
            </span>
          </div>
        ))}

      </div>
    )}
  </div>
)}

      {/* ================= MODAL ================= */}
      {showSyllabus && (
        <div className="modal">
          <div className="modal-box">
            <h3>Upload Syllabus – {title}</h3>

            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setSyllabusFile(e.target.files[0])}
            />

            <button onClick={handleUpload} disabled={uploading}>
              {uploading ? "Uploading..." : "Upload"}
            </button>

            <button onClick={() => setShowSyllabus(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
}