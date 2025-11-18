import { useState } from 'react';

import { mockResources } from '../data/mockData';
import { Resource } from '../types/learning';
import {ResourceFilters, ResourceList} from "core/src/features/learning";

export function Learn() {
  const [filteredResources, setFilteredResources] = useState(mockResources);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleFilter = (type: string, category: string) => {
    let filtered = mockResources;
    
    if (type !== 'all') {
      filtered = filtered.filter(resource => resource.type === type);
    }
    
    if (category !== 'all') {
      filtered = filtered.filter(resource => resource.category === category);
    }
    
    setFilteredResources(filtered);
    setSelectedType(type);
    setSelectedCategory(category);
  };

  const handleSelectResource = (resource: Resource) => {
    console.log('Selected resource:', resource);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Learning Resources</h1>
          <p className="text-gray-600 mt-1">Explore our curated learning materials</p>
        </div>
        
        <ResourceFilters
          selectedType={selectedType}
          selectedCategory={selectedCategory}
          onFilter={handleFilter}
        />
      </div>

      <ResourceList 
        resources={filteredResources}
        onSelect={handleSelectResource}
      />
    </div>
  );
}