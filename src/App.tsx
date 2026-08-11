import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import Card from "./components/Card";
import type { Service } from "./type";
import "./App.css";

export default function App() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/services")
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(setServices)
      .catch(() => setError("Failed to load services."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="message text-gray">Loading...</p>;
  if (error) return <p className="message text-red">{error}</p>;

  const categories = ["All", ...new Set(services.map(s => s.category))];
  
  const filtered = services
    .filter(s => (category === "All" || s.category === category))
    .filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
    .filter(s => s.rating >= minRating)
    .sort((a, b) => b.rating - a.rating);

  return (
    <main className="app-container">
      <header className="header">
        <div className="header-top">
          
          <div className="logo-wrapper">
            <svg className="logo-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
            <span className="logo-text">Servio</span>
            
            <SearchBar search={search} 
            setSearch={setSearch} />
          </div>

          <button onClick={() => setShowFilters(!showFilters)} className="filter-btn" aria-label="Toggle filters">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
              <circle cx="9" cy="6" r="2" fill="currentColor" />
              <circle cx="15" cy="12" r="2" fill="currentColor" />
              <circle cx="9" cy="18" r="2" fill="currentColor" />
            </svg>
          </button>
        </div>

        {showFilters && (
          <Filter 
            category={category} 
            setCategory={setCategory} 
            categories={categories} 
            minRating={minRating} 
            setMinRating={setMinRating} 
          />
        )}
      </header>
      
      {filtered.length === 0 ? (
        <p className="empty-state">No service available</p>
      ) : (
        <section className="services-grid">
          {filtered.map(s => <Card key={s.id} service={s} />)}
        </section>
      )}
    </main>
  );
}