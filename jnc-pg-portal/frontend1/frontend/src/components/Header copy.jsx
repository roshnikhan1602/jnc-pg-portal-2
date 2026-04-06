import jncLogo from "../assets/jnc-logo.png";
import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/solid";

const Header = () => {
  return (
    <header className="w-full bg-white shadow">

      {/* 🔵 TOP INFO BAR (UNCHANGED) */}
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
            <button className="bg-[#FF2D55] text-white text-[12px] font-semibold px-4 py-[5px] rounded-sm">
              ONLINE PAYMENT
            </button>
            <button className="bg-[#FF2D55] text-white text-[12px] font-semibold px-4 py-[5px] rounded-sm">
              Admissions 2026-27
            </button>
          </div>

        </div>
      </div>

{/* 🟦 MAIN HEADER (PIXEL PERFECT FINAL) */}
<div className="border-b border-gray-200">
  <div className="max-w-[1300px] mx-auto px-6 py-[10px] flex items-center justify-between">

    {/* 🔷 LOGO (LEFT ALIGNED PERFECTLY) */}
    <div className="flex items-left -ml-2">
      <img
        src={jncLogo}
        alt="JNC Logo"
        className="h-[60px] w-auto object-contain"
      />
    </div>

    {/* 🔷 STATS */}
   <div className="hidden lg:flex items-center gap-[60px] text-center font-serif">

  <div>
    <p className="text-[20px] font-semibold text-[#2C2C2C] leading-none">59</p>
    <p className="text-[10px] text-gray-600 mt-[2px]">Years</p>
  </div>

  <div>
    <p className="text-[20px] font-semibold text-[#2C2C2C] leading-none">6</p>
    <p className="text-[10px] text-gray-600 mt-[2px]">Streams</p>
  </div>

  <div>
    <p className="text-[20px] font-semibold text-[#2C2C2C] leading-none">43</p>
    <p className="text-[10px] text-gray-600 mt-[2px]">Programmes</p>
  </div>

  <div>
    <p className="text-[20px] font-semibold text-[#2C2C2C] leading-none">64th</p>
    <p className="text-[10px] text-gray-600 mt-[2px] whitespace-nowrap">
      Best College in India
    </p>
  </div>

  <div>
    <p className="text-[20px] font-semibold text-[#2C2C2C] leading-none">5th</p>
    <p className="text-[10px] text-gray-600 mt-[2px] whitespace-nowrap">
      Best College in Karnataka
    </p>
  </div>

</div>
  </div>
</div>

    </header>
  );
};

export default Header;