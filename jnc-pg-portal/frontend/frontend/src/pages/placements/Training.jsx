import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Training.css";

export default function Training() {
  const [training, setTraining] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/training`)
      .then(res => setTraining(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!training) return <p style={{padding:"40px"}}>Loading training data...</p>;


  return (
    <div className="training-page">
      <h1>Placement Training</h1>

      <p className="intro">{training.introduction}</p>

      <h2>Skills Covered</h2>
      <ul>
        {training.skillsCovered.map((skill, i) => (
          <li key={i}>{skill}</li>
        ))}
      </ul>

      <h2>Technical Domains</h2>
      <ul>
        {training.technicalDomains.map((domain, i) => (
          <li key={i}>{domain}</li>
        ))}
      </ul>

      <h2>Semester-wise Training Plan</h2>
      {training.yearlyPlan.map((sem) => (
        <div key={sem._id} className="semester-card">
          <h3>{sem.semester}</h3>
          <p className="focus">{sem.focus}</p>
          <ul>
            {sem.topics.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
