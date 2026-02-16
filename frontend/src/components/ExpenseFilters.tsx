interface ExpenseFiltersProps {
  categories: string[];
  selectedCategory: string;
  sortOrder: string;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
  total: number;
  count: number;
}

export const ExpenseFilters: React.FC<ExpenseFiltersProps> = ({
  categories,
  selectedCategory,
  sortOrder,
  onCategoryChange,
  onSortChange,
  total,
  count,
}) => {
  return (
    <div className="card p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="flex-1">
            <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Category
            </label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="input-field"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label htmlFor="sort-order" className="block text-sm font-medium text-gray-700 mb-1">
              Sort by
            </label>
            <select
              id="sort-order"
              value={sortOrder}
              onChange={(e) => onSortChange(e.target.value)}
              className="input-field"
            >
              <option value="date_desc">Date (Newest First)</option>
              <option value="date_asc">Date (Oldest First)</option>
            </select>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 md:min-w-[200px]">
          <p className="text-sm text-gray-600 mb-1">Total</p>
          <p className="text-2xl font-bold text-blue-600">₹{total.toFixed(2)}</p>
          <p className="text-xs text-gray-500 mt-1">
            {count} expense{count !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </div>
  );
};
