import { useEffect, useState } from "react";
import api from "@/services/api";
import "./admin.css"

export default function PlacementAboutAdmin() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    highlights: "",
    coordinatorName: "",
    coordinatorDesignation: "",
    coordinatorEmail: "",
    coordinatorPhone: "",
  });

  const [image, setImage] = useState(null);
  const [existingId, setExistingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get("/placement-about");
      if (res.data) {
        const data = res.data;

        setExistingId(data._id);

        setForm({
          title: data.title || "",
          description: data.description || "",
          highlights: data.highlights?.join(",") || "",
          coordinatorName: data.coordinator?.name || "",
          coordinatorDesignation: data.coordinator?.designation || "",
          coordinatorEmail: data.coordinator?.email || "",
          coordinatorPhone: data.coordinator?.phone || "",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("highlights", form.highlights);

      formData.append("coordinatorName", form.coordinatorName);
      formData.append("coordinatorDesignation", form.coordinatorDesignation);
      formData.append("coordinatorEmail", form.coordinatorEmail);
      formData.append("coordinatorPhone", form.coordinatorPhone);

      if (image) {
        formData.append("image", image);
      }

      if (existingId) {
        await api.put(`/placement-about/${existingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Updated successfully");
      } else {
        await api.post("/placement-about", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Created successfully");
      }

      fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to save");
    }
  };

return (
  <div className="about-wrapper">
    <div className="about-card">

      <h2>Placement About (Admin)</h2>

      <form onSubmit={handleSubmit} className="about-form">

        <label>Title</label>
        <input
          name="title"
          placeholder="Enter title"
          value={form.title}
          onChange={handleChange}
        />

        <label>Description</label>
        <textarea
          name="description"
          placeholder="Enter description"
          value={form.description}
          onChange={handleChange}
        />

        <label>Highlights</label>
        <input
          name="highlights"
          placeholder="Comma separated (e.g. 100% placement, Top MNCs)"
          value={form.highlights}
          onChange={handleChange}
        />

        <h3>Coordinator Details</h3>

        <div className="coordinator-grid">

          <input
            name="coordinatorName"
            placeholder="Name"
            value={form.coordinatorName}
            onChange={handleChange}
          />

          <input
            name="coordinatorDesignation"
            placeholder="Designation"
            value={form.coordinatorDesignation}
            onChange={handleChange}
          />

          <input
            name="coordinatorEmail"
            placeholder="Email"
            value={form.coordinatorEmail}
            onChange={handleChange}
          />

          <input
            name="coordinatorPhone"
            placeholder="Phone"
            value={form.coordinatorPhone}
            onChange={handleChange}
          />

        </div>

        <label>Coordinator Image</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit" className="primary-btn">
          {existingId ? "Update" : "Create"}
        </button>

      </form>
    </div>
  </div>
);
}