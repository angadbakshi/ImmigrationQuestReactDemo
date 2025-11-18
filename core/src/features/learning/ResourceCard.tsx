import { Resource } from '../../types/learning';
import { Card } from 'core/src/components/ui/Card';
import { Badge } from 'core/src/components/ui/Badge';
import { Clock, BookOpen, Video, FileText, Award } from 'lucide-react';

interface ResourceCardProps {
  resource: Resource;
  onSelect: (resource: Resource) => void;
}

export function ResourceCard({ resource, onSelect }: ResourceCardProps) {
  const getIcon = () => {
    switch (resource.type) {
      case 'video': return <Video className="text-blue-500" />;
      case 'article': return <FileText className="text-green-500" />;
      case 'quiz': return <Award className="text-purple-500" />;
      default: return <BookOpen className="text-orange-500" />;
    }
  };

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'bg-green-100 text-green-800';
      case 2: return 'bg-yellow-100 text-yellow-800';
      case 3: return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card
      className="h-full flex flex-col hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onSelect(resource)}
    >
      <div className="flex items-start gap-4 p-4">
        <div className="p-2 bg-gray-50 rounded-lg shrink-0">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 truncate">{resource.title}</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {resource.description}
          </p>
        </div>
      </div>

      <div className="mt-auto p-4 pt-0">
        <div className="flex flex-wrap gap-2 mb-3">
          {resource.tags.map((tag, index) => (
            <span 
              key={index}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{resource.estimatedTime} min</span>
          </div>
          <Badge variant="default" className={getDifficultyColor(resource.difficulty)}>
            Level {resource.difficulty}
          </Badge>
        </div>
      </div>
    </Card>
  );
}