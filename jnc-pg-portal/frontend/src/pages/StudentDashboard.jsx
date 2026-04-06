import { useEffect, useState } from "react";
import api from "../services/api";
import "../app.css";

export default function StudentDashboard({ role = "student" }) {
  const [gallery, setGallery] = useState([]);
  const [events, setEvents] = useState([]);
  const [anns, setAnns] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    loadAll();
  }, []);
  
const loadAll = async () => {
  setGallery(
    (await api.get("/event-gallery", { withCredentials: true })).data
  );

  setEvents(
    (await api.get("/events", { withCredentials: true })).data
  );

  setAnns(
    (await api.get("/announcements", { withCredentials: true })).data
  );
};

  return (
    <div className="dashboard m-10 ">

      {/* ================= EVENT GALLERY ================= */}
      <h2>Event Gallery</h2>

        {gallery.map(g => (
            <div className="card" key={g._id}>
              <img className="h-30" src={g.images} alt="" />
              <h4>{g.title}</h4>
              <p>{g.description}</p>
            </div>
          ))}

      {/* IMAGE POPUP */}
      {selectedImg && (
        <div className="image-modal" onClick={() => setSelectedImg(null)}>
          <img src={selectedImg} alt="popup" />
        </div>
      )}

      {/* ================= ANNOUNCEMENTS ================= */}
      <h2>Latest Announcements</h2>

      {anns.map(a => (
        <div className="announcement-card" key={a._id}>
          <h4>{a.title}</h4>
          <p>{a.message}</p>

          {a.department && (
            <p><b>Department:</b> {a.department}</p>
          )}

          {a.expiryDate && (
            <p className="meta">
              Expires on: {new Date(a.expiryDate).toDateString()}
            </p>
          )}
        </div>
      ))}

      {/* ================= UPCOMING EVENTS ================= */}
      <h2>Upcoming Events</h2>

      {events.map(e => (
        <div className="event-card" key={e._id}>
          <h4>{e.title}</h4>

          {/* ✅ DESCRIPTION */}
          <p>{e.description}</p>

          <p>
            <b>Date:</b> {new Date(e.eventDate).toDateString()}
          </p>

          <p>
            <b>Venue:</b> {e.venue}
          </p>

          {/* ✅ DEPARTMENT */}
          {e.department && (
            <p>
              <b>Department:</b> {e.department}
            </p>
          )}

          {/* ✅ BROCHURE */}
          {e.brochure && (
            <p>
              <b>Brochure:</b>{" "}
              <a
                href={e.brochure}
                target="_blank"
                rel="noopener noreferrer"
              >
                View / Download
              </a>
            </p>
          )}
        </div>
      ))}

    </div>
  );
}
