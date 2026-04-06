import React, { useEffect, useState } from "react";
import "./admin.css"
import {
  getPlacements,
  addPlacement,
  updatePlacement,
  deletePlacement,
} from "../../api/placementApi";

import {
  uploadGalleryImageByUrl,
  getGallery,
  deleteGalleryImage,
  updateGalleryImage,
} from "../../api/galleryApi";

import api from "../../api/axios";
import "./Admin.css";

export default function AddPlacement() {
  const [placements, setPlacements] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    studentName: "",
    department: "",
    company: "",
    role: "",
    package: "",
    date: "",
  });

  // GALLERY STATES
  const [galleryImages, setGalleryImages] = useState([]);
  const [imageUrls, setImageUrls] = useState("");
  const [uploading2, setUploading2] = useState(false);
  const [urlCompany, setUrlCompany] = useState("");
  const [urlYear, setUrlYear] = useState("");
  const [urlCaption, setUrlCaption] = useState("");

  const [galleryEditingId, setGalleryEditingId] = useState(null);
  const [galleryEditForm, setGalleryEditForm] = useState({
    caption: "",
    company: "",
    year: "",
  });

  useEffect(() => {
    fetchPlacements();
    fetchGallery();
  }, []);

  const fetchPlacements = async () => {
    const data = await getPlacements();
    setPlacements(data);
  };

  const fetchGallery = async () => {
    try {
      const imgs = await getGallery();
      setGalleryImages(imgs || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await updatePlacement(editingId, form);
      setEditingId(null);
    } else {
      await addPlacement(form);
    }

    setForm({
      studentName: "",
      department: "",
      company: "",
      role: "",
      package: "",
      date: "",
    });

    fetchPlacements();
  };

  // ✅ UPLOAD IMAGES BY URL
  const handleUploadByUrl = async (e) => {
    e.preventDefault();
    if (!imageUrls.trim()) return alert("Enter at least one image URL");

    try {
      setUploading2(true);
      const response = await uploadGalleryImageByUrl(
        imageUrls,
        urlCompany,
        urlYear,
        urlCaption
      );

      setImageUrls("");
      setUrlCompany("");
      setUrlYear("");
      setUrlCaption("");
      fetchGallery();

      if (response.failedCount === 0) {
        alert("Successfully added " + response.uploadedCount + " image(s)");
      } else {
        alert(
          "Added " +
            response.uploadedCount +
            " image(s), Failed: " +
            response.failedCount
        );
      }
    } catch (err) {
      console.error(err);
      alert("URL upload failed");
    } finally {
      setUploading2(false);
    }
  };

  const handleGalleryEditInit = (img) => {
    setGalleryEditingId(img._id);
    setGalleryEditForm({
      caption: img.caption || "",
      company: img.company || "",
      year: img.year || "",
    });
  };

  const handleGalleryEditChange = (e) =>
    setGalleryEditForm({ ...galleryEditForm, [e.target.name]: e.target.value });

  const handleGalleryUpdate = async (e) => {
    e.preventDefault();
    if (!galleryEditingId) return;

    try {
      await updateGalleryImage(galleryEditingId, galleryEditForm);
      setGalleryEditingId(null);
      fetchGallery();
      alert("Updated");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const handleGalleryDelete = async (id) => {
    if (!window.confirm("Delete this image?")) return;
    await deleteGalleryImage(id);
    fetchGallery();
  };

  const getFullUrl = (p) => {
    if (!p) return "";
    if (p.match(/^https?:/)) return p;
    const base = api.defaults.baseURL.replace(/\/api\/?$/, "");
    return `${base}${p}`;
  };

  const handleEdit = (placement) => {
    setForm({
      studentName: placement.studentName,
      department: placement.department,
      company: placement.company,
      role: placement.role,
      package: placement.package,
      date: placement.date ? placement.date.substring(0, 10) : "",
    });
    setEditingId(placement._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this placement?")) {
      await deletePlacement(id);
      fetchPlacements();
    }
  };

  return (
    <div className="admin-wrapper">
      {/* LEFT SIDE */}
      <div className="form-section">
        <h2>{editingId ? "Edit Placement" : "Add Placement"}</h2>

        <form onSubmit={handleSubmit} className="placement-form">
          <input name="studentName" placeholder="Student Name" value={form.studentName} onChange={handleChange} required />
          <input name="department" placeholder="Department" value={form.department} onChange={handleChange} required />
          <input name="company" placeholder="Company" value={form.company} onChange={handleChange} required />
          <input name="role" placeholder="Role" value={form.role} onChange={handleChange} required />
          <input name="package" placeholder="Package" value={form.package} onChange={handleChange} />
          <input name="date" type="date" value={form.date} onChange={handleChange} />
          <button type="submit">{editingId ? "Update Placement" : "Add Placement"}</button>
        </form>

        <hr />
        <h3>Add Gallery Images by URL</h3>
        <form onSubmit={handleUploadByUrl} className="placement-form">
          <textarea
            placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
            value={imageUrls}
            onChange={(e) => setImageUrls(e.target.value)}
            rows={4}
          />
          <input placeholder="Caption (optional)" value={urlCaption} onChange={(e) => setUrlCaption(e.target.value)} />
          <input placeholder="Company Name" value={urlCompany} onChange={(e) => setUrlCompany(e.target.value)} />
          <input placeholder="Year" value={urlYear} onChange={(e) => setUrlYear(e.target.value)} />
          <button type="submit" disabled={uploading2}>
            {uploading2 ? "Adding..." : "Add Images"}
          </button>
        </form>

        <hr />
        <h3>Manage Gallery</h3>
        {galleryImages.map((img) => (
          <div key={img._id} className="gallery-admin-item">
            <img src={getFullUrl(img.path)} alt="" />
            <div>
              <strong>{img.company}</strong> ({img.year})
              <p>{img.caption}</p>
            </div>
            <button onClick={() => handleGalleryEditInit(img)}>Edit</button>
            <button onClick={() => handleGalleryDelete(img._id)}>Delete</button>
          </div>
        ))}

        {galleryEditingId && (
          <form onSubmit={handleGalleryUpdate} className="placement-form">
            <input name="caption" value={galleryEditForm.caption} onChange={handleGalleryEditChange} />
            <input name="company" value={galleryEditForm.company} onChange={handleGalleryEditChange} />
            <input name="year" value={galleryEditForm.year} onChange={handleGalleryEditChange} />
            <button type="submit">Save</button>
          </form>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="list-section">
        <h2>All Placements</h2>
        {placements.map((p) => (
          <div key={p._id} className="placement-card">
            <div>
              <strong>{p.studentName}</strong> ({p.department})<br />
              {p.company} — {p.role}<br />
              Package: {p.package || "N/A"}
            </div>
            <div className="actions">
              <button onClick={() => handleEdit(p)}>Edit</button>
              <button onClick={() => handleDelete(p._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
