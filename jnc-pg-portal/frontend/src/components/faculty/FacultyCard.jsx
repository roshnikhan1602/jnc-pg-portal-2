const FacultyCard = ({ faculty, onSelectFaculty }) => {
  const isHOD =
    faculty.designation?.toLowerCase().includes("hod") ||
    faculty.designation?.toLowerCase().includes("head");

  const deptNames =
    faculty.departments?.map((d) => d.name).join(", ") || "Not Assigned";

  return (
    <div
      onClick={() => onSelectFaculty(faculty)}
      className="
        relative                /* ⭐ REQUIRED FOR HOD BADGE */
        bg-white 
        border 
        rounded-lg 
        shadow 
        hover:shadow-lg 
        transition 
        cursor-pointer
        w-[240px] 
        mx-auto 
        text-center
      "
    >
      {/* ========= IMAGE (NO ZOOM) ========= */}
      <div className="w-full bg-white flex items-center justify-center p-4 rounded-t-lg">
        {faculty.image ? (
          <img
            src={`${import.meta.env.VITE_API_URL}/uploads/${faculty.image}`}
            alt={faculty.name}
            className="max-h-[220px] max-w-[180px] object-contain"
          />
        ) : (
          <div className="text-gray-500 text-sm">No Image</div>
        )}
      </div>

      {/* ========= HOD BADGE (NOW CORRECT POSITION) ========= */}
      {isHOD && (
        <span className="absolute top-2 left-2 bg-[#E91E63] text-white text-[10px] font-semibold px-2 py-1 rounded">
          HOD
        </span>
      )}

      {/* ========= CONTENT ========= */}
      <div className="p-4">
        <h3 className="text-[14px] font-semibold text-[#2F2F6F] leading-tight">
          {faculty.name}
        </h3>

        <p className="text-[12px] text-gray-700 mt-1">{faculty.designation}</p>

        <p className="text-[12px] text-gray-600 mt-1">{deptNames}</p>

        {/* ========= VIEW PROFILE BUTTON (NOW SHOWING) ========= */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelectFaculty(faculty);
          }}
          className="
            mt-4
            bg-[#E91E63]
            text-white
            text-[12px]
            py-2
            px-4
            rounded
            hover:bg-[#c2185b]
            transition
          "
        >
          View Profile →
        </button>
      </div>
    </div>
  );
};

export default FacultyCard;
