import { useParams } from "react-router-dom";
import { useGetFacultiesQuery } from "@/api/facultyApi";
import { useGetDepartmentsQuery } from "@/api/departmentApi";

export default function DepartmentFaculty() {
  const { deptId } = useParams();  

  const { data: faculties, isLoading: facLoading } = useGetFacultiesQuery();
  const { data: deptData, isLoading: deptLoading } = useGetDepartmentsQuery();

  if (facLoading || deptLoading) return <p className="p-5">Loading…</p>;

  const departments = deptData?.departments || [];
  const facultyList = faculties || [];

  const selectedDept = departments.find((d) => d._id === deptId);

  const filteredFaculty = facultyList.filter((f) =>
    f.departments?.some((dep) => dep._id === deptId)
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        {selectedDept ? selectedDept.name : "Department"} Faculty
      </h1>

      {filteredFaculty.length === 0 ? (
        <p className="text-gray-600">No faculty found in this department.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredFaculty.map((faculty) => (
            <div
              key={faculty._id}
              className="shadow rounded border overflow-hidden bg-white"
            >
              <img
                src={`/uploads/${faculty.image}`}
                alt={faculty.name}
                className="w-full h-56 object-cover"
              />

              <div className="p-4">
                <h2 className="text-lg font-semibold">{faculty.name}</h2>
                <p className="text-sm text-gray-600">
                  {faculty.designation}
                </p>

                <a
                  href={`/faculty/${faculty._id}`}
                  className="text-blue-600 text-sm mt-3 inline-block"
                >
                  View Profile →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
