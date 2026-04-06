const FacultyHeader = ({ department }) => {
  return (
    <div className="bg-[#2F2F6F] text-white py-10 text-center w-full">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-wide uppercase">
        {department ? `Department of ${department}` : "Faculty Profiles"}
      </h1>
    </div>
  );
};

export default FacultyHeader;
