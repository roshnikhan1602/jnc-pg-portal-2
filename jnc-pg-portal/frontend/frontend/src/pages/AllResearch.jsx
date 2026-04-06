import { useNavigate } from "react-router-dom";

/* 🔥 SAME SLUG MAP */
const departments = [
  { name: "Department of Computer Science", slug: "computer-science" },
  { name: "Department of Management", slug: "management" },
  { name: "Department of Chemistry", slug: "chemistry" },
  { name: "Department of English", slug: "english" },
  { name: "Department of Commerce", slug: "commerce" },
  { name: "Department of Biological Sciences", slug: "biological-sciences" },
  { name: "Department of Mathematics", slug: "mathematics" },
  { name: "Department of Psychology", slug: "psychology" },
];

export default function AllResearch() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f9fafb] p-6">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-center mb-10 text-[#2f2f6f]">
        Research Centres
      </h1>

      {/* GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {departments.map((dept, index) => (
          <div
            key={index}
            onClick={() => navigate(`/research/${dept.slug}`)}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition cursor-pointer"
          >
            <h3 className="text-lg font-semibold text-[#2f2f6f]">
              {dept.name}
            </h3>

            <p className="text-sm text-gray-600 mt-2">
              Explore research activities, guides, and scholars
            </p>

            <div className="mt-4 text-[#2f2f6f] font-medium">
              View Research →
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}