import { useEffect, useState } from "react";
import api from "../services/api";

export default function EventForm({ refresh, editing, setEditing, role }) {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    eventDate: "",
    venue: "",
    department: "",
    postedBy: role
  });

  useEffect(() => {
    if (editing) setEvent(editing);
  }, [editing]);

  const submit = async e => {
    e.preventDefault();

    editing
      ? await api.put(`/events/${editing._id}`, event)
      : await api.post("/events", event);

    setEvent({
      title: "",
      description: "",
      eventDate: "",
      venue: "",
      department: "",
      postedBy: role
    });

    setEditing(null);
    refresh();
  };

  return (
    <form className="form" onSubmit={submit}>
      <h3>{editing ? "Edit Event" : "Add Event"}</h3>

      <input placeholder="Title" value={event.title}
        onChange={e => setEvent({ ...event, title: e.target.value })} />

      <input type="date" value={event.eventDate}
        onChange={e => setEvent({ ...event, eventDate: e.target.value })} />

      <input placeholder="Venue" value={event.venue}
        onChange={e => setEvent({ ...event, venue: e.target.value })} />

      <input placeholder="Department" value={event.department}
        onChange={e => setEvent({ ...event, department: e.target.value })} />

      <textarea placeholder="Description" value={event.description}
        onChange={e => setEvent({ ...event, description: e.target.value })} />

      <button>{editing ? "Update" : "Post"}</button>
    </form>
  );
}
