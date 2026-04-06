import { useEffect, useState } from "react";
import axios from "axios";
import AdminMenu from "./admin/AdminMenu";

/* ================= API INSTANCE ================= */
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // IMPORTANT for auth
});

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [anns, setAnns] = useState([]);
  const [gallery, setGallery] = useState([]);

  const [editEvent, setEditEvent] = useState(null);
  const [editAnn, setEditAnn] = useState(null);
  const [editGallery, setEditGallery] = useState(null);

  const [form, setForm] = useState({
    title: "",
    eventDate: "",
    venue: "",
    department: "",
    brochure: "",
    description: "",
  });

  const [ann, setAnn] = useState({
    title: "",
    message: "",
    department: "",
    expiryDate: "",
  });

  const [galleryForm, setGalleryForm] = useState({
    title: "",
    description: "",
    images: "",
  });

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [eventsRes, annRes, galleryRes] = await Promise.all([
        api.get("/events"),
        api.get("/announcements"),
        api.get("/event-gallery"),
      ]);

      setEvents(eventsRes.data);
      setAnns(annRes.data);
      setGallery(galleryRes.data);
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
      } else {
        alert("Failed to load data");
      }
    }
  };

  /* ================= EVENTS ================= */
  const postEvent = async () => {
    try {
      if (editEvent) {
        await api.put(`/events/${editEvent._id}`, form);
        setEditEvent(null);
      } else {
        await api.post("/events", { ...form, postedBy: "admin" });
      }

      setForm({
        title: "",
        eventDate: "",
        venue: "",
        department: "",
        brochure: "",
        description: "",
      });

      loadData();
    } catch (err) {
      alert(err.response?.data?.message || "Event action failed");
    }
  };

  const deleteEvent = async (id) => {
    try {
      if (window.confirm("Delete this event?")) {
        await api.delete(`/events/${id}`);
        loadData();
      }
    } catch (err) {
      alert(err.response?.data?.message || "No access");
    }
  };

  /* ================= ANNOUNCEMENTS ================= */
  const postAnn = async () => {
    try {
      if (editAnn) {
        await api.put(`/announcements/${editAnn._id}`, ann);
        setEditAnn(null);
      } else {
        await api.post("/announcements", { ...ann, postedBy: "admin" });
      }

      setAnn({
        title: "",
        message: "",
        department: "",
        expiryDate: "",
      });

      loadData();
    } catch (err) {
      alert(err.response?.data?.message || "Announcement failed");
    }
  };

  const deleteAnn = async (id) => {
    try {
      if (window.confirm("Delete this announcement?")) {
        await api.delete(`/announcements/${id}`);
        loadData();
      }
    } catch (err) {
      alert(err.response?.data?.message || "No access");
    }
  };

  /* ================= GALLERY ================= */
const postGallery = async () => {
  try {
    if (!galleryForm.images.trim()) {
      return alert("Enter image URLs");
    }

    const imagesArray = galleryForm.images
      .split(",")
      .map((img) => img.trim())
      .filter((img) => img.length > 0);

    await api.post("/event-gallery", {
      title: galleryForm.title,
      description: galleryForm.description,
      images: imagesArray,
    });

    alert("Event Gallery Added ✅");

    setGalleryForm({
      title: "",
      description: "",
      images: "",
    });

    loadData();
  } catch (err) {
    alert(err.response?.data?.message || "Upload failed");
  }
};

  const deleteGallery = async (id) => {
    try {
      if (window.confirm("Delete this image?")) {
        await api.delete(`/event-gallery/${id}`);
        loadData();
      }
    } catch (err) {
      alert("Delete failed");
    }
  };

  /* ================= RENDER ================= */
  return (
    <div className="page-container">
      <div className="dashboard-layout">

        {/* LEFT PANEL */}
        <div className="left-panel">

          <h3>{editEvent ? "Edit Event" : "Add Event"}</h3>
          <input placeholder="Title" value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })} />

          <input type="date" value={form.eventDate}
            onChange={e => setForm({ ...form, eventDate: e.target.value })} />

          <input placeholder="Venue" value={form.venue}
            onChange={e => setForm({ ...form, venue: e.target.value })} />

          <input placeholder="Department" value={form.department}
            onChange={e => setForm({ ...form, department: e.target.value })} />

          <input placeholder="Brochure URL" value={form.brochure}
            onChange={e => setForm({ ...form, brochure: e.target.value })} />

          <textarea placeholder="Description" value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })} />

          <button onClick={postEvent}>
            {editEvent ? "Update" : "Post"} Event
          </button>

          <h3 style={{ marginTop: 25 }}>
            {editAnn ? "Edit Announcement" : "Add Announcement"}
          </h3>

          <input placeholder="Title" value={ann.title}
            onChange={e => setAnn({ ...ann, title: e.target.value })} />

          <textarea placeholder="Message" value={ann.message}
            onChange={e => setAnn({ ...ann, message: e.target.value })} />

          <input placeholder="Department" value={ann.department}
            onChange={e => setAnn({ ...ann, department: e.target.value })} />

          <input type="date" value={ann.expiryDate}
            onChange={e => setAnn({ ...ann, expiryDate: e.target.value })} />

          <button onClick={postAnn}>
            {editAnn ? "Update" : "Publish"}
          </button>

          <h3 style={{ marginTop: 25 }}>
            Add Gallery (URL)
          </h3>

          <textarea
            placeholder="https://img1.jpg, https://img2.jpg"
            value={galleryForm.images}
            onChange={e => setGalleryForm({ ...galleryForm, images: e.target.value })}
          />

          <input placeholder="Title"
            value={galleryForm.title}
            onChange={e => setGalleryForm({ ...galleryForm, title: e.target.value })} />

          <input placeholder="Description"
            value={galleryForm.description}
            onChange={e => setGalleryForm({ ...galleryForm, description: e.target.value })} />

          <button onClick={postGallery}>Upload Images</button>

        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">

          <AdminMenu />

          <h3>Events</h3>
          {events.map(e => (
            <div className="card" key={e._id}>
              <h4>{e.title}</h4>
              <p>{e.description}</p>

              <p>
                <b>Date:</b>{" "}
                {e.eventDate ? new Date(e.eventDate).toDateString() : "N/A"}
              </p>

              {e.brochure && <a href={e.brochure}>View Brochure</a>}

              <div className="actions">
                <button onClick={() => { setEditEvent(e); setForm(e); }}>Edit</button>
                <button onClick={() => deleteEvent(e._id)}>Delete</button>
              </div>
            </div>
          ))}

          <h3>Announcements</h3>
          {anns.map(a => (
            <div className="announcement-card" key={a._id}>
              <h4>{a.title}</h4>
              <p>{a.message}</p>
              <div className="actions">
                <button onClick={() => { setEditAnn(a); setAnn(a); }}>Edit</button>
                <button onClick={() => deleteAnn(a._id)}>Delete</button>
              </div>
            </div>
          ))}

          <h3>Gallery</h3>
          {gallery.map(g => (
            <div className="card" key={g._id}>
              <img className="h-30" src={g.images} alt="" />
              <h4>{g.title}</h4>
              <p>{g.description}</p>
              <div className="actions">
                <button onClick={() => deleteGallery(g._id)}>Delete</button>
              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}