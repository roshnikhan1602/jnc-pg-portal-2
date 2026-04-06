import React, { useEffect, useState } from "react";
import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/recruiters`;
const BASE = `${import.meta.env.VITE_API_URL}`;

export default function AdminRecruiters() {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [logo, setLogo] = useState(null);
  const [recruiters, setRecruiters] = useState([]);

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const fetchRecruiters = async () => {
    const res = await axios.get(API);
    setRecruiters(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!logo) return alert("Please select a logo");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("website", website);
    formData.append("logo", logo);

    try {
      await axios.post(API, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Recruiter added!");
      setName("");
      setWebsite("");
      setLogo(null);
      fetchRecruiters();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this recruiter?")) return;
    await axios.delete(`${API}/${id}`);
    fetchRecruiters();
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Add Recruiter</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "40px" }}>
        <input
          type="text"
          placeholder="Company Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="text"
          placeholder="Website (optional)"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <br /><br />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setLogo(e.target.files[0])}
          required
        />
        <br /><br />

        <button type="submit">Add Recruiter</button>
      </form>

      <h2>All Recruiters</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {recruiters.map((r) => (
          <div
            key={r._id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "10px",
              width: "180px",
              textAlign: "center",
            }}
          >
            <img
              src={BASE + r.logo}
              alt={r.name}
              style={{ width: "100%", height: "80px", objectFit: "contain" }}
            />
            <h4>{r.name}</h4>
            <button onClick={() => handleDelete(r._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
