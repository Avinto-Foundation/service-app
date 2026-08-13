import type { Service } from "../type";
import {useNavigate} from "react-router-dom";

interface CardProps { 
  service: Service; 
}

export default function Card({ service }: CardProps) {
  const { imageUrl, name, category, rating, reviewCount, distanceMiles, price } = service;
const navigate = useNavigate();

const handleViewProfile = () => {
  // user clicks "View Profile" button, navigate to the profile page and pass the service data as state
  navigate(`/profile/${service.id}`, { state: { service } });
}
  

  return (
    <article className="card">
      <img src={imageUrl} alt={name} className="card-img" />
      <div className="card-body">
        <span className="badge">{category}</span>
        <h2 className="card-title">{name}</h2>
      <p className="card-rating">
  <span style={{ 
     backgroundColor: "#16a34a",color: "#ffffff",padding: "0.2rem 0.5rem",borderRadius: "0.375rem",fontWeight: "700",display: "inline-flex",    alignItems: "center",    gap: "0.2rem" }}>
    <span style={{ color: "#facc15" }}>★</span> {rating}
  </span>
  <span style={{ marginLeft: "0.5rem",color: "#6b7280"  }}>({reviewCount} reviews)</span>
</p>
        <div className="card-info">
          <span className="text-muted">{distanceMiles} mi away</span>
          <b className="text-bold">${price}/hr</b>
        </div>
                      <button onClick={handleViewProfile} className="view-profile-btn">
          View Profile
        </button>
      </div>
    </article>
  );
}