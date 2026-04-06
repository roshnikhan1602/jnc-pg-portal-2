import PlacementCard from "./PlacementCard";

export default function PlacementList({ placements }) {
  return (
    <div>
      {placements.length === 0 ? (
        <p>No placement drives available.</p>
      ) : (
        placements.map((p, index) => (
          <PlacementCard key={index} company={p} />
        ))
      )}
    </div>
  );
}
