import { useParams, useNavigate } from "react-router-dom";
import {
  useGetFacultyByIdQuery,
  useUpdateFacultyMutation,
} from "@/api/facultyApi";
import { useGetDepartmentsQuery } from "@/api/departmentApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminEditFaculty() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: facultyData, isLoading } = useGetFacultyByIdQuery(id);
  const { data: deptData } = useGetDepartmentsQuery();

  const [updateFaculty, { isLoading: saving }] =
    useUpdateFacultyMutation();

  const [form, setForm] = useState(null);
  const [image, setImage] = useState(null);

  /* ================= LOAD INITIAL DATA ================= */
  useEffect(() => {
    if (facultyData) {
      const nameParts = facultyData.name?.split(" ") || [];

      setForm({
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        email: facultyData.email || "",
        phone: facultyData.user?.phone || "",
        designation: facultyData.designation || "",
        bio: facultyData.bio || "",
        departments: facultyData.departments?.[0]?._id || "",
      });
    }
  }, [facultyData]);

  if (isLoading || !form)
    return <p className="p-5">Loading faculty...</p>;

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();

    fd.append("firstName", form.firstName);
    fd.append("lastName", form.lastName);
    fd.append("email", form.email);
    fd.append("phone", form.phone);
    fd.append("designation", form.designation);
    fd.append("bio", form.bio);
    fd.append("departments", JSON.stringify([form.departments]));

    if (image) {
      fd.append("image", image);
    }

    try {
      await updateFaculty({ id, formData: fd }).unwrap();
      toast.success("Faculty updated successfully");
      navigate("/admin/faculty");
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  /* 🔥 CORRECT DEPARTMENTS FORMAT */
  const departments = deptData || [];

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">
        Edit Faculty (Admin)
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

        <input
          className="border p-2"
          placeholder="First Name"
          value={form.firstName}
          onChange={(e) =>
            handleChange("firstName", e.target.value)
          }
          required
        />

        <input
          className="border p-2"
          placeholder="Last Name"
          value={form.lastName}
          onChange={(e) =>
            handleChange("lastName", e.target.value)
          }
          required
        />

        <input
          className="border p-2"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            handleChange("email", e.target.value)
          }
          required
        />

        <input
          className="border p-2"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            handleChange("phone", e.target.value)
          }
          required
        />

        <input
          className="border p-2"
          placeholder="Designation"
          value={form.designation}
          onChange={(e) =>
            handleChange("designation", e.target.value)
          }
          required
        />

        <select
          className="border p-2"
          value={form.departments}
          onChange={(e) =>
            handleChange("departments", e.target.value)
          }
          required
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept._id} value={dept._id}>
              {dept.name}
            </option>
          ))}
        </select>

        {/* IMAGE SECTION */}
        <div className="col-span-2 mt-4">
          <label className="block font-medium mb-2">
            Profile Image
          </label>

          {facultyData?.image && (
            <div className="mb-3">
              <img
                src={`http://localhost:3000/uploads/${facultyData.image}`}
                className="w-32 h-32 rounded object-cover border shadow"
                alt="Faculty"
              />
            </div>
          )}

          <input
            type="file"
            className="border p-2 w-full"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {/* BIO */}
        <textarea
          className="col-span-2 border p-3"
          rows={3}
          placeholder="Bio"
          value={form.bio}
          onChange={(e) =>
            handleChange("bio", e.target.value)
          }
        />

        <button
          type="submit"
          disabled={saving}
          className="col-span-2 mt-6 px-6 py-3 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {saving ? "Saving..." : "Update Faculty"}
        </button>

      </form>
    </div>
  );
}
