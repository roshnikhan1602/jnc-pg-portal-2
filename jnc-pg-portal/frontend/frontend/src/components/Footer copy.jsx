import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import footerLogo from "../assets/jnc-footer-logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#3F3A6B] text-white mt-20">

      {/* MAIN */}
      <div className="max-w-[1300px] mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-16">

        {/* COLUMN 1 */}
        <div>
          <img src={footerLogo} className="w-[120px] mb-6" />

          <div className="text-[13px] text-gray-300 leading-[22px]">
            <p className="font-semibold text-white mb-1">
              Jyoti Nivas College Autonomous
            </p>

            <p>Hosur Road, Koramangala</p>
            <p>Bengaluru - 560095</p>

            <p className="mt-4">Phone No: 080 25530137</p>
            <p>Email: info@jyotinivas.org</p>
          </div>
        </div>

        {/* COLUMN 2 */}
        <div>
          <h3 className="text-[16px] font-semibold">
            Important Links
            <span className="block w-[120px] h-[1px] bg-gray-400 mt-2"></span>
          </h3>

          <ul className="mt-6 space-y-3 text-[13px] text-gray-300">
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
          <h3 className="text-[16px] font-semibold">
            Useful Links
            <span className="block w-[120px] h-[1px] bg-gray-400 mt-2"></span>
          </h3>

          <ul className="mt-6 space-y-3 text-[13px] text-gray-300">
            <li className="flex items-center gap-2 hover:text-white cursor-pointer">
              <span className="text-[12px]">›</span> Career
            </li>
            <li className="flex items-center gap-2 hover:text-white cursor-pointer">
              <span className="text-[12px]">›</span> Bengaluru City University
            </li>
            <li className="flex items-center gap-2 hover:text-white cursor-pointer">
              <span className="text-[12px]">›</span> NAAC
            </li>
            <li className="flex items-center gap-2 hover:text-white cursor-pointer">
              <span className="text-[12px]">›</span> UGC
            </li>
            <li className="flex items-center gap-2 hover:text-white cursor-pointer">
              <span className="text-[12px]">›</span> Online Academic Resources
            </li>

            <img src="/cyber.png" className="w-[170px] mt-4" />
          </ul>
        </div>

        {/* COLUMN 4 */}
        <div>
          <h3 className="text-[16px] font-semibold">
            Connect Us
            <span className="block w-[120px] h-[1px] bg-gray-400 mt-2"></span>
          </h3>

          <div className="flex gap-4 mt-6">

            <div className="bg-[#2F2A5A] p-3 rounded-md hover:bg-[#FF2D55] cursor-pointer transition">
              <Youtube size={16} />
            </div>

            <div className="bg-[#2F2A5A] p-3 rounded-md hover:bg-[#FF2D55] cursor-pointer transition">
              <Instagram size={16} />
            </div>

            <div className="bg-[#2F2A5A] p-3 rounded-md hover:bg-[#FF2D55] cursor-pointer transition">
              <Linkedin size={16} />
            </div>

          </div>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="bg-[#2F2A5A] text-center py-4 text-[13px] text-gray-300">
        © 2025 Jyoti Nivas College Autonomous, Bengaluru | Affiliated to Bengaluru City University
      </div>

    </footer>
  );
};

export default Footer;