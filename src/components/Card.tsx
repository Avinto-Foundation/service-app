import type { Service } from "../type";

interface CardProps { 
  service: Service; 
}

export default function Card({ service }: CardProps) {
  const { imageUrl, name, category, rating, reviewCount, distanceMiles, price, email } = service;

  const handleContact = () => 
    email ? window.location.href = `mailto:${email}` : alert(`Contacting ${name}...`);

  return (
    <article className="card">
      <img src={imageUrl} alt={name} className="card-img" />
      <div className="card-body">
        <span className="badge">{category}</span>
        <h2 className="card-title">{name}</h2>
        <p className="card-rating">
          <span style={{ color: "#eab308" }}>★</span> <b>{rating}</b> ({reviewCount} reviews)
        </p>
        <div className="card-info">
          <span className="text-muted">{distanceMiles} mi away</span>
          <b className="text-bold">${price}</b>
        </div>
        <button onClick={handleContact} className="contact-btn">
          Contact
        </button>
      </div>
    </article>
  );
}