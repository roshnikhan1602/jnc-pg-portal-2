import { useState, useEffect } from "react";
import axios from "axios";
import "./admin.css"
const API = `${import.meta.env.VITE_API_URL}/api/api/training`;

export default function AdminTraining() {
  const [id, setId] = useState(null);

  const [form, setForm] = useState({
    introduction: "",
    skillsCovered: "",
    technicalDomains: "",
    yearlyPlan: [
      { semester: "First Year", topics: "" },
      { semester: "Second Year", topics: "" },
      { semester: "Third Year", topics: "" }
    ]
  });

  useEffect(() => {
    axios.get(API).then(res => {
      if (res.data) {
        setId(res.data._id);

        setForm({
          introduction: res.data.introduction || "",
          skillsCovered: res.data.skillsCovered?.join(", ") || "",
          technicalDomains: res.data.technicalDomains?.join(", ") || "",
          yearlyPlan: res.data.yearlyPlan?.map(y => ({
            semester: y.semester,
            topics: y.topics.join(", ")
          })) || form.yearlyPlan
        });
      }
    });
  }, []);

  const cleanArray = (str) =>
    str.split(",").map(s => s.trim()).filter(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      introduction: form.introduction,
      skillsCovered: cleanArray(form.skillsCovered),
      technicalDomains: cleanArray(form.technicalDomains),
      yearlyPlan: form.yearlyPlan.map(y => ({
        semester: y.semester,
        topics: cleanArray(y.topics)
      }))
    };

    if (id) {
      await axios.put(`${API}/${id}`, payload);
      alert("Updated successfully");
    } else {
      await axios.post(API, payload);
      alert("Created successfully");
    }
  };

return (
  <div className="training-wrapper">
    <div className="training-card">
      <h2>Placement Training Content</h2>

      <form onSubmit={handleSubmit} className="training-form">

        <label>Introduction</label>
        <textarea
          placeholder="Enter introduction..."
          value={form.introduction}
          onChange={e => setForm({ ...form, introduction: e.target.value })}
        />

        <label>Skills Covered</label>
        <input
          placeholder="Comma separated (e.g. C, Java, Python)"
          value={form.skillsCovered}
          onChange={e => setForm({ ...form, skillsCovered: e.target.value })}
        />

        <label>Technical Domains</label>
        <input
          placeholder="Comma separated (e.g. AI, Web, Cloud)"
          value={form.technicalDomains}
          onChange={e => setForm({ ...form, technicalDomains: e.target.value })}
        />

        <h3>Yearly Plan</h3>

        {form.yearlyPlan.map((year, i) => (
          <div key={i} className="year-block">
            <h4>{year.semester}</h4>

            <textarea
              placeholder="Topics (comma separated)"
              value={year.topics}
              onChange={e => {
                const updated = [...form.yearlyPlan];
                updated[i].topics = e.target.value;
                setForm({ ...form, yearlyPlan: updated });
              }}
            />
          </div>
        ))}

        <button type="submit" className="primary-btn">
          {id ? "Update Training" : "Create Training"}
        </button>

      </form>
    </div>
  </div>
);
}