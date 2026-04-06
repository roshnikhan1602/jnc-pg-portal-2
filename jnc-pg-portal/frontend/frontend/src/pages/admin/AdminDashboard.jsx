import { useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export default function AdminDashboardR() {
  const [dept, setDept] = useState("");

  const [fees, setFees] = useState({
    tuition: "",
    admission: "",
    exam: "",
  });

  const [pg, setPg] = useState({
    vision: "",
    mission: "",
    objectives: "",
    outcomes: "",
  });

  /* ================= SAVE FEES ================= */
  const saveFees = async () => {
    try {
      await api.post("/fees", {
        department: dept,
        courses: fees,
      });

      alert("Fees saved ✅");
    } catch {
      alert("Failed");
    }
  };

  /* ================= SAVE PG ================= */
  const savePG = async () => {
    try {
      await api.post("/postgraduate", {
        department: dept,
        ...pg,
      });

      alert("PG saved ✅");
    } catch {
      alert("Failed");
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-10">

      <h1 className="text-2xl font-bold">Admin Panel</h1>

      {/* ================= DEPARTMENT ================= */}
      <div>
        <label className="font-semibold">Select Department</label>

        <select
          className="w-full border p-2 rounded mt-2"
          value={dept}
          onChange={(e) => setDept(e.target.value)}
        >
          <option value="">Select</option>
          <option>Department of Computer Science</option>
          <option>Department of Management</option>
          <option>Department of Chemistry</option>
          <option>Department of English</option>
          <option>Department of Biological Sciences</option>
          <option>Department of Mathematics</option>
          <option>Department of Psychology</option>
          <option>Department of Commerce</option>
        </select>
      </div>

      {/* ================= FEES ================= */}
      <div className="bg-white shadow p-5 rounded space-y-3">
        <h2 className="text-xl font-semibold">Fee Structure</h2>

        <input
          placeholder="Tuition Fee"
          className="input"
          value={fees.tuition}
          onChange={(e) => setFees({ ...fees, tuition: e.target.value })}
        />

        <input
          placeholder="Admission Fee"
          className="input"
          value={fees.admission}
          onChange={(e) => setFees({ ...fees, admission: e.target.value })}
        />

        <input
          placeholder="Exam Fee"
          className="input"
          value={fees.exam}
          onChange={(e) => setFees({ ...fees, exam: e.target.value })}
        />

        <button className="btn" onClick={saveFees}>
          Save Fees
        </button>
      </div>

      {/* ================= PG ================= */}
      <div className="bg-white shadow p-5 rounded space-y-3">
        <h2 className="text-xl font-semibold">Postgraduate</h2>

        <textarea
          placeholder="Vision"
          className="input"
          value={pg.vision}
          onChange={(e) => setPg({ ...pg, vision: e.target.value })}
        />

        <textarea
          placeholder="Mission"
          className="input"
          value={pg.mission}
          onChange={(e) => setPg({ ...pg, mission: e.target.value })}
        />

        <textarea
          placeholder="Objectives"
          className="input"
          value={pg.objectives}
          onChange={(e) => setPg({ ...pg, objectives: e.target.value })}
        />

        <textarea
          placeholder="Outcomes (comma separated)"
          className="input"
          value={pg.outcomes}
          onChange={(e) => setPg({ ...pg, outcomes: e.target.value })}
        />

        <button className="btn" onClick={savePG}>
          Save PG
        </button>
      </div>

    </div>
  );
}