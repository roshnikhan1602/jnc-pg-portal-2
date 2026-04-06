import { useEffect, useState } from "react";
import api from "../services/api";

export default function FacultyDashboard() {
const [events, setEvents] = useState([]);
const [anns, setAnns] = useState([]);
const [user, setUser] = useState(null);

const [editingEventId, setEditingEventId] = useState(null);
const [editingAnnId, setEditingAnnId] = useState(null);

const [form, setForm] = useState({
title: "",
eventDate: "",
venue: "",
department: "",
brochure: "",
description: ""
});

const [ann, setAnn] = useState({
title: "",
message: "",
department: "",
expiryDate: ""
});

useEffect(() => {
loadData();
getUser();
}, []);

const getUser = async () => {
try {
const res = await api.get("/auth/validate", { withCredentials: true });
setUser(res.data.user);
} catch {
alert("Please login again");
}
};

const loadData = async () => {
try {
setEvents((await api.get("/events", { withCredentials: true })).data);
setAnns((await api.get("/announcements", { withCredentials: true })).data);
} catch (err) {
handleError(err);
}
};

const handleError = (err) => {
if (err.response?.status === 403) {
alert("You do not have permission");
} else if (err.response?.status === 401) {
alert("Please login again");
} else {
alert("Something went wrong");
}
};

const canModify = (item) => {
if (!user) return false;
if (user.role === "admin") return true;
return item.createdBy === user._id;
};

const submitEvent = async () => {
try {
if (editingEventId) {
await api.put(`/events/${editingEventId}`, form, { withCredentials: true });
setEditingEventId(null);
} else {
await api.post(
"/events",
{ ...form, postedBy: "faculty" },
{ withCredentials: true }
);
}

  setForm({
    title: "",
    eventDate: "",
    venue: "",
    department: "",
    brochure: "",
    description: ""
  });

  loadData();
} catch (err) {
  handleError(err);
}


};

const editEvent = (e) => {
if (!canModify(e)) return alert("Not allowed");


setEditingEventId(e._id);
setForm({
  title: e.title,
  eventDate: e.eventDate?.substring(0, 10),
  venue: e.venue,
  department: e.department,
  brochure: e.brochure,
  description: e.description
});


};

const deleteEvent = async (id, item) => {
if (!canModify(item)) return alert("Not allowed");


if (!window.confirm("Delete this event?")) return;

try {
  await api.delete(`/events/${id}`, { withCredentials: true });
  loadData();
} catch (err) {
  handleError(err);
}


};

const submitAnn = async () => {
try {
if (editingAnnId) {
await api.put(`/announcements/${editingAnnId}`, ann, {
withCredentials: true
});
setEditingAnnId(null);
} else {
await api.post(
"/announcements",
{ ...ann, postedBy: "faculty" },
{ withCredentials: true }
);
}

  setAnn({
    title: "",
    message: "",
    department: "",
    expiryDate: ""
  });

  loadData();
} catch (err) {
  handleError(err);
}


};

const editAnn = (a) => {
if (!canModify(a)) return alert("Not allowed");


setEditingAnnId(a._id);
setAnn({
  title: a.title,
  message: a.message,
  department: a.department,
  expiryDate: a.expiryDate?.substring(0, 10)
});


};

const deleteAnn = async (id, item) => {
if (!canModify(item)) return alert("Not allowed");


if (!window.confirm("Delete this announcement?")) return;

try {
  await api.delete(`/announcements/${id}`, {
    withCredentials: true
  });
  loadData();
} catch (err) {
  handleError(err);
}


};

return ( <div className="page-container"> <h2>Faculty Event Coordinator</h2>


  <div className="dashboard-layout">

    <div className="left-panel">

      <h3>{editingEventId ? "Edit Event" : "Add Event"}</h3>

      <input placeholder="Title" value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })} />

      <input type="date" value={form.eventDate}
        onChange={(e) => setForm({ ...form, eventDate: e.target.value })} />

      <input placeholder="Venue" value={form.venue}
        onChange={(e) => setForm({ ...form, venue: e.target.value })} />

      <input placeholder="Department" value={form.department}
        onChange={(e) => setForm({ ...form, department: e.target.value })} />

      <input placeholder="Brochure URL" value={form.brochure}
        onChange={(e) => setForm({ ...form, brochure: e.target.value })} />

      <textarea placeholder="Description" value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })} />

      <button onClick={submitEvent}>
        {editingEventId ? "Update Event" : "Post Event"}
      </button>

      <h3 style={{ marginTop: 30 }}>
        {editingAnnId ? "Edit Announcement" : "Add Announcement"}
      </h3>

      <input placeholder="Title" value={ann.title}
        onChange={(e) => setAnn({ ...ann, title: e.target.value })} />

      <textarea placeholder="Message" value={ann.message}
        onChange={(e) => setAnn({ ...ann, message: e.target.value })} />

      <input placeholder="Department" value={ann.department}
        onChange={(e) => setAnn({ ...ann, department: e.target.value })} />

      <input type="date" value={ann.expiryDate}
        onChange={(e) => setAnn({ ...ann, expiryDate: e.target.value })} />

      <button onClick={submitAnn}>
        {editingAnnId ? "Update Announcement" : "Publish"}
      </button>

    </div>

    <div className="right-panel">

      <h3>Events</h3>

      {events.map((e) => (
        <div className="card" key={e._id}>
          <h4>{e.title}</h4>
          <p>{e.description}</p>
          <p><b>Date:</b> {new Date(e.eventDate).toDateString()}</p>

          <div className="card-actions">
            {canModify(e) && (
              <>
                <button onClick={() => editEvent(e)}>Edit</button>
                <button onClick={() => deleteEvent(e._id, e)}>Delete</button>
              </>
            )}
          </div>
        </div>
      ))}

      <h3>Announcements</h3>

      {anns.map((a) => (
        <div className="announcement-card" key={a._id}>
          <h4>{a.title}</h4>
          <p>{a.message}</p>

          <p>
            <b>Expiry Date:</b>{" "}
            {a.expiryDate
              ? new Date(a.expiryDate).toDateString()
              : "Not specified"}
          </p>

          <div className="card-actions">
            {canModify(a) && (
              <>
                <button onClick={() => editAnn(a)}>Edit</button>
                <button onClick={() => deleteAnn(a._id, a)}>Delete</button>
              </>
            )}
          </div>
        </div>
      ))}

    </div>

  </div>
</div>


);
}
