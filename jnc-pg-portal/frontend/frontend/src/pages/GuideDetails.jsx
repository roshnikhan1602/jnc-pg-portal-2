import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

/* ================= API ================= */
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

/* ================= SLUG MAP ================= */
const slugToDepartmentMap = {
  "computer-science": "Department of Computer Science",
  "management": "Department of Management",
  "chemistry": "Department of Chemistry",
  "biological-sciences": "Department of Biological Sciences",
  "mathematics": "Department of Mathematics",
  "english": "Department of English",
  "psychology": "Department of Psychology",
};

export default function GuideDetails() {
  const { dept, slug } = useParams();

  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);

  const departmentName = slugToDepartmentMap[dept];

  /* ================= FETCH ================= */
  useEffect(() => {
    if (!departmentName) return;

    fetchGuide();
  }, [dept, slug]);

  const fetchGuide = async () => {
    try {
      const res = await api.get(`/research/${departmentName}`);

      const found = res.data?.guides?.find(
        (g) => g.slug === slug
      );

      setGuide(found || null);
    } catch (err) {
      console.error(err);
      setGuide(null);
    } finally {
      setLoading(false);
    }
  };

  /* ================= STATES ================= */
  if (loading) return <p style={{ padding: 40 }}>Loading...</p>;

  if (!guide) {
    return <p style={{ padding: 40 }}>Guide not found</p>;
  }

  /* ================= UI ================= */
  return (
    <div className="guide-page">

      {/* HEADER */}
      <div className="guide-header">
        {departmentName}
      </div>

      {/* PROFILE */}
      <div className="guide-profile">

        <img
          src={`http://localhost:3000${guide.image}`}
          alt={guide.name}
        />

        <div className="guide-profile-right">
          <h2>{guide.name}</h2>
          <h4>{guide.designation}</h4>

          {/* DEGREE TABLE */}
          <table className="degree-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Degree</th>
                <th>Subject</th>
                <th>University, Year</th>
              </tr>
            </thead>

            <tbody>
              {guide.degrees?.map((d, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{d.degree}</td>
                  <td>{d.subject}</td>
                  <td>{d.university}, {d.year}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* EXPERIENCE */}
          <div className="experience-box">
            <p><strong>Academic Experience:</strong> {guide.academicExperience || "N/A"}</p>
            <p><strong>Research Experience:</strong> {guide.researchExperience || "N/A"}</p>
            <p><strong>Email:</strong> {guide.email || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* SECTIONS */}
      <Section title="RESEARCH INTERESTS" items={guide.researchInterests} />
      <Section title="PUBLICATIONS" items={guide.publications} />
      <Section title="CONFERENCE PUBLICATIONS" items={guide.conferencePublications} />
      <Section title="PAPERS PRESENTED" items={guide.papersPresented} />
      <Section title="AWARDS / ACHIEVEMENTS" items={guide.awards} />
      <Section title="MEMBERSHIPS" items={guide.memberships} />

    </div>
  );
}

/* ================= SECTION COMPONENT ================= */
function Section({ title, items }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="guide-section">
      <div className="guide-section-title">{title}</div>

      <div className="guide-section-body">
        <ul>
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}