import { useParams } from "react-router-dom";
import { useGetFacultyByIdQuery } from "@/api/facultyApi";

export default function FacultyDetails() {
  const { id } = useParams();
  const { data: faculty, isLoading } = useGetFacultyByIdQuery(id);

  if (isLoading || !faculty) return <p className="p-5">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        
        {/* IMAGE */}
        <img
          src={`/uploads/${faculty.image}`}
          alt={faculty.name}
          className="w-48 h-48 object-cover rounded shadow"
        />

        {/* BASIC INFO */}
        <div>
          <h1 className="text-3xl font-bold">{faculty.name}</h1>
          <p className="text-lg text-gray-700">{faculty.designation}</p>
          <p className="text-gray-600">
            {faculty.departments?.[0]?.name || "Department Not Assigned"}
          </p>

          {faculty.email && (
            <p className="mt-2 text-blue-600">{faculty.email}</p>
          )}
        </div>
      </div>

      {/* BIO */}
      {faculty.bio && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Biography</h2>
          <p className="text-gray-700">{faculty.bio}</p>
        </div>
      )}

      {/* QUALIFICATIONS */}
      {faculty.qualifications?.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Qualifications</h2>
          <ul className="list-disc ml-6 text-gray-700">
            {faculty.qualifications.map((q, i) => (
              <li key={i}>
                {q.degree} — {q.subject} ({q.university}, {q.year})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* RESEARCH INTERESTS */}
      {faculty.researchInterests?.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Research Interests</h2>
          <ul className="list-disc ml-6 text-gray-700">
            {faculty.researchInterests.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* PUBLICATIONS */}
      {faculty.publications?.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Publications</h2>
          <ul className="list-disc ml-6 text-gray-700">
            {faculty.publications.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* ACHIEVEMENTS */}
      {faculty.awardsAchievements?.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Awards & Achievements</h2>
          <ul className="list-disc ml-6 text-gray-700">
            {faculty.awardsAchievements.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* MEMBERSHIPS */}
      {faculty.memberships?.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Memberships</h2>
          <ul className="list-disc ml-6 text-gray-700">
            {faculty.memberships.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
