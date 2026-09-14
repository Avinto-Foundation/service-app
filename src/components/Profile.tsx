import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Service } from "../type";

export default function Profile() {
  const { id } = useParams();       
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/services/${id}/`)
      .then(res => res.json())
      .then(data => {
        // Fixing the spelling here too just in case
        const fixedData = {
          ...data,
          imageUrl: data.imageUrl || data.image_url,
          reviewCount: data.reviewCount || data.review_count,
          distanceMiles: data.distanceMiles || data.distance_miles
        };
        setService(fixedData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);
  
  if (loading) return <p className="message">Loading...</p>;
  if (!service) return <p className="message">Service not available.</p>;

  return (
    <main className="app-container" style={{ maxWidth: "800px" }}>
      <button 
        onClick={() => navigate("/")} 
        className="view-profile-btn" 
        style={{ width: "auto", margin: "2rem auto 1.5rem", display: "block" }}
      >
        ← Back to Home 
      </button>

      <div className="card">
        <img src={service.imageUrl} alt={service.name} className="card-img" style={{ height: "300px", objectFit: "cover" }} />
        
        <div className="card-body" style={{ padding: "1.5rem" }}>
          <span className="badge">{service.category}</span>
          <h1 className="card-title" style={{ fontSize: "1.75rem", marginTop: "0.5rem" }}>{service.name}</h1>
          
          <p className="card-rating" style={{ marginBottom: "1rem" }}>
            ⭐ {service.rating} ({service.reviewCount || 0} reviews)
          </p>
          
          <div className="card-info" style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: "1rem", marginBottom: "1.5rem" }}>
            <span className="text-muted">Price:</span>
            <span className="text-bold">${service.price}/hr</span>
          </div>

          <h3 className="sidebar-heading">About this service</h3>
          <p className="text-muted" style={{ lineHeight: "1.7" }}>
            {service.description || `${service.name} is located at ${service.address}. You can contact them at ${service.phone}. They are ${service.distanceMiles} miles away.`}
          </p>
        </div>
      </div>
    </main>
  );
}