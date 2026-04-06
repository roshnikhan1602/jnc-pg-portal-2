import { useEffect, useState } from "react";
import { getPlacements } from "../../api/placementApi";
import "./Placements.css";

export default function PlacementsHome() {
  const [placements, setPlacements] = useState([]);
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await getPlacements();
    setPlacements(data.reverse());
  };

  // 🎯 Get unique departments
  const departments = [
    "All",
    ...new Set(placements.map((p) => p.department).filter(Boolean)),
  ];

  // 🎯 Get unique years from dates
  const years = [
    "All",
    ...new Set(
      placements
        .map((p) => (p.date ? new Date(p.date).getFullYear() : null))
        .filter(Boolean)
    ),
  ];

  // 🎯 Filter logic
  const filteredPlacements = placements.filter((p) => {
    const matchDept =
      selectedDept === "All" || p.department === selectedDept;

    const matchYear =
      selectedYear === "All" ||
      (p.date && new Date(p.date).getFullYear().toString() === selectedYear);

    return matchDept && matchYear;
  });

  return (
    <div className="placements-page">
      <div className="placements-list-wrapper">

        {/* HEADER ROW */}
        <div className="placements-header">
          <h2 className="placements-title">Recent Placements</h2>

          <div className="placements-filters">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
            >
              {departments.map((dept, i) => (
                <option key={i} value={dept}>
                  {dept === "All" ? "All Departments" : dept}
                </option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {years.map((year, i) => (
                <option key={i} value={year}>
                  {year === "All" ? "All Years" : year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* CARDS */}
        <div className="placements-list">
          {filteredPlacements.map((p) => (
            <div className="placement-card" key={p._id}>
              <div className="student-name">
                {p.studentName || "Student Name"}
              </div>

              <div className="placement-row">
                <span>Department:</span>
                <span>{p.department || "N/A"}</span>
              </div>

              <div className="placement-row">
                <span>Company:</span>
                <span>{p.company || "N/A"}</span>
              </div>

              <div className="placement-row">
                <span>Role:</span>
                <span>{p.role || "N/A"}</span>
              </div>

              <div className="placement-row">
                <span>Package:</span>
                <span>{p.package || "N/A"}</span>
              </div>

              <div className="placement-row">
                <span>Date:</span>
                <span>
                  {p.date
                    ? new Date(p.date).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
