import { useState } from "react";
import api from "../services/api";

export default function GalleryForm({ role }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState("");

  const submitGallery = async () => {
    await api.post("/event-gallery", {
      title,
      description,
      images: images.split(","), // comma separated URLs
      postedBy: role
    });

    alert("Event images added successfully 🎉");

    setTitle("");
    setDescription("");
    setImages("");
  };

  return (
    <div className="left-panel">
      <h3>Add Event Gallery</h3>

      <input
        placeholder="Event Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Event Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <textarea
        placeholder="Image URLs (comma separated)"
        value={images}
        onChange={e => setImages(e.target.value)}
      />

      <button onClick={submitGallery}>Upload Event Images</button>
    </div>
  );
}
