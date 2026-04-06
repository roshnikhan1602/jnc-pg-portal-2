import api from "../services/api";

export default function EventList({ events, refresh, canEdit, setEditing }) {
  return events.map(e => (
    <div className="card" key={e._id}>
      <h4>{e.title}</h4>
      <p>{e.description}</p>

      <p><b>Date:</b> {new Date(e.eventDate).toDateString()}</p>
      <p><b>Venue:</b> {e.venue}</p>
      <p><b>Department:</b> {e.department}</p>
      <p><b>Posted By:</b> {e.postedBy}</p>

      {canEdit && (
        <div className="action-row">
          <button onClick={() => setEditing(e)}>Edit</button>
          <button
            className="danger"
            onClick={async () => {
              await api.delete(`/events/${e._id}`);
              refresh();
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  ));
}
