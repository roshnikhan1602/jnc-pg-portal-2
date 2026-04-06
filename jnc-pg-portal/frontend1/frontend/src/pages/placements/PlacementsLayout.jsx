import Header from "../../components/Header";
import Footer from "../../components/Footer";
import RightSidebar from "../../components/layout/RightSidebar";
import { Outlet } from "react-router-dom"; // ✅ ADD THIS
import "./PlacementsLayout.css";
import Navbar from "@/components/Navbar";

export default function PlacementsLayout() {
  return (
    <>
      {/* <Header /> */}

            <Header/>
      <Navbar />


  

      <div className="placements-layout">
        <div className="placements-content">
          <Outlet /> {/* ✅ THIS FIXES EVERYTHING */}
        </div>

        <RightSidebar />
      </div>
    <Footer />
      {/* <Footer /> */}
    </>
  );
}