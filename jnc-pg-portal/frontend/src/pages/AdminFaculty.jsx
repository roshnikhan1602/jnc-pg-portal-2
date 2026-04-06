import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  useGetFacultiesQuery,
  useDeleteFacultyMutation,
  useAddFacultyMutation,
} from "@/api/facultyApi";
import { useGetDepartmentsQuery } from "@/api/departmentApi";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import toast from "react-hot-toast";

export default function AdminFaculty() {
  const navigate = useNavigate();

  const { data: facultyList, refetch } = useGetFacultiesQuery();
  const { data: departments = [] } = useGetDepartmentsQuery();

  const [deleteFaculty] = useDeleteFacultyMutation();
  const [addFaculty] = useAddFacultyMutation();

  const [showModal, setShowModal] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  const faculties = facultyList || [];

  /* ================= ADD FORM STATE ================= */
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    designation: "",
    departments: "",
    bio: "",
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleAddFaculty = async (e) => {
    e.preventDefault();

    if (!form.departments) {
      toast.error("Please select department");
      return;
    }

    const fd = new FormData();

    fd.append("firstName", form.firstName);
    fd.append("lastName", form.lastName);
    fd.append("email", form.email);
    fd.append("phone", form.phone);
    fd.append("password", form.password);
    fd.append("designation", form.designation);
    fd.append("departments", JSON.stringify([form.departments]));
    fd.append("bio", form.bio);

    if (form.image) {
      fd.append("image", form.image);
    }

    try {
      await addFaculty(fd).unwrap();
      toast.success("Faculty created successfully");

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        designation: "",
        departments: "",
        bio: "",
        image: null,
      });

      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Error creating faculty");
    }
  };

  /* ================= DEPARTMENT DISPLAY ================= */
  const getDeptName = (faculty) => {
    return faculty.departments?.length
      ? faculty.departments.map((d) => d.name).join(", ")
      : "N/A";
  };

  return (
    <div className="max-w-5xl mx-auto p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Admin – Faculty Management
        </h1>

        <button
          onClick={() => navigate("/faculty")}
          className="text-gray-600 hover:text-[#c2185b] transition font-medium"
        >
          ← Back to Faculty Page
        </button>
      </div>

      {/* ================= ADD FACULTY FORM ================= */}
      <div className="border p-6 rounded mb-10 shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-4">Add Faculty</h2>

        <form onSubmit={handleAddFaculty} className="grid grid-cols-2 gap-4">
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="border p-2 rounded"
            required
          />

          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="border p-2 rounded"
            required
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 rounded"
            required
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border p-2 rounded"
            required
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="border p-2 rounded"
            required
          />

          <input
            name="designation"
            value={form.designation}
            onChange={handleChange}
            placeholder="Designation"
            className="border p-2 rounded"
            required
          />

          <select
            name="departments"
            value={form.departments}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="Bio"
            className="border p-2 col-span-2 rounded"
            rows={3}
          />

          <button
            type="submit"
            className="col-span-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
          >
            Add Faculty
          </button>
        </form>
      </div>

      {/* ================= EXISTING FACULTY ================= */}
      <h2 className="text-xl font-semibold mb-4">
        Existing Faculty
      </h2>

      {faculties.length === 0 && (
        <p className="text-gray-600">No faculty added yet.</p>
      )}

      {faculties.map((faculty) => (
        <div
          key={faculty._id}
          className="flex justify-between items-center border p-4 mb-3 rounded bg-white shadow-sm"
        >
          <div>
            <p className="font-semibold">{faculty.name}</p>
            <p className="text-sm text-gray-600">
              {faculty.designation} — {getDeptName(faculty)}
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              to={`/admin/faculty/edit/${faculty._id}`}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition"
            >
              Edit
            </Link>

            <button
              onClick={() => {
                setSelectedFaculty(faculty);
                setShowModal(true);
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      <ConfirmDeleteModal
        open={showModal}
        name={selectedFaculty?.name}
        onCancel={() => setShowModal(false)}
        onConfirm={async () => {
          await deleteFaculty(selectedFaculty._id);
          setShowModal(false);
          refetch();
        }}
      />
    </div>
  );
}
