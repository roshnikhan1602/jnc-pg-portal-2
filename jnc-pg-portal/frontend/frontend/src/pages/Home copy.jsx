import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: "40px", minHeight: "80vh" }}>
        <h1>Welcome to Jyoti Nivas College Portal</h1>
        <p>Your one-stop platform for placement information and updates.</p>
        <Link to="/placements">
          <button style={{ 
            padding: "10px 20px", 
            fontSize: "1rem", 
            backgroundColor: "#1e3a8a", 
            color: "white", 
            border: "none", 
            borderRadius: "5px",
            cursor: "pointer"
          }}>
            Go to Placements
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
