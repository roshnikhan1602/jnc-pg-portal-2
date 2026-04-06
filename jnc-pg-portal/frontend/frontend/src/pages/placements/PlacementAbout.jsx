import { useEffect, useState } from "react";

export default function PlacementAbout() {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/placement-about`)
      .then(res => res.json())
      .then(data => setAbout(data));
  }, []);

  if (!about) return <p>Loading...</p>;


return (
  <div className="about-page">
<h1 className="text-center text-shadow-gray-300">ABOUT PLACEMENT DEPARTMENT</h1>
    {/* HERO SECTION */}
    <div className="about-hero">
      <h1>{about.title}</h1>
      <p>{about.description}</p>
    </div>

    {/* HIGHLIGHTS */}
    <div className="about-section">
      <h2>Key Highlights</h2>
      <div className="highlight-grid">
        {about.highlights?.map((item, i) => (
          <div key={i} className="highlight-card">
            {item}
          </div>
        ))}
      </div>
    </div>

    {/* COORDINATOR */}
    <div className="about-section coordinator-section">
      <h2>Placement Coordinator</h2>

      <div className="coordinator-card">
        <img
          src={`${import.meta.env.VITE_API_URL}/${about.coordinator.image}`}
          alt={about.coordinator.name}
        />

        <div className="coordinator-info">
          <h3>{about.coordinator.name}</h3>
          <p className="role">{about.coordinator.designation}</p>

          <div className="contact">
            <p><strong>Email:</strong> {about.coordinator.email}</p>
            <p><strong>Phone:</strong> {about.coordinator.phone}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
);
}
