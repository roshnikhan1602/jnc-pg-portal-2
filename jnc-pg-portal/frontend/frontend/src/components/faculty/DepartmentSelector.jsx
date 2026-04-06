const DepartmentSelector = ({ departments, selectedDept, setSelectedDept }) => {
  if (!departments || departments.length === 0) return null;

  return (
    <div className="w-full bg-white border-b">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8 py-6">
        {departments.map((dept) => {
          const active = selectedDept === dept;

          return (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`
                relative pb-1 text-lg font-medium transition
                ${active ? "text-[#2F2F6F]" : "text-gray-500 hover:text-[#2F2F6F]"}
              `}
            >
              {dept}

              {/* Underline (JNC-style) */}
              {active && (
                <span
                  className="
                    absolute left-0 right-0 mx-auto
                    w-full h-[3px]
                    bg-pink-600
                    rounded-full
                    mt-1
                  "
                ></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DepartmentSelector;
