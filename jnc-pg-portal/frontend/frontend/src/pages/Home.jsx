import React, { useState, useEffect } from "react";
import Map from "../components/Map";
import { Link, useNavigate } from "react-router-dom";
import { useGetFacultiesQuery } from "@/api/facultyApi";
import { useGetDepartmentsQuery } from "@/api/departmentApi";
import { useValidateAuthQuery } from "@/api/authApi";
const slides = [
  "https://jyotinivas.org/style/images/pg-slider/sl_01.jpg",
  "https://jyotinivas.org/style/images/pg-slider/sl_02.jpg",
  "https://jyotinivas.org/style/images/pg-slider/sl_03.jpg",
  "https://jyotinivas.org/style/images/pg-slider/sl_04.jpg",
  "https://jyotinivas.org/style/images/pg-slider/sl_05.jpg",
  "https://jyotinivas.org/style/images/pg-slider/sl_06.jpg",
];

const Home = () => {

    const { data: facultyData } = useGetFacultiesQuery();
    const { data: deptData } = useGetDepartmentsQuery();
    const { data: authData } = useValidateAuthQuery();

  const [current, setCurrent] = useState(0);
  const [activeTab, setActiveTab] = useState("events");
  const [events, setEvents] = useState([]);
  const [anns, setAnns] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 4000);
    loadData();
    return () => clearInterval(interval);
  }, [current]);
const navigate = useNavigate();

    const loadData = async () => {
    try {
      const ev = await fetch(`${import.meta.env.VITE_API_URL}/api/events`);
      const an = await fetch(`${import.meta.env.VITE_API_URL}/api/announcements`);

      const evData = await ev.json();
      const anData = await an.json();

      setEvents(evData || []);
      setAnns(anData || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full">

      {/* 🔷 HERO SLIDER */}
      <section className="relative w-full z-0 h-[85vh] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide}
              alt={`slide-${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        <button
          onClick={() =>
            setCurrent((prev) =>
              prev === 0 ? slides.length - 1 : prev - 1
            )
          }
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/40 p-2 rounded-full z-20"
        >
          ‹
        </button>

        <button
          onClick={() =>
            setCurrent((prev) =>
              prev === slides.length - 1 ? 0 : prev + 1
            )
          }
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/40 p-2 rounded-full z-20"
        >
          ›
        </button>

        <div className="absolute bottom-4 w-full flex justify-center gap-2 z-20">
          {slides.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2.5 h-2.5 rounded-full cursor-pointer ${
                current === index ? "bg-white" : "bg-white/50"
              }`}
            ></div>
          ))}
        </div>
      </section>

      {/* 🔷 CONTENT WRAPPER */}
      <div className="max-w-[1100px] mx-auto px-4 md:px-6">

        {/* 🔷 ABOUT TEXT */}
        <section className="py-8">
          <p className="text-[18px] leading-[28px] text-black text-justify font-[Times_New_Roman]">
            The Postgraduate Centre of Jyoti Nivas College, Autonomous, Bangalore, is dedicated to the pursuit of academic excellence, advanced research, and professional development. Established to provide high-quality postgraduate education, the Centre offers a wide spectrum of programs that equip students with in-depth knowledge, critical perspectives, and the skills required to excel in their respective fields.
            <br /><br />
            Guided by the founding vision of the institution, the PG Centre upholds a strong commitment to intellectual rigor, value-based education, and holistic growth. The academic environment is enriched by experienced faculty members, well-resourced infrastructure, and an emphasis on research, innovation, and interdisciplinary learning. The Postgraduate Centre strives to cultivate not only academic proficiency but also ethical responsibility and leadership qualities, thereby preparing graduates to contribute effectively to academia, industry, and society at large.
          </p>
        </section>

        {/* 🔷 ADMISSION BOX */}
        <section className="pb-8">
          <div className="border border-[#cfcfcf] rounded-lg py-5 px-5 text-center font-[Times_New_Roman]">
            <h2 className="text-[19px] font-semibold mb-4">
              For Admission Enquiries
            </h2>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[17px]">
              <p className="font-semibold">Ms. Jaya Thomas - 88849 82277</p>
              <p className="font-semibold">Mr. Bhagayanathan - 89711 92474</p>
              <p className="font-semibold">Ms. Vijaya - 98809 90642</p>
            </div>
          </div>
        </section>
      </div>

      {/* 🔷 PRINCIPAL + RIGHT SECTION */}
      <section className="bg-[#f9fafb] pt-6 pb-2">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          {/* LEFT */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img
              src="https://jyotinivas.org/style/images/home_page/principal.jpg"
              alt="principal"
              className="w-full h-[400px] object-cover"
            />
            <div className="p-5">
              <h2 className="text-[19px] font-semibold mb-3">
                Principal's Message
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                An educational institution has the immense responsibility of shaping the future citizens of this world. With over 50 years of experience in imparting knowledge, skills and ethics to young women, Jyoti Nivas College Autonomous has always fulfilled this responsibility. Founded in 1966 as a minority Christian College managed by the society of sisters of St. Joseph of Tarbes, JNC has remained steadfast in its goal of providing a balanced and comprehensive education in the liberal arts, sciences and commerce and management.
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div>

            <div className="flex gap-3 mb-4">
              <button onClick={() => setActiveTab("events")} className={`px-4 py-2 text-sm rounded ${activeTab === "events" ? "bg-[#4B4B7C] text-white" : "bg-gray-200 text-gray-700"}`}>
                Upcoming Events
              </button>
              <button onClick={() => setActiveTab("announcements")} className={`px-4 py-2 text-sm rounded ${activeTab === "announcements" ? "bg-[#4B4B7C] text-white" : "bg-gray-200 text-gray-700"}`}>
                Announcements
              </button>
            </div>
<div className="space-y-4 mb-6">

  {/* EVENTS */}
  {activeTab === "events" && (
    <>
      {events.length === 0 ? (
        <p>No events available</p>
      ) : (
        <>
          {events.slice(0, 2).map((e) => (
              <div 
              onClick={() => navigate("/student")}
              key={e._id}
              className="bg-white p-4 rounded-lg shadow-sm flex gap-3 hover:shadow-md transition"
              
            >
              <div >
                <p  className="text-sm font-semibold">{e.title}</p>
                <p className="text-xs text-gray-500">
                  {new Date(e.eventDate).toDateString()}
                </p>
              </div>
            </div>
          ))}

          {/* 🔥 VIEW MORE BUTTON */}
          {events.length > 2 && (
            <div className="">
              <button
                onClick={() => navigate("/student")}
                className="mt-2 px-4 py-2 bg-[#2f2f6f] text-white rounded-full text-sm hover:bg-[#1f1f5a] transition"
              >
                View More →
              </button>
            </div>
          )}
        </>
      )}
    </>
  )}

  {/* ANNOUNCEMENTS */}
  {activeTab === "announcements" && (
    <>
      {anns.length === 0 ? (
        <p>No announcements</p>
      ) : (
        <>
          {anns.slice(0, 2).map((a) => (
            <div
            onClick={() => navigate("/student")}
              key={a._id}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition"
              
            >
              <p className="text-sm font-semibold">{a.title}</p>
              <p className="text-xs text-gray-600">
                {a.message}
              </p>
            </div>
          ))}

          {/* 🔥 VIEW MORE BUTTON */}
          {anns.length > 2 && (
            <div className="text-center">
              <button
                onClick={() => navigate("/student")}
                className="mt-2 px-4 py-2 bg-[#2f2f6f] text-white rounded-full text-sm hover:bg-[#1f1f5a] transition"
              >
                View More →
              </button>
            </div>
          )}
        </>
      )}
    </>
  )}

</div>

            <h3 className="text-lg font-semibold mb-3">Academics</h3>
<div className="space-y-3 mb-5">
  {[
    { short: "PG", name: "Postgraduate Programs", path: "/Postgraduate-Programmes" },
    { short: "RC", name: "Research Centres", path: "/research" },
  ].map((item, index) => (
    <div
      key={index}
      onClick={() => navigate(item.path)}
      className="flex justify-between items-center bg-white px-4 py-3 rounded-lg shadow-sm border cursor-pointer hover:bg-[#f3f4ff] transition"
    >
      <div className="flex gap-3">
        <span className="bg-[#4B4B7C] text-white text-xs px-2 rounded">
          {item.short}
        </span>
        <p className="text-sm">{item.name}</p>
      </div>

      <span className="text-[#2f2f6f]">→</span>
    </div>
  ))}
</div>

           
            <div className="grid grid-cols-2 gap-4 " >
               
              <div onClick={() => navigate("/Postgraduate-Programmes")} className="bg-white py-4 rounded-lg shadow-sm text-center">
                <p className="text-[15px] font-semibold text-[#4B4B7C]">25+</p>
                <p className="text-[12px] text-gray-600">Programs</p>
              </div>

              <div onClick={() => navigate("/faculty")}
              className="bg-white py-4 rounded-lg shadow-sm text-center">
                <p className="text-[15px] font-semibold text-[#4B4B7C]">100+</p>
                <p className="text-[12px] text-gray-600">Faculty</p>
              </div>

              <div onClick={() => navigate("/placements/recruiters")}
              className="bg-white py-4 rounded-lg shadow-sm text-center">
                <p className="text-[15px] font-semibold text-[#4B4B7C]">50+</p>
                <p className="text-[12px] text-gray-600">Recruiters</p>
              </div>

              <div onClick={() => navigate("/Postgraduate-Programmes")}
              className="bg-white py-4 rounded-lg shadow-sm text-center">
                <p className="text-[15px] font-semibold text-[#4B4B7C]">10+</p>
                <p className="text-[12px] text-gray-600">Departments</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔷 DEPARTMENTS + PLACEMENTS */}
{/* 🔷 DEPARTMENTS + PLACEMENTS */}
<section className="bg-[#f9fafb] pt-2 pb-10">
  <div className="max-w-[1100px] mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-10">

    {/* LEFT */}
    <div>
      <h3 className="text-lg font-semibold mb-3">Departments</h3>

      <div className="grid grid-cols-2 gap-5">
        {[
          "Computer Science",
          "Commerce",
          "Management",
          "Mathematics",
          "Psychology",
          "Chemistry",
          "Biological Sciences",
          "English",
        ].map((dept, index) => (
          <div
            key={index}
            onClick={() =>
              navigate(`/faculty?dept=Department of ${dept}`)
            }
            className="bg-white px-5 py-4 rounded-xl shadow-sm hover:shadow-md hover:bg-[#f3f4ff] transition flex justify-between items-center text-[15px] cursor-pointer"
          >
            <span className="font-medium">{dept}</span>
            <span className="text-[#2f2f6f]">→</span>
          </div>
        ))}
      </div>

      {/* 🔥 VIEW ALL FACULTY BUTTON */}
      <div className="text-center mt-6">
        <button
          onClick={() => navigate("/faculty")}
          className="bg-[#2f2f6f] text-white px-6 py-2 rounded-full text-sm hover:bg-[#1f1f5a] transition"
        >
          View All Faculty →
        </button>
      </div>
    </div>

    {/* RIGHT (UNCHANGED) */}
    <div>
      <h3 className="text-lg font-semibold mb-3">Placements</h3>

      <div className="bg-white rounded-lg shadow-sm p-5">
        <div className="flex gap-5 overflow-x-auto pb-2">
          {[{name:"Kadapala Akshaya",role:"Deutsche Bank – Operations Analyst",img:"https://randomuser.me/api/portraits/women/44.jpg"},
          {name:"Manisha Khatun",role:"Deutsche Bank – Documentation Trade Analyst",img:"https://randomuser.me/api/portraits/women/65.jpg"},
          {name:"R Navya",role:"HSBC – Market Analyst",img:"https://randomuser.me/api/portraits/women/32.jpg"},
          {name:"Rebecca Joshua",role:"Deutsche Bank – Trade Analyst",img:"https://randomuser.me/api/portraits/women/50.jpg"}].map((student, index) => (
            <div key={index} className="min-w-[200px] bg-[#f9fafb] rounded-lg p-5 text-center shadow-sm">
              <img src={student.img} className="w-20 h-20 mx-auto rounded-full object-cover mb-3" />
              <p className="text-sm font-semibold">{student.name}</p>
              <p className="text-xs text-gray-600 mt-1">{student.role}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <button onClick={() => navigate("/placements")} className="bg-[#4B4B7C] text-white px-5 py-2 rounded-full text-sm">
            More Details
          </button>
        </div>
      </div>
    </div>

  </div>
</section>
              <Map/>  
    </div>
  );
};

export default Home;




