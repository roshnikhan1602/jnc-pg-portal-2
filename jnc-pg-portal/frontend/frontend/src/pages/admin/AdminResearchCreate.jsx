import { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

export default function AdminResearchCreate() {
  const [department, setDepartment] = useState("computer-science");
  const [intro, setIntro] = useState("");
  const [facultyList, setFacultyList] = useState([]);
  const [selectedGuides, setSelectedGuides] = useState([]);
  const [scholars, setScholars] = useState("");
  const [conclusion, setConclusion] = useState("");

  /* ================= LOAD FACULTY ================= */
  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    const res = await api.get("/research/faculty/list");
    setFacultyList(res.data);
  };

  /* ================= SELECT GUIDE ================= */
  const toggleGuide = (id) => {
    setSelectedGuides((prev) =>
      prev.includes(id)
        ? prev.filter((g) => g !== id)
        : [...prev, id]
    );
  };

  /* ================= SAVE ================= */
  const handleSubmit = async () => {
    await api.post("/research", {
      department,
      intro,
      guides: selectedGuides,
      scholars: scholars.split(","),
      conclusion,
    });

    alert("Research Saved!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Create Research</h2>

      {/* DEPARTMENT */}
      <select onChange={(e) => setDepartment(e.target.value)}>
        <option value="computer-science">Computer Science</option>
        <option value="management">Management</option>
        <option value="chemistry">Chemistry</option>
        <option value="english">English</option>
      </select>

      {/* INTRO */}
      <textarea
        placeholder="Intro"
        onChange={(e) => setIntro(e.target.value)}
      />

      {/* GUIDES */}
      <h3>Select Guides (Faculty)</h3>
      {facultyList.map((f) => (
        <div key={f._id}>
          <input
            type="checkbox"
            onChange={() => toggleGuide(f._id)}
          />
          {f.name} ({f.designation})
        </div>
      ))}

      {/* SCHOLARS */}
      <textarea
        placeholder="Scholars (comma separated)"
        onChange={(e) => setScholars(e.target.value)}
      />

      {/* CONCLUSION */}
      <textarea
        placeholder="Conclusion"
        onChange={(e) => setConclusion(e.target.value)}
      />

      <button onClick={handleSubmit}>Save</button>
    </div>
  );
}