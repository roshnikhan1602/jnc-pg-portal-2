import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

/* ================= API ================= */
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

export default function FacultyEdit() {
  const { dept } = useParams();

  const [form, setForm] = useState({
    vision: "",
    mission: "",
    objectives: "",
    outcomes: "",
  });

  const [syllabusFile, setSyllabusFile] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH EXISTING ================= */
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get(`/department/${dept}`);

      if (res.data) {
        setForm({
          vision: res.data.vision || "",
          mission: res.data.mission || "",
          objectives: (res.data.objectives || []).join(", "),
          outcomes: (res.data.outcomes || []).join(", "),
        });
      }
    } catch (err) {
      console.log("No existing data");
    }
  };

  /* ================= SAVE TEXT DATA ================= */
  const handleSave = async () => {
    try {
      setLoading(true);

      await api.put("/department/postgraduate", {
        department: dept,
        data: {
          vision: form.vision,
          mission: form.mission,
          objectives: form.objectives.split(",").map((s) => s.trim()).filter(Boolean),
          outcomes: form.outcomes.split(",").map((s) => s.trim()).filter(Boolean),
        },
      });

      alert("Department updated successfully");
    } catch (err) {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UPLOAD SYLLABUS ================= */
  const handleUpload = async () => {
    try {
      if (!syllabusFile) return alert("Select a file");

      const formData = new FormData();
      formData.append("department", dept);
      formData.append("syllabus", syllabusFile);

      await api.post("/department/syllabus", formData);

      alert("Syllabus uploaded successfully");
    } catch (err) {
      alert("Upload failed");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="pg-container">

      <h2 className="pg-header">Edit Department</h2>
      <p><strong>Department:</strong> {dept}</p>

      {/* VISION */}
      <textarea
        placeholder="Vision"
        value={form.vision}
        onChange={(e) => setForm({ ...form, vision: e.target.value })}
      />

      {/* MISSION */}
      <textarea
        placeholder="Mission"
        value={form.mission}
        onChange={(e) => setForm({ ...form, mission: e.target.value })}
      />

      {/* OBJECTIVES */}
      <textarea
        placeholder="Objectives (comma separated)"
        value={form.objectives}
        onChange={(e) => setForm({ ...form, objectives: e.target.value })}
      />

      {/* OUTCOMES */}
      <textarea
        placeholder="Outcomes (comma separated)"
        value={form.outcomes}
        onChange={(e) => setForm({ ...form, outcomes: e.target.value })}
      />

      {/* SAVE BUTTON */}
      <button onClick={handleSave} disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </button>

      <hr />

      {/* SYLLABUS UPLOAD */}
      <h3>Upload Syllabus (PDF)</h3>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setSyllabusFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>
        Upload Syllabus
      </button>

    </div>
  );
}