import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

/* ================= API ================= */
const api = axios.create({
  baseURL: "http://localhost:3000/api", // FIXED
  withCredentials: true,
});

/* ================= MAPPINGS ================= */
const slugToDepartmentMap = {
  "computer-science": "Department of Computer Science",
  "management": "Department of Management",
  "chemistry": "Department of Chemistry",
  "biological-sciences": "Department of Biological Sciences",
  "mathematics": "Department of Mathematics",
  "english": "Department of English",
  "psychology": "Department of Psychology",
};

const courseMap = {
  "Department of Computer Science": ["MCA", "M.Sc"],
  "Department of Management": ["MBA"],
  "Department of Chemistry": ["M.Sc Chemistry", "M.Sc Biochemistry"],
  "Department of Psychology": ["M.Sc Psychology", "M.A Psychology"],
  "Department of English": ["M.A English"],
  "Department of Biological Sciences": ["M.Sc Biological Sciences"],
  "Department of Mathematics": ["M.Sc Mathematics"],
  "Department of Commerce": ["M.Com (Finance Analysis)"],
};

export default function ApplicationForm() {
  const { dept } = useParams();
  const navigate = useNavigate();

  const departmentName = slugToDepartmentMap[dept] || "Unknown Department";
  const courses = courseMap[departmentName] || [];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    course: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  /* ================= VALIDATION ================= */
  const validate = () => {
    const newErrors = {};

    if (!formData.name || formData.name.trim().length < 3)
      newErrors.name = "Name must be at least 3 characters";

    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Enter a valid email";

    if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone must be 10 digits";

    if (!formData.address || formData.address.trim().length < 10)
      newErrors.address = "Address must be at least 10 characters";

    if (!formData.course)
      newErrors.course = "Select a course";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      await api.post("/application", {
        department: departmentName,
        ...formData,
      });

      alert("Application submitted successfully");

      navigate("/public"); // redirect after submit
    } catch (err) {
      alert(err.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="apply-page">
      <div className="apply-card">
        <h2>PG Application Form</h2>
        <p className="apply-subtitle">{departmentName}</p>

        <form onSubmit={handleSubmit}>
          {/* NAME */}
          <div className="form-group">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          {/* EMAIL */}
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          {/* PHONE */}
          <div className="form-group">
            <input
              type="text"
              placeholder="Mobile Number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>

          {/* ADDRESS */}
          <div className="form-group">
            <textarea
              placeholder="Residential Address"
              rows="3"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
            {errors.address && (
              <span className="error">{errors.address}</span>
            )}
          </div>

          {/* COURSE */}
          <div className="form-group">
            <select
              value={formData.course}
              onChange={(e) =>
                setFormData({ ...formData, course: e.target.value })
              }
            >
              <option value="">Select Course</option>
              {courses.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.course && <span className="error">{errors.course}</span>}
          </div>

          {/* BUTTON */}
          <button className="submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
}