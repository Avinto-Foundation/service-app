
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Service } from "../type";

export default function Profile() {
  const { id } = useParams();       // Gets ID from URL 
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);

  // 1. Fetch ONLY the service with this ID
  useEffect(() => {
    fetch(`http://localhost:3000/services/${id}`)
      .then(res => res.json())
      .then(data => setService(data));
  }, [id]);
  

  if (!service) return <p className="message">service not available...</p>;

  return (
    <main className="app-container" style={{ maxWidth: "800px" }}>
     

      <div className="card">
        <img src={service.imageUrl} alt={service.name} className="card-img" style={{ height: "300px" }} />
        <div className="card-body" style={{ padding: "1.5rem" }}>
          <span className="badge">{service.category}</span>
          <h1 className="card-title" style={{ fontSize: "1.75rem", marginTop: "0.5rem" }}>{service.name}</h1>
          <p className="card-rating" style={{ marginBottom: "1rem" }}>⭐ {service.rating} ({service.reviewCount || 0} reviews)</p>
          
          <div className="card-info" style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: "1rem", marginBottom: "1.5rem" }}>
            <span className="text-muted">Price:</span>
            <span className="text-bold">${service.price}/hr</span>
          </div>

          <h3 className="sidebar-heading">About this service</h3>
          <p className="text-muted" style={{ lineHeight: "1.7" }}>
            {service.description || `${service.name}, ${service.category}, ${service.rating}, ${service.reviewCount}, ${service.address}, ${service.phone}, ${service.imageUrl}, ${service.price}, ${service.distanceMiles}, ${service.tags}`}
          </p>
        </div>
      </div>
       <button 
  onClick={() => navigate("/")} 
  className="view-profile-btn" 
  style={{ width: "auto", margin: "2rem auto 1.5rem", display: "block" }}
>
  ← Back to Home 
</button>
    </main>
  );
}