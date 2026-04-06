import jncLogo from "../assets/jnc-logo.png";
import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import LogoutButton from "./LogoutButton";

const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow">

      {/* 🔵 TOP BAR */}
      <div className="bg-[#4B4B7C] text-white text-[14px]">
        <div className="max-w-[1300px] mx-auto px-6 py-2 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <span className="hover:underline cursor-pointer">IQAC</span>
            <span className="opacity-70">|</span>
            <span className="hover:underline cursor-pointer">NIRF</span>
            <span className="opacity-70">|</span>
            <span className="hover:underline cursor-pointer">ARIIA</span>
            <span className="opacity-70">|</span>
            <span className="hover:underline cursor-pointer">MOUS</span>
            <span className="opacity-70">|</span>
            <span className="hover:underline cursor-pointer">IIC</span>
            <span className="opacity-70">|</span>

            <div className="flex items-center gap-1 ml-2">
              <PhoneIcon className="w-[14px] h-[14px]" />
              <span>Tel: 080 25530137</span>
              <span className="opacity-70">|</span>
            </div>

            <div className="flex items-center gap-1 ml-2">
              <EnvelopeIcon className="w-[14px] h-[14px]" />
              <span>info@jyotinivas.org</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
          
            <button className="bg-[#FF2D55] text-white text-[12px] px-4 py-[5px] rounded-sm">
              ONLINE PAYMENT
            </button>
            <button className="bg-[#FF2D55] text-white text-[12px] px-4 py-[5px] rounded-sm">
              Admissions 2026-27
            </button>
          </div>

        </div>
      </div>

      {/* 🟦 MAIN HEADER */}
      <div className="border-b border-gray-200">
        <div className="max-w-[1300px] mx-auto px-6 py-[10px] flex items-center justify-between">

<Link to={"/home"}>
          {/* LOGO */}
          <img src={jncLogo} className="h-[60px]" /></Link>

          {/* STATS */}
          <div className="hidden lg:flex items-center gap-[60px] text-center font-serif">
            <div><p className="text-[20px] font-semibold">59</p><p className="text-[10px]">Years</p></div>
            <div><p className="text-[20px] font-semibold">6</p><p className="text-[10px]">Streams</p></div>
            <div><p className="text-[20px] font-semibold">43</p><p className="text-[10px]">Programmes</p></div>
            <div><p className="text-[20px] font-semibold">64th</p><p className="text-[10px]">Best College in India</p></div>
            <div><p className="text-[20px] font-semibold">5th</p><p className="text-[10px]">Best College in Karnataka</p></div>
          </div>

          {/* 👤 SINGLE ICON ONLY */}
          {/* <div className="relative z-10">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <UserIcon className="w-6 h-6 text-gray-700" />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">

                <button
                  onClick={() => {
                    navigate("/login");
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Login
                </button>

                <div className="px-2 py-2">
                  <LogoutButton className="w-full text-sm" />
                </div>

              </div>
            )}
          </div> */}

        </div>
      </div>

    </header>
  );
};

export default Header;