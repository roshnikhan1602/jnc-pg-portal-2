import { useState, useEffect } from "react";
import "./Gallery.css";
import api from "../../api/axios";

function groupImages(images) {
  const groups = {};
  images.forEach((img) => {
    const company = (img.company || "").trim();
    const year = (img.year || "").trim();
    const key = (company || year) ? `${company}${company && year ? " " : ""}${year}` : "Uncategorized";
    if (!groups[key]) groups[key] = [];
    groups[key].push(img);
  });
  return groups;
}

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalList, setModalList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openGroups, setOpenGroups] = useState({});

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    try {
      const res = await api.get("/gallery");
      const imgs = res.data || [];
      setImages(imgs);
      const groups = Object.keys(groupImages(imgs));
      if (groups.length) setOpenGroups({ [groups[0]]: true });
    } catch (err) {
      console.error(err);
    }
  }

  function openModal(list, index) {
    setModalList(list);
    setActiveIndex(index);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function prev() {
    setActiveIndex((i) => (i - 1 + modalList.length) % modalList.length);
  }

  function next() {
    setActiveIndex((i) => (i + 1) % modalList.length);
  }

  function toggleGroup(key) {
    setOpenGroups((s) => ({ ...s, [key]: !s[key] }));
  }

  const groups = groupImages(images);

  return (
    <div className="gallery-page">
      <h2 className="gallery-title">Gallery</h2>

      {Object.entries(groups).map(([groupKey, items]) => (
        <div className="gallery-group" key={groupKey}>
          <button className="group-header" onClick={() => toggleGroup(groupKey)}>
            <span className="group-title">{groupKey}</span>
            <span className={`chev ${openGroups[groupKey] ? "open" : ""}`}>▾</span>
          </button>

          {openGroups[groupKey] && (
            <div className="gallery-grid group-grid">
              {items.map((img, i) => {
                const base = api.defaults.baseURL.replace(/\/api\/?$/, "");
                const src = img.path && img.path.match(/^https?:/) ? img.path : `${base}${img.path}`;
                return (
                  <button key={img._id || i} className="gallery-item" onClick={() => openModal(items, i)}>
                    <img src={src} alt={img.caption || `${groupKey} ${i + 1}`} loading="lazy" />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}

      {modalOpen && modalList.length > 0 && (
        <div className="gallery-modal" role="dialog" aria-modal="true">
          <button className="modal-close" onClick={closeModal} aria-label="Close">×</button>
          <button className="modal-prev" onClick={prev} aria-label="Previous">‹</button>
          {(() => {
            const img = modalList[activeIndex];
            const base = api.defaults.baseURL.replace(/\/api\/?$/, "");
            const src = img.path && img.path.match(/^https?:/) ? img.path : `${base}${img.path}`;
            return <img className="modal-image" src={src} alt={img.caption || `Large view ${activeIndex + 1}`} />;
          })()}
          <button className="modal-next" onClick={next} aria-label="Next">›</button>
        </div>
      )}
    </div>
  );
}
