import { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useGetFacultiesQuery } from "@/api/facultyApi";
import { useValidateAuthQuery } from "@/api/authApi";
import { useGetDepartmentsQuery } from "@/api/departmentApi";

import FacultyHeader from "@/components/faculty/FacultyHeader";
import FacultyGrid from "@/components/faculty/FacultyGrid";

const Faculty = () => {
  const { data: facultyData } = useGetFacultiesQuery();
  const { data: deptData } = useGetDepartmentsQuery();
  const { data: authData } = useValidateAuthQuery();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const facultyList = facultyData || [];
  const departmentList = deptData || [];

  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedDesignation, setSelectedDesignation] = useState("All");
  const [searchText, setSearchText] = useState("");

  /* 🔥 IMPORTANT FIX — READ URL PARAM */
  useEffect(() => {
    const deptFromUrl = searchParams.get("dept");

    if (deptFromUrl) {
      setSelectedDept(deptFromUrl);
    } else {
      setSelectedDept("All");
    }
  }, [searchParams]);

  const departments = useMemo(() => {
    return ["All", ...departmentList.map((d) => d.name)];
  }, [departmentList]);

  const designations = [
    "All",
    "Professor",
    "Associate Professor",
    "Assistant Professor",
    "HOD",
  ];

const normalize = (str) =>
  str?.toLowerCase().replace("department of", "").trim();

const filteredList = useMemo(() => {
  let list = facultyList.filter((f) => {

    if (selectedDept !== "All") {
      const selected = normalize(selectedDept);

      const deptNames = (f.departments || []).map((d) =>
        normalize(d.name)
      );

      if (!deptNames.includes(selected)) return false;
    }

    const des = f.designation?.toLowerCase() || "";

    if (selectedDesignation !== "All") {
      if (selectedDesignation === "HOD") {
        if (!des.includes("hod")) return false;
      } else if (!des.includes(selectedDesignation.toLowerCase())) {
        return false;
      }
    }

    if (searchText.trim()) {
      return f.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
    }

    return true;
  });

  list.sort((a, b) => {
    const aHOD = a.designation?.toLowerCase().includes("hod");
    const bHOD = b.designation?.toLowerCase().includes("hod");

    if (aHOD && !bHOD) return -1;
    if (!aHOD && bHOD) return 1;

    return a.name.localeCompare(b.name);
  });

  return list;
}, [facultyList, selectedDept, selectedDesignation, searchText]);

  const isAdmin = authData?.user?.role === "admin";

  return (
    <div className="min-h-screen bg-white">
      <FacultyHeader />

      {/* FILTER BAR */}
      <div className="max-w-7xl mx-auto mt-8 flex flex-wrap items-center gap-4 justify-between px-4">

        <input
          type="text"
          placeholder="Search faculty by name"
          className="border px-4 py-2 rounded w-full md:w-1/3"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select
          className="border px-4 py-2 rounded"
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
        >
          {departments.map((dept) => (
            <option key={dept}>{dept}</option>
          ))}
        </select>

        <select
          className="border px-4 py-2 rounded"
          value={selectedDesignation}
          onChange={(e) => setSelectedDesignation(e.target.value)}
        >
          {designations.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>

        {isAdmin && (
          <button
            onClick={() => navigate("/admin/faculty")}
            className="bg-[#c2185b] text-white px-5 py-2 rounded shadow"
          >
            + Add Faculty
          </button>
        )}
      </div>

      {/* 🔥 IMPORTANT DEBUG UI */}
      {selectedDept !== "All" && (
        <p className="text-center mt-4 text-sm text-gray-600">
          Showing faculty for: <b>{selectedDept}</b>
        </p>
      )}

      <FacultyGrid
        facultyList={filteredList}
        onSelectFaculty={(faculty) =>
          navigate(`/faculty/${faculty._id}`)
        }
      />
    </div>
  );
};

export default Faculty;