import { useNavigate } from "react-router-dom";
import "./adminMenu.css"
export default function AdminMenu() {
  const navigate = useNavigate();

  const menu = [
    { name: "Dashboard", path: "/admin" },
    { name: "Manage Faculty", path: "/admin/faculty" },
    { name: "Add Placement", path: "/admin/add-placement" },
    { name: "Add Training", path: "/admin/add-training" },
    { name: "Manage Recruiters", path: "/admin/manage-comp" },
    { name: "Placement About", path: "/admin/placement-about" },
    { name: "Assign research", path: "/admin/createresearch" },
     { name: "Fee & Applications", path: "/fee&application" },
  ];

  return (
    <div className="admin-menu">
      <h2 className="admin-title">Admin Panel</h2>

      <div className="admin-grid">
        {menu.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            className="admin-btn"
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}