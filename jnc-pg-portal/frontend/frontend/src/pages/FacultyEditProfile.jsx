import { Tab } from "@headlessui/react";
import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from "@/api/facultyApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FacultyEditProfile() {
  const { data } = useGetMyProfileQuery();
  const [updateProfile, { isLoading: saving }] =
    useUpdateMyProfileMutation();

  const [form, setForm] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    if (data) {
      setForm({
        bio: data.bio || "",
        academicExperience: data.academicExperience || "",
        researchExperience: data.researchExperience || "",
        qualifications: data.qualifications || [],
        researchInterests: data.researchInterests || [],
        structuredPublications: data.structuredPublications || [],
        structuredAwards: data.structuredAwards || [],
        structuredMemberships: data.structuredMemberships || [],
        image: data.image || "",
      });
    }
  }, [data]);

  if (!form) return <p>Loading...</p>;

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const addItem = (field, obj) => {
    setForm((prev) => ({
      ...prev,
      [field]: [...prev[field], obj],
    }));
  };

  const removeItem = (field, index) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const updateField = (field, index, key, value) => {
    const updated = [...form[field]];
    updated[index][key] = value;
    setForm((prev) => ({ ...prev, [field]: updated }));
  };

  const saveProfile = async () => {
    const fd = new FormData();

    // ✅ FIXED ARRAY HANDLING (ONLY CHANGE)
    Object.keys(form).forEach((key) => {
      if (Array.isArray(form[key])) {
        fd.append(key, JSON.stringify(form[key]));
      } else {
        fd.append(key, form[key] || "");
      }
    });

    if (photoFile) fd.append("image", photoFile);

    await updateProfile(fd);
    alert("Saved!");
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">

      {/* BREADCRUMB */}
      <div className="text-sm mb-6">
        <Link to="/" className="text-blue-600 hover:underline">Home</Link> ›{" "}
        <Link to="/faculty" className="text-blue-600 hover:underline">Faculty</Link> ›{" "}
        <Link to={`/faculty/${data?._id}`} className="text-blue-600 hover:underline">
          {data?.name}
        </Link> ›{" "}
        <span className="font-semibold">Edit Profile</span>
      </div>

      {/* PHOTO */}
      <div className="mb-6">
        <img
          src={
            form.image
              ? `http://localhost:3000/uploads/${form.image}`
              : "/avatar.png"
          }
          className="w-32 h-32 rounded mb-2"
        />
        <input type="file" onChange={(e) => setPhotoFile(e.target.files[0])} />
      </div>

      <Tab.Group>
        <Tab.List className="flex gap-6 border-b mb-6 text-sm font-medium">
          {["About", "Experience", "Qualifications", "Research", "Publications", "Awards", "Memberships"].map((t) => (
            <Tab key={t} className={({ selected }) =>
              selected ? "border-b-2 border-blue-600 pb-2" : "pb-2 text-gray-500"
            }>
              {t}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>

          {/* ABOUT */}
          <Tab.Panel>
            <textarea
              className="w-full border p-3 rounded"
              rows={5}
              value={form.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
            />
          </Tab.Panel>

          {/* EXPERIENCE */}
          <Tab.Panel>
            <textarea
              placeholder="Academic Experience"
              className="w-full border p-3 mb-3 rounded"
              value={form.academicExperience}
              onChange={(e) => handleChange("academicExperience", e.target.value)}
            />
            <textarea
              placeholder="Research Experience"
              className="w-full border p-3 rounded"
              value={form.researchExperience}
              onChange={(e) => handleChange("researchExperience", e.target.value)}
            />
          </Tab.Panel>

          {/* QUALIFICATIONS */}
          <Tab.Panel>
            {form.qualifications.map((q, i) => (
              <div key={i} className="border p-3 mb-3 rounded">
                {["degree", "subject", "university", "year"].map((f) => (
                  <input
                    key={f}
                    placeholder={f}
                    className="border p-2 w-full mb-2 rounded"
                    value={q[f] || ""}
                    onChange={(e) =>
                      updateField("qualifications", i, f, e.target.value)
                    }
                  />
                ))}
                <button onClick={() => removeItem("qualifications", i)} className="text-red-500 text-sm">
                  Delete
                </button>
              </div>
            ))}
            <button onClick={() => addItem("qualifications", { degree:"", subject:"", university:"", year:"" })} className="text-blue-600">
              + Add Qualification
            </button>
          </Tab.Panel>

          {/* RESEARCH */}
          <Tab.Panel>
            <input
              className="border p-2 w-full rounded"
              placeholder="Press Enter to add"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (!e.target.value.trim()) return;
                  addItem("researchInterests", e.target.value);
                  e.target.value = "";
                }
              }}
            />
            <ul className="mt-3 space-y-2">
              {form.researchInterests.map((r, i) => (
                <li key={i} className="flex justify-between border px-3 py-1 rounded">
                  {r}
                  <button onClick={() => removeItem("researchInterests", i)} className="text-red-500 text-sm">
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </Tab.Panel>

          {/* PUBLICATIONS */}
          <Tab.Panel>
            {form.structuredPublications.map((p, i) => (
              <div key={i} className="border p-3 mb-3 rounded">
                {["title","journal","volume","issue","pages","month","year"].map((f) => (
                  <input
                    key={f}
                    placeholder={f}
                    className="border p-2 w-full mb-2 rounded"
                    value={p[f] || ""}
                    onChange={(e)=>updateField("structuredPublications",i,f,e.target.value)}
                  />
                ))}
                <button onClick={() => removeItem("structuredPublications", i)} className="text-red-500 text-sm">
                  Delete
                </button>
              </div>
            ))}
            <button onClick={() => addItem("structuredPublications", {})} className="text-blue-600">
              + Add Publication
            </button>
          </Tab.Panel>

          {/* AWARDS */}
          <Tab.Panel>
            {form.structuredAwards.map((a, i) => (
              <div key={i} className="border p-3 mb-3 rounded">
                <input className="border p-2 w-full mb-2 rounded" placeholder="Title" value={a.title||""} onChange={(e)=>updateField("structuredAwards",i,"title",e.target.value)} />
                <input className="border p-2 w-full mb-2 rounded" placeholder="Description" value={a.description||""} onChange={(e)=>updateField("structuredAwards",i,"description",e.target.value)} />
                <input className="border p-2 w-full mb-2 rounded" placeholder="Year" value={a.year||""} onChange={(e)=>updateField("structuredAwards",i,"year",e.target.value)} />
                <button onClick={() => removeItem("structuredAwards", i)} className="text-red-500 text-sm">
                  Delete
                </button>
              </div>
            ))}
            <button onClick={() => addItem("structuredAwards", {})} className="text-blue-600">
              + Add Award
            </button>
          </Tab.Panel>

          {/* MEMBERSHIPS */}
          <Tab.Panel>
            {form.structuredMemberships.map((m, i) => (
              <div key={i} className="border p-3 mb-3 rounded">
                <input className="border p-2 w-full mb-2 rounded" placeholder="Role" value={m.role||""} onChange={(e)=>updateField("structuredMemberships",i,"role",e.target.value)} />
                <input className="border p-2 w-full mb-2 rounded" placeholder="Organization" value={m.organization||""} onChange={(e)=>updateField("structuredMemberships",i,"organization",e.target.value)} />
                <input className="border p-2 w-full mb-2 rounded" placeholder="Year" value={m.year||""} onChange={(e)=>updateField("structuredMemberships",i,"year",e.target.value)} />
                <button onClick={() => removeItem("structuredMemberships", i)} className="text-red-500 text-sm">
                  Delete
                </button>
              </div>
            ))}
            <button onClick={() => addItem("structuredMemberships", {})} className="text-blue-600">
              + Add Membership
            </button>
          </Tab.Panel>

        </Tab.Panels>
      </Tab.Group>

      <button onClick={saveProfile} className="mt-6 bg-blue-600 text-white px-6 py-2 rounded">
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}