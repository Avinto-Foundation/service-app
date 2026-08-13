interface FilterProps {
  category: string;
  setCategory: (val: string) => void;
  categories: string[];
  minRating: number;
  setMinRating: (val: number) => void;
  isSidebar?: boolean;
  onApply?: () => void;
}

export default function Filter({ 
  category, 
  setCategory, 
  categories, 
  minRating, 
  setMinRating, 
  isSidebar = false,
  onApply
}: FilterProps) {
  const ratings = [0, 3, 3.5, 4, 4.5, 5];
  
  const getBtnClass = (isActive: boolean, color: string) => 
    `btn btn-${color} ${isActive ? 'btn-active' : 'btn-inactive'}`;

  if (isSidebar) {
    return (
      <aside className="filter-sidebar-box">
        <h3 className="sidebar-title">Filters</h3>
        
        <div className="sidebar-section">
          <h4 className="sidebar-heading">Categories</h4>
          <div className="sidebar-btn-group">
            {categories.map(c => (
              <button 
                key={c} 
                onClick={() => setCategory(c)} 
                className={`side-btn ${category === c ? 'side-active' : ''}`}
              >
                <span className={`custom-checkbox ${category === c ? 'checked' : ''}`}></span>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="sidebar-section">
          <h4 className="sidebar-heading">Ratings</h4>
          <div className="sidebar-btn-group">
            {ratings.map(r => (
              <button 
                key={r} 
                onClick={() => setMinRating(r)} 
                className={`side-btn ${minRating === r ? 'side-active' : ''}`}
              >
                <span className={`custom-checkbox ${minRating === r ? 'checked' : ''}`}></span>
                {r ? `${r}+ ★` : "All Ratings"}
              </button>
            ))}
          </div>
        </div>

        <button onClick={onApply} className="apply-btn">
          Apply Filters
        </button>
      </aside>
    );
  }

  return (
    <div className="filters-container">
      <div className="filter-group">
        {categories.map(c => (
          <button key={c} onClick={() => setCategory(c)} className={getBtnClass(category === c, "blue")}>
            {c}
          </button>
        ))}
      </div>
      <div className="filter-group">
        {ratings.map(r => (
          <button key={r} onClick={() => setMinRating(r)} className={getBtnClass(minRating === r, "green")}>
            {r ? `${r}+ ★` : "All Ratings"}
          </button>
        ))}
      </div>
    </div>
  );
}