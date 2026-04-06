function AnnouncementPopup({ announcement }) {
  if (!announcement) return null;

  return (
    <div className="popup">
      <h3>{announcement.title}</h3>
      <p>{announcement.message}</p>
    </div>
  );
}

export default AnnouncementPopup;
