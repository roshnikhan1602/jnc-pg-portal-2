import { useState } from "react";
import { Menu, X, User, UserIcon, ArrowLeftCircle } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useValidateAuthQuery } from "@/api/authApi";
function Navbar() {
    const { data, isLoading } = useValidateAuthQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });

    
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
const isHomePage = location.pathname === "/home";
  const isActive = (path) => location.pathname === path;

  const navItem = (label, path) => (
    <Link
      to={path}
      className={`px-4 py-[6px] rounded-full text-[12px] font-bold transition
        ${
          isActive(path)
            ? "bg-[#FF2D55] text-white"
            : "text-[#2C2C2C] hover:text-[#FF2D55]"
        }`}
    >
      {label}
    </Link>
  );

  return (
    <nav  className="bg-[#f5f5f5] border-t border-gray-200 relative">

      {/* DESKTOP */}
      <div className="hidden lg:flex items-center justify-between max-w-[1300px] mx-auto px-6 h-[55px]">

        {/* LEFT */}
        <div className="flex items-center gap-7 text-[12px] font-semibold tracking-wide">
{!isHomePage && (
  <ArrowLeftCircle
    size={32}
    className="cursor-pointer text-[#2f2f6f] hover:scale-110 transition"
    onClick={() => {
  if (window.history.length > 1) {
    navigate(-1);
  } else {
    navigate("/");
  }
}}
  />
)}
          {navItem("HOME", "/home")}

          <Dropdown title="ABOUT US">
            <Column title="Administration" items={[
              "Organization Structure","Management","Governing Body","Governing Council",
              "Principal’s Message","Academic Council","Examination Cell","Chief Coordinators",
              "Deans","Administrative Staff","Staff Welfare Services"
            ]}/>
            <Column title="Introduction" items={[
              "History & Milestones","Institutional Best Practices","Institutional Distinctiveness"
            ]}/>
            <Column title="JNC Timeline" items={[
              "Campus Culture","Annual Reports","Glimpse of College Achievements & Activities"
            ]}/>
          </Dropdown>

          <Dropdown title="ACADEMICS">
            <Column items={[
              "Centre for Media Studies","School of Humanities & Social Sciences",
              "School of Life Sciences","School of Physical Sciences",
              "School of Computer Science","School of Commerce",
              "School of Management","Postgraduate Centre"
            ]}/>
            <Column title="Syllabus" items={[
              "UG - SEP Syllabus","UG - NEP Syllabus","Value Added Courses",
              "Internship","Credits","Research","Staff Competency",
              "Conferences & Seminars","Webinar Video's"
            ]}/>
            <Column items={[
              "Academic Calendar of Events","Newsletters","Achievements",
              "Curriculum Analysis","Graduate Attributes","Examination",
              "Clubs & Associations","Programme Outcomes"
            ]}/>
          </Dropdown>

          <Dropdown title="STUDENT SUPPORT">
            <Column title="Student Support & Services" items={[
              "Anti Ragging Squad","Internal Complaints Committee","Code Of Conduct",
              "Support Services","Student Services Centre","Academic Support",
              "Scholarships","Mentor System","Best Practices","Students Handbook"
            ]}/>
            <Column items={[
              "Student Welfare Committee","Capability Enhancement Schemes",
              "Centre for Competitive Examinations","Counselling",
              "Student Grievance Redressal Committee","Value Education",
              "Outreach","Go Green","Sports","Student Council"
            ]}/>
            <Column items={[
              "Placement","Blog","Student Verification"
            ]}/>
          </Dropdown>

          <Dropdown title="INFRASTRUCTURE">
            <Column items={[
              "Library & Info Centre","Auditorium","Food Court","Hostel",
              "Medical Room","Board Room","Conference Hall","Meditation Room","Video Studio"
            ]}/>
            <Column items={[
              "Chapel","Gymnasium","Indoor Games Room","Bank","Parking",
              "Audio Studio","Media Lab","Innovation Lab","Media Incubation Centre"
            ]}/>
            <Column items={[
              "Zoological Museum","Language Lab","Student Union Room",
              "Performing Arts Studio","Maintenance Policy"
            ]}/>
          </Dropdown>

          <Dropdown title="ADMISSIONS" simple>
            {[
              "Online Payment","Undergraduate Programme","Prospectus",
              "Dhwani 2024-25","PUC","Postgraduate Programme"
            ]}
          </Dropdown>

          {/* ✅ FIXED: LIBRARY LINK */}
          <Link
            to="/library"
            className="cursor-pointer hover:text-[#FF2D55]"
          >
            LIBRARY AND INFO CENTRE
          </Link>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6">
          
          <div className="relative z-10">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <UserIcon className="w-6 h-6 text-gray-700" />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-60 bg-white border rounded-lg shadow-lg">

{(data?.authenticated)?(
  
  <>
    <p className="px-4 py-2 text-sm text-gray-500">
      Welcome, {data.user?.email}
    </p> 
   {(data.user?.role =="admin")&& <Link to={"/admin"}><button onClick={() => {
                    setOpen(false);
                  }}  className="w-full text-left text-gray-600 px-4 py-2 hover:bg-gray-100">Admin actions</button></Link>}
                   {(data.user?.role =="faculty")&& <Link to={"/faculty/edit-profile"}><button onClick={() => {
                    setOpen(false);
                  }}  className="w-full text-left text-gray-600 px-4 py-2 hover:bg-gray-100">My Profile</button></Link>}
 {(data.user?.role =="faculty")&& <Link to={"/faculty/dash"}><button onClick={() => {
                    setOpen(false);
                  }}  className="w-full text-left text-gray-600 px-4 py-2 hover:bg-gray-100">Faculty Dashboard</button></Link>}
    <div className="px-2 py-2">
      <LogoutButton />
    </div>
  </>
):(<><button
                  onClick={() => {
                    navigate("/login");
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Login
                </button></>)}

                



              </div>
            )}
          </div>
        </div>

      </div>

      {/* MOBILE */}
      <div className="lg:hidden flex justify-between px-4 py-3">
        <span>Menu</span>
        <button onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden px-4 pb-4 space-y-2 text-sm font-semibold">
          <Link to="/home">Home</Link>
          <p>About Us</p>
          <p>Academics</p>
          <p>Student Support</p>
          <p>Infrastructure</p>
          <p>Admissions</p>
                         {(data?.authenticated)?(
  
  <>
    <p className="px-4 py-2 text-sm text-gray-500">
      Welcome, {data.user?.email}
    </p>
   {(data.user?.role =="admin")&& <Link to={"/admin"}><button onClick={() => {
                    setOpen(false);
                  }}  className="w-full text-left text-gray-600 px-4 py-2 hover:bg-gray-100">Admin actions</button></Link>}
 {(data.user?.role =="faculty")&& <Link to={"/faculty/dash"}><button onClick={() => {
                    setOpen(false);
                  }}  className="w-200 text-left text-gray-600 px-4 py-2 hover:bg-gray-100">Faculty Dashboard</button></Link>}
 
    <div className="px-2 py-2">
      <LogoutButton />
    </div>
  </>
):(<><button
                  onClick={() => {
                    navigate("/login");
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Login
                </button></>)}
        </div>
      )}
    </nav>
  );
}

/* DROPDOWN */
const Dropdown = ({ title, children, simple }) => (
  <div className="group">
    <span className="cursor-pointer flex items-center gap-1 hover:text-[#FF2D55]">
      {title} <span className="text-[10px]">▾</span>
    </span>

    {simple ? (
      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-white shadow-md border hidden group-hover:block z-50 w-[220px]">
        {children.map((item, i) => (
          <div key={i} className="px-4 py-2 text-[12px] hover:bg-gray-100 cursor-pointer">
            {item}
          </div>
        ))}
      </div>
    ) : (
      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[1000px] bg-white shadow-md border hidden group-hover:block z-50">
        <div className="grid grid-cols-3 gap-16 px-10 py-8 text-[12px]">
          {children}
        </div>
      </div>
    )}
  </div>
);

const Column = ({ title, items }) => (
  <div className="space-y-2">
    {title && <p className="font-semibold">{title}</p>}
    {items.map((item, i) => (
      <p key={i} className="hover:text-[#FF2D55] cursor-pointer">
        {item}
      </p>
    ))}
  </div>
);

export default Navbar;