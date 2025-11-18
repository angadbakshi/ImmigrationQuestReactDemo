import { Filter } from 'lucide-react';

interface ResourceFiltersProps {
  selectedType: string;
  selectedCategory: string;
  onFilter: (type: string, category: string) => void;
}

export function ResourceFilters({ 
  selectedType,
  selectedCategory,
  onFilter 
}: ResourceFiltersProps) {
  const types = ['all', 'video', 'article', 'guide', 'quiz'];
  const categories = ['all', 'language', 'culture', 'legal', 'employment'];

  return (
    <div className="w-full sm:w-auto bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Filter className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Filters</span>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          value={selectedType}
          onChange={(e) => onFilter(e.target.value, selectedCategory)}
          className="px-3 py-2 bg-white border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
        >
          {types.map(type => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => onFilter(selectedType, e.target.value)}
          className="px-3 py-2 bg-white border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}