interface FilterProps {
  category: string;
  setCategory: (val: string) => void;
  categories: string[];
  minRating: number;
  setMinRating: (val: number) => void;
}

export default function Filter({ category, setCategory, categories, minRating, setMinRating }: FilterProps) {
  const ratings = [0, 3, 3.5, 4, 4.5, 5];
  
  const getBtnClass = (isActive: boolean, color: string) => 
    `btn btn-${color} ${isActive ? 'btn-active' : 'btn-inactive'}`;

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