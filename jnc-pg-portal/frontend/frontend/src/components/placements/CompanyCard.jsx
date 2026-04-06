export default function PlacementCard({ company }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
      <h3>{company.companyName}</h3>
      <p>{company.jobRole}</p>
    </div>
  );
}
