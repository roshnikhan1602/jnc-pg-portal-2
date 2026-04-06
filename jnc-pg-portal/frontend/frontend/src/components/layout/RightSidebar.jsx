import { Link } from "react-router-dom";
import "./RightSidebar.css";

export default function RightSidebar() {
  return (
    <div className="sidebar">
      <h3>PLACEMENTS</h3>
      <ul>
        <li><Link to="/placements/about">About Placements</Link></li>
        <li><Link to="/placements/training">Placement Training</Link></li>
        <li><Link to="/placements/recruiters">Recruiting Companies</Link></li>
        <li><Link to="/placements/gallery">Gallery</Link></li>
        <li><Link to="/placements/contact">Contact Us</Link></li>
      </ul>
    </div>
  );
}
