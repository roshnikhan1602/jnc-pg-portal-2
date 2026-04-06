import React from "react";

const PlacementCard = ({ data }) => {
  return (
    <div className="placement-card">
      <h3>{data.companyName}</h3>
      <p><strong>Role:</strong> {data.jobRole}</p>
      <p><strong>Package:</strong> {data.packageOffered}</p>
      <p><strong>Eligibility:</strong> {data.eligibility}</p>
      <p><strong>Drive Date:</strong> {new Date(data.driveDate).toDateString()}</p>
      <p>{data.description}</p>
    </div>
  );
};

export default PlacementCard;
