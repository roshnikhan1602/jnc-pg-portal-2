import { useState } from "react";
import api from "../services/api";

export default function AnnouncementForm({ refresh, role }) {
  const [a, setA] = useState({
    title: "",
    message: "",
    department: "",
    postedBy: role
  });

  const submit = async e => {
    e.preventDefault();
    await api.post("/announcements", a);
    setA({ title: "", message: "", department: "", postedBy: role });
    refresh();
  };

  return (
    <form className="form" onSubmit={submit}>
      <h3>Add Announcement</h3>
      <input placeholder="Title" value={a.title}
        onChange={e => setA({ ...a, title: e.target.value })} />
      <textarea placeholder="Message" value={a.message}
        onChange={e => setA({ ...a, message: e.target.value })} />
      <input placeholder="Department" value={a.department}
        onChange={e => setA({ ...a, department: e.target.value })} />
      <button>Publish</button>
    </form>
  );
}
