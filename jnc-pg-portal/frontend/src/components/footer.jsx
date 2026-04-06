import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import footerLogo from "../assets/jnc-footer-logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#3A356B] text-white mt-20">

      {/* MAIN */}
      <div className="max-w-[1300px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-14">

        {/* COLUMN 1 */}
        <div>
          <img src={footerLogo} className="w-[110px] mb-5" />

          <div className="text-[12.5px] text-gray-300 leading-[20px] font-normal">
            <p className="font-medium text-white">
              Jyoti Nivas College Autonomous
            </p>

            <p>Hosur Road, Koramangala</p>
            <p>Bengaluru - 560095</p>

            <p className="mt-3">Phone No: 080 25530137</p>
            <p>Email: info@jyotinivas.org</p>
          </div>
        </div>

        {/* COLUMN 2 */}
        <div>
          <h3 className="text-[15px] font-semibold text-white pb-2">
            Important Links
            <span className="block w-[140px] h-[1px] bg-gray-400 mt-2"></span>
          </h3>

          <ul className="mt-5 space-y-3 text-[13px] text-gray-300 font-medium">
            <li className="hover:text-white cursor-pointer">Apply Now</li>
            <li className="hover:text-white cursor-pointer">Student Login</li>
            <li className="hover:text-white cursor-pointer">Faculty Login</li>
            <li className="hover:text-white cursor-pointer">Online Class</li>
            <li className="hover:text-white cursor-pointer">MIS</li>
            <li className="hover:text-white cursor-pointer">ECRF</li>
          </ul>
        </div>

        {/* COLUMN 3 */}
        <div>
          <h3 className="text-[15px] font-semibold text-white pb-2">
            Useful Links
            <span className="block w-[140px] h-[1px] bg-gray-400 mt-2"></span>
          </h3>

          <ul className="mt-5 space-y-3 text-[13px] text-gray-300 font-medium">
            <li className="flex items-center gap-2 hover:text-white cursor-pointer">
              <span className="text-[10px]">›</span> Career
            </li>
            <li className="flex items-center gap-2 hover:text-white cursor-pointer">
              <span className="text-[10px]">›</span> Bengaluru City University
            </li>
            <li className="flex items-center gap-2 hover:text-white cursor-pointer">
              <span className="text-[10px]">›</span> NAAC
            </li>
            <li className="flex items-center gap-2 hover:text-white cursor-pointer">
              <span className="text-[10px]">›</span> UGC
            </li>
            <li className="flex items-center gap-2 hover:text-white cursor-pointer">
              <span className="text-[10px]">›</span> Online Academic Resources
            </li>

            <img src="/cyber.png" className="w-[160px] mt-3" />
          </ul>
        </div>

        {/* COLUMN 4 */}
        <div>
          <h3 className="text-[15px] font-semibold text-white pb-2">
            Connect Us
            <span className="block w-[140px] h-[1px] bg-gray-400 mt-2"></span>
          </h3>

          <div className="flex gap-3 mt-6">

            <div className="bg-[#2F2A5A] p-2 rounded-sm hover:bg-[#FF2D55] cursor-pointer">
              <Youtube size={15} />
            </div>

            <div className="bg-[#2F2A5A] p-2 rounded-sm hover:bg-[#FF2D55] cursor-pointer">
              <Instagram size={15} />
            </div>

            <div className="bg-[#2F2A5A] p-2 rounded-sm hover:bg-[#FF2D55] cursor-pointer">
              <Linkedin size={15} />
            </div>

          </div>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="bg-[#2F2A5A] text-center py-3 text-[13px] text-gray-300 font-normal">
        © 2025 Jyoti Nivas College Autonomous, Bengaluru | Affiliated to Bengaluru City University
      </div>

    </footer>
  );
};

export default Footer;