import React from "react";

function Library() {
  return (
    <div className="w-full bg-[#f5f5f5] font-[Times_New_Roman,serif]">

      {/* 🔷 TOP */}
      <div className="bg-[#3f3a75] text-white text-center py-8">
        <h1 className="text-[22px] font-semibold tracking-wide">
          LIBRARY & INFORMATION CENTRE
        </h1>
        <div className="w-[220px] h-[1px] bg-gray-300 mx-auto mt-3"></div>
      </div>

      {/* 🔷 CONTENT */}
      <div className="max-w-[1200px] mx-auto px-6 py-10 grid grid-cols-3 gap-10">

        {/* LEFT */}
        <div className="col-span-2 text-[15px] text-[#222] leading-[1.8]">

          {/* LOGOS */}
          <div className="flex items-center gap-5 mb-6 flex-wrap">
            <img src="/logos/swayam.png" className="h-10" />
            <img src="/logos/ugc.png" className="h-10" />
            <img src="/logos/pathshala.png" className="h-10" />
            <img src="/logos/prabha.png" className="h-10" />
            <img src="/logos/nptel.png" className="h-10" />
          </div>

          <p className="mb-5">
            The library is spacious and well ventilated. The overall purpose of the Library and Information Centre is to support the curriculum offered at Jyoti Nivas College. The function of the library is to support and enrich classroom instruction through a collection of carefully selected material based on courses and programs offered by the college.
          </p>

          <h3 className="text-[16px] font-semibold text-[#b91c1c] mb-2">
            History :
          </h3>

          <p className="mb-5">
            The JNC Library was established in the year 1966 in Frazer Town, and shifted later when the college shifted to Koramangala in 1976. The Library was first housed in a small room, and then shifted to a large hall where it gradually developed into a big library, with a collection of around 30,000 books and 75 Periodicals and Journals. As the college began to grow and develop there was a shortage of space to store library materials. It was also growing difficult to accommodate students and staff. A strong need was felt for a bigger building to house the library. Consequently in the year 2000, the present building, which comprises of a basement and four floors, was constructed. Jyoti Nivas College has made vast improvements in the field of library and information services.
          </p>

          <h3 className="text-[16px] font-semibold text-[#b91c1c] mb-2">
            Vision & Mission:
          </h3>

          <p className="mb-2">
            <span className="font-semibold">Vision:</span> Deliver Continuous Access to Information in a Networked Environment to upkeep an excellence in Teaching and Research.
          </p>

          <p>
            <span className="font-semibold">Mission:</span> Sustain High-Quality Print and Electronic Information Resources, Disseminate Information and Knowledge, and Provide Desired Services to the User Community to find, assess, use and create innovative knowledge for a better world.
          </p>

        </div>

        {/* RIGHT BOX */}
        <div className="bg-[#0f5c5c] text-white p-8 text-center h-fit">

          <h3 className="text-[18px] font-semibold mb-5">
            Library Timings
          </h3>

          <p className="text-yellow-300 font-semibold text-[15px]">
            Monday to Friday
          </p>
          <p className="mb-4 text-[15px]">8.00 AM to 5.30 PM</p>

          <p className="text-yellow-300 font-semibold text-[15px]">
            Saturday
          </p>
          <p className="mb-4 text-[15px]">8.00 AM to 4.00 PM</p>

          <p className="text-yellow-300 text-[13px] leading-relaxed">
            The library remains open on all working days except on National and Gazette holidays
          </p>

        </div>

      </div>
    </div>
  );
}

export default Library;