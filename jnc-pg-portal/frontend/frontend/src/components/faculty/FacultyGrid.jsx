import FacultyCard from "@/components/faculty/FacultyCard";

export default function FacultyGrid({ facultyList, onSelectFaculty }) {
  if (!facultyList || facultyList.length === 0) {
    return (
      <p className="p-5 text-center text-gray-600">No faculty found.</p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-y-10
          gap-x-4
          place-items-center
        "
      >
        {facultyList.map((faculty) => (
          <FacultyCard
            key={faculty._id}
            faculty={faculty}
            onSelectFaculty={onSelectFaculty}
          />
        ))}
      </div>
    </div>
  );
}
