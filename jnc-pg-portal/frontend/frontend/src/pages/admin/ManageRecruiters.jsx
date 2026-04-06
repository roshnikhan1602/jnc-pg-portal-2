import { useEffect, useState } from "react";
import {
  getRecruiters,
  addRecruiter,
  updateRecruiter,
  deleteRecruiter,
} from "../../api/recruiterApi";
import api from "../../api/axios";
import "./Admin.css";

export default function ManageRecruiters() {
  const [recruiters, setRecruiters] = useState([]);
  const [name, setName] = useState("");
  const [logo, setLogo] = useState(null);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const fetchRecruiters = async () => {
    const data = await getRecruiters();
    setRecruiters(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    if (logo) formData.append("logo", logo);

    if (editingId) {
      await updateRecruiter(editingId, formData);
      setEditingId(null);
    } else {
      await addRecruiter(formData);
    }

    setName("");
    setLogo(null);
    fetchRecruiters();
  };

  const handleEdit = (rec) => {
    setName(rec.name);
    setEditingId(rec._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this recruiter?")) {
      await deleteRecruiter(id);
      fetchRecruiters();
    }
  };

  const getFullUrl = (p) => {
    if (p.startsWith("http")) return p;
    const base = api.defaults.baseURL.replace(/\/api\/?$/, "");
    return base + p;
  };

  return (
    <div className="admin-wrapper">
      <div className="form-section">
        <h2>{editingId ? "Edit Recruiter" : "Add Recruiter"}</h2>
        <form onSubmit={handleSubmit} className="placement-form">
          <input
            placeholder="Company Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input type="file" onChange={(e) => setLogo(e.target.files[0])} />
          <button type="submit">{editingId ? "Update" : "Add"}</button>
        </form>
      </div>

      <div className="list-section">
        <h2>All Recruiters</h2>
        {recruiters.map((r) => (
          <div key={r._id} className="placement-card">
            <img src={getFullUrl(r.logo)} alt={r.name} style={{ height: 50 }} />
            <strong>{r.name}</strong>
            <div className="actions">
              <button onClick={() => handleEdit(r)}>Edit</button>
              <button onClick={() => handleDelete(r._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
