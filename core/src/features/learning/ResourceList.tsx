import { Resource } from '../../types/learning';
import { ResourceCard } from './ResourceCard';

interface ResourceListProps {
  resources: Resource[];
  onSelect: (resource: Resource) => void;
}

export function ResourceList({ resources, onSelect }: ResourceListProps) {
  if (resources.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No resources found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map(resource => (
        <ResourceCard
          key={resource.id}
          resource={resource}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}