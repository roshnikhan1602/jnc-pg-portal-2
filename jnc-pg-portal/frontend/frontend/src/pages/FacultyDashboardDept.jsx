import { useState, useEffect } from "react";
import axios from "axios";
import DepartmentCard from "../components/DepartmentCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Navigate, useNavigate } from "react-router-dom";

/* ================= API ================= */
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export default function FacultyDashboardR() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [viewMode, setViewMode] = useState("department");
  const [syllabusFile, setSyllabusFile] = useState(null);
  const [researchData, setResearchData] = useState(null);
  const [selectedDept, setSelectedDept] = useState("computer-science");


const researchDepartments = [
  { name: "Computer Science", slug: "computer-science" },
  { name: "Management", slug: "management" },
  { name: "Chemistry", slug: "chemistry" },
  { name: "English", slug: "english" },
  { name: "Commerce", slug: "commerce" },
  { name: "Biological Sciences", slug: "biological-sciences" },
  { name: "Mathematics", slug: "mathematics" },
  { name: "Psychology", slug: "psychology" },
];

  /* ================= DATA ================= */
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




  const allDeptData = [
    { name: "Computer Science", present: 42, absent: 8 },
    { name: "Management", present: 35, absent: 10 },
    { name: "Chemistry", present: 30, absent: 12 },
    { name: "English", present: 28, absent: 9 },
    { name: "Biological Sciences", present: 32, absent: 11 },
    { name: "Mathematics", present: 27, absent: 13 },
    { name: "Psychology", present: 25, absent: 10 },
    { name: "Commerce", present: 29, absent: 9 },
  ];

  const monthlyData = [
    { name: "Jan", present: 80, absent: 20 },
    { name: "Feb", present: 75, absent: 25 },
    { name: "Mar", present: 85, absent: 15 },
    { name: "Apr", present: 90, absent: 10 },
    { name: "May", present: 88, absent: 12 },
    { name: "Jun", present: 92, absent: 8 },
    { name: "Jul", present: 86, absent: 14 },
    { name: "Aug", present: 89, absent: 11 },
    { name: "Sep", present: 91, absent: 9 },
    { name: "Oct", present: 87, absent: 13 },
    { name: "Nov", present: 90, absent: 10 },
    { name: "Dec", present: 93, absent: 7 },
  ];

  /* ================= FETCH RESEARCH ================= */
useEffect(() => {
  if (!selectedDept) return;

  const fetchResearch = async () => {
    try {
      const res = await api.get(`/research/${selectedDept}`);
      setResearchData(res.data || null);
    } catch (err) {
      console.error(err);
      setResearchData(null);
    }
  };

  fetchResearch();
}, [selectedDept]);

  /* ================= UPLOAD ================= */
  const handleUpload = async () => {
    try {
      if (!selectedDept || !syllabusFile) {
        return alert("Select department and file");
      }

      const formData = new FormData();
      formData.append("department", selectedDept);
      formData.append("syllabus", syllabusFile);

      await api.post("/department/syllabus", formData);

      alert("Syllabus uploaded successfully");
    } catch (err) {
      alert("Upload failed");
    }
  };

  const navigate  = useNavigate();
  /* ================= RENDER ================= */
  return (
    <div className="faculty-layout">

      {/* SIDEBAR */}
      <div className="faculty-sidebar">
        <div className="profile">
          <div className="avatar">👩‍🏫</div>
          <h3>Faculty Panel</h3>
        </div>

        <ul className="menu">
          <li className={activeTab === "dashboard" ? "active" : ""}
            onClick={() => setActiveTab("dashboard")}>
            Dashboard
          </li>

          <li className={activeTab === "departments" ? "active" : ""}
            onClick={() => setActiveTab("departments")}>
            Departments
          </li>

          <li className={activeTab === "research" ? "active" : ""}
            onClick={() => setActiveTab("research")}>
            Research
          </li>

          <li 
            onClick={() => navigate("/faculty/events")}>
            Event's & Anouncement's
          </li>
          <li className={activeTab === "upload" ? "active" : ""}
            onClick={() => setActiveTab("upload")}>
            Upload
          </li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="faculty-main">

        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <>
            <div className="faculty-cards">
              <div className="card">Departments<br /><strong>8</strong></div>
              <div className="card">Research Centers<br /><strong>4</strong></div>
              <div className="card">Uploads<br /><strong>Active</strong></div>
            </div>

            <div className="chart-box">

              <div className="chart-controls">
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                >
                  <option value="All">All Departments</option>
                  {allDeptData.map((d, i) => (
                    <option key={i} value={d.name}>{d.name}</option>
                  ))}
                </select>

                <button
                  onClick={() =>
                    setViewMode(viewMode === "department" ? "monthly" : "department")
                  }
                >
                  Switch View
                </button>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={
                    viewMode === "monthly"
                      ? monthlyData
                      : selectedDept === "All"
                      ? allDeptData
                      : allDeptData.filter(d => d.name === selectedDept)
                  }
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="present" />
                  <Bar dataKey="absent" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {/* DEPARTMENTS */}
        {activeTab === "departments" && (
          <div className="grid">
            {departments.map((dept, i) => (
              <DepartmentCard key={i} title={dept} role="faculty" />
            ))}
          </div>
        )}

        {/* RESEARCH */}
 {/* ================= RESEARCH TAB ================= */}
{activeTab === "research" && (
  <div className="content-box">

    <h2 className="section-title">Research Centre</h2>

    {/* ================= DROPDOWN ================= */}
    <select 
      className="research-select border-2 rounded-lg"
      value={selectedDept}
      onChange={(e) => setSelectedDept(e.target.value)}
    >
      {researchDepartments.map((d, i) => (
        <option key={i} value={d.slug}>
          {d.name}
        </option>
      ))}
    </select>

    {/* ================= NO DATA ================= */}
    {!researchData ? (
      <p className="no-data">No Research Data Available</p>
    ) : (
      <>
        {/* INTRO */}
        <p className="research-intro">
          {researchData.intro || "No introduction available"}
        </p>

        {/* ================= GUIDES ================= */}
        <h3 className="sub-heading">Recognised Guides</h3>

        <div className="guide-grid">
          {researchData.guides?.length > 0 ? (
            researchData.guides.map((g, i) => (
              <div
                key={i}
                className="guide-card"
                onClick={() => navigate(`/faculty/${g._id}`)}
              >
                <img
                  src={
                    g.image?.startsWith("http")
                      ? g.image
                      : g.image?.startsWith("/uploads")
                      ? `http://localhost:3000${g.image}`
                      : `http://localhost:3000/uploads/${g.image}`
                  }
                  alt={g.name}
                  onError={(e) => (e.target.src = "/avatar.png")}
                />

                <h4 className="guide-name">{g.name}</h4>

                <p className="guide-meta">
                  <b>Designation:</b> {g.designation || "N/A"}
                </p>

                <p className="guide-meta">
                  <b>Email:</b> {g.user?.email || "N/A"}
                </p>
              </div>
            ))
          ) : (
            <p>No guides available</p>
          )}
        </div>

        {/* ================= SCHOLARS ================= */}
        <h3 className="sub-heading">
          Scholars ({researchData.scholars?.length || 0})
        </h3>

        {researchData.scholars?.length > 0 ? (
          <ol className="scholar-list">
            {researchData.scholars.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        ) : (
          <p>No scholars available</p>
        )}
      </>
    )}
  </div>
)}

        {/* UPLOAD */}
        {activeTab === "upload" && (
          <div className="content-box">

            <h2>Upload Syllabus</h2>

            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
            >
              <option value="">Select Department</option>
              {departments.map((d, i) => (
                <option key={i}>{d}</option>
              ))}
            </select>

            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setSyllabusFile(e.target.files[0])}
            />

            <button onClick={handleUpload}>
              Upload
            </button>

          </div>
        )}

      </div>
    </div>
  );
}