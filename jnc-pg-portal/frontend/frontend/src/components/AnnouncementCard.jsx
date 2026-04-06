export default function AnnouncementCard({ ann, onEdit, onDelete, canEdit }) {
  return (
    <div className="card">
      <h3>{ann.title}</h3>
      <p>{ann.message}</p>

      <p><b>Dept:</b> {ann.department || "General"}</p>
      <p>
        <b>Expires on:</b>{" "}
        {ann.expiryDate
          ? new Date(ann.expiryDate).toDateString()
          : "No expiry"}
      </p>

      <p className="posted">Posted by: {ann.postedBy}</p>

      {canEdit && (
        <div className="card-actions">
          <button onClick={() => onEdit(ann)}>Edit</button>
          <button onClick={() => onDelete(ann._id)}>Delete</button>
        </div>
      )}
    </div>
  );
}
