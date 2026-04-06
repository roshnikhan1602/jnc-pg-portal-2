export default function EventCard({ event, onEdit, onDelete, canEdit }) {
  return (
    <div className="event-card">
      <h4>{event.title}</h4>
      <p>{event.description}</p>
      <p><b>Date:</b> {new Date(event.eventDate).toDateString()}</p>
      <p><b>Dept:</b> {event.department}</p>

      {event.brochure && (
        <a href={event.brochure} target="_blank" rel="noreferrer">
          View Brochure
        </a>
      )}

      <div className="meta">Posted by: {event.postedBy}</div>

      {canEdit && (
        <div className="card-actions">
          <button onClick={() => onEdit(event)}>Edit</button>
          <button className="delete-btn" onClick={() => onDelete(event._id)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
