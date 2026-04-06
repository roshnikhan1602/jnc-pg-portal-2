import { useParams, Link } from "react-router-dom";
import { useGetFacultyByIdQuery } from "@/api/facultyApi";
import { useValidateAuthQuery } from "@/api/authApi";

export default function FacultyProfile() {
  const { id } = useParams();

  const { data, isLoading } = useGetFacultyByIdQuery(id);
  const { data: authData } = useValidateAuthQuery();

  const f = data;
  const loggedEmail = authData?.user?.email;

  const departmentName = f?.departments?.length
    ? f.departments.map((d) => d.name).join(", ")
    : "Not Assigned";

  if (isLoading) return <p className="p-5 text-center">Loading...</p>;
  if (!f) return <p className="p-5 text-center">Faculty not found</p>;

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">

      {/* BREADCRUMB */}
      <div className="text-sm text-gray-600 mb-6">
        <Link to="/" className="text-blue-600">Home</Link> ›{" "}
        <Link to="/faculty" className="text-blue-600">Faculty</Link> ›{" "}
        <span className="font-semibold">{f.name}</span>
      </div>

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row gap-10">

        {/* LEFT */}
        <div className="w-72">
          <img
            src={
              f.image
                ? `${import.meta.env.VITE_API_URL}/uploads/${f.image}?t=${Date.now()}`
                : "/avatar.png"
            }
            className="w-full rounded mb-4"
            alt={f.name}
          />

          <div className="bg-gray-100 p-4 rounded mb-4">
            <p><strong>Academic Experience:</strong> {f.academicExperience}</p>
            <p><strong>Research Experience:</strong> {f.researchExperience}</p>
          </div>

          <div className="bg-gray-100 p-4 rounded mb-4">
            <p>
              <strong>Qualification:</strong>{" "}
              {f.qualifications?.map((q) => q.degree).join(", ")}
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded">
            <p><strong>Email:</strong> {f.email}</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex-1 bg-white shadow-md border rounded-md p-8">

          <h1 className="text-3xl font-semibold mb-2">{f.name}</h1>
          <p className="text-lg text-gray-700">{f.designation}</p>
          <p className="text-gray-500 mb-4">{departmentName}</p>

          <p className="mb-6"><strong>Email:</strong> {f.email}</p>

          {/* QUALIFICATIONS TABLE */}
          {f.qualifications?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Qualifications</h2>

              <table className="w-full border text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2">#</th>
                    <th className="border p-2">Degree</th>
                    <th className="border p-2">Subject</th>
                    <th className="border p-2">University</th>
                    <th className="border p-2">Year</th>
                  </tr>
                </thead>
                <tbody>
                  {f.qualifications.map((q, i) => (
                    <tr key={i}>
                      <td className="border p-2">{i + 1}</td>
                      <td className="border p-2">{q.degree}</td>
                      <td className="border p-2">{q.subject}</td>
                      <td className="border p-2">{q.university}</td>
                      <td className="border p-2">{q.year}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* BUTTON */}
          {loggedEmail === f.email && (
            <Link
              to="/faculty/edit-profile"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded"
            >
              Edit Profile
            </Link>
          )}
        </div>
      </div>

      {/* ABOUT */}
      {f.bio && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-2">About</h2>
          <p>{f.bio}</p>
        </div>
      )}

      {/* RESEARCH */}
      {f.researchInterests?.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-2">Research Interests</h2>
          <ul className="list-disc ml-6">
            {f.researchInterests.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* PUBLICATIONS */}
      {f.structuredPublications?.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-2">Publications</h2>
          <ul className="list-disc ml-6">
            {f.structuredPublications.map((pub, i) => (
              <li key={i}>
                <strong>{pub.title}</strong>
                {pub.journal && `, ${pub.journal}`}
                {pub.volume && `, Vol ${pub.volume}`}
                {pub.issue && `, Issue ${pub.issue}`}
                {pub.pages && `, pp.${pub.pages}`}
                {pub.year && ` (${pub.year})`}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* AWARDS */}
      {f.structuredAwards?.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-2">Awards</h2>
          <ul className="list-disc ml-6">
            {f.structuredAwards.map((a, i) => (
              <li key={i}>
                <strong>{a.title}</strong> — {a.description}
                {a.year && ` (${a.year})`}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* MEMBERSHIPS */}
      {f.structuredMemberships?.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-2">Memberships</h2>
          <ul className="list-disc ml-6">
            {f.structuredMemberships.map((m, i) => (
              <li key={i}>
                <strong>{m.role}</strong>, {m.organization}
                {m.year && ` (${m.year})`}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="my-20" />
    </div>
  );
}