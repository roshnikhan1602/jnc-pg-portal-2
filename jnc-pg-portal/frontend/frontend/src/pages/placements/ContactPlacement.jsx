// import { useEffect, useState } from "react";
// import "./ContactPlacement.css";
// export default function ContactPlacement() {
//   const [contact, setContact] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:3000/api/placement-contact")
//       .then(res => res.json())
//       .then(data => setContact(data));
//   }, []);

//   if (!contact) return <p>Loading contact details...</p>;

//   return (
//     <div className="contact-page">
//       <h1>Contact – Training & Placement Cell</h1>

//       <div className="contact-card">
//         <h2>{contact.name}</h2>
//         <p><strong>{contact.designation}</strong></p>
//         <p>{contact.department}</p>

//         <p><strong>Address:</strong> {contact.address}</p>
//         <p><strong>Email:</strong> {contact.email}</p>
//         <p><strong>Phone:</strong> {contact.phone}</p>
//         <p><strong>{contact.extension}</strong></p>
//       </div>
//     </div>
//   );
// }


import "./ContactPlacement.css";

export default function ContactPlacement() {
  const contact = {
    name: "Dr. Ravi Kumar",
    designation: "Head – Training & Placement Cell",
    department: "Department of Computer Science",
    address: "JNC Campus, Davangere, Karnataka - 577004",
    email: "placement@jnc.edu",
    phone: "+91 9876543210",
    extension: "Ext: 204",
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1>Training & Placement Cell</h1>
        <p className="subtitle">Get in touch with our placement office</p>

        <div className="contact-card">
          <h2>{contact.name}</h2>
          <p className="designation">{contact.designation}</p>
          <p className="department">{contact.department}</p>

          <div className="contact-details">
            <p><span>Address:</span> {contact.address}</p>
            <p><span>Email:</span> {contact.email}</p>
            <p><span>Phone:</span> {contact.phone}</p>
            <p><span>{contact.extension}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}