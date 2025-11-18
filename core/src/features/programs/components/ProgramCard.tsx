import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, CheckSquare, AlertTriangle, ChevronRight, Users, Heart } from 'lucide-react';
import {ImmigrationProgram} from "../../../../../immigration-2/src/types/programs";
import {Badge, Card} from "../../../components";

interface ProgramCardProps {
  program: ImmigrationProgram;
  onSelect: (program: ImmigrationProgram) => void;
  isSelected?: boolean;
}

export function ProgramCard({ program, onSelect, isSelected }: ProgramCardProps) {
  const navigate = useNavigate();

  const getProgramIcon = (type: string) => {
    switch (type) {
      case 'family':
        return <Heart className="w-6 h-6 text-pink-500" />;
      case 'work':
        return <Users className="w-6 h-6 text-blue-500" />;
      default:
        return <Users className="w-6 h-6 text-gray-500" />;
    }
  };

  // Handle card click for program selection
  const handleCardClick = () => {
    onSelect(program);
  };

  // Handle View Details click
  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Navigate to program details page
    navigate(`/programs/${program.id}`);
  };

  return (
      <Card
          className={`cursor-pointer transition-all hover:scale-[1.02] ${
              isSelected ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'
          }`}
          onClick={handleCardClick}
      >
        <div className="flex items-start gap-4">
          {getProgramIcon(program.type)}
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{program.name}</h3>
                <p className="text-sm text-gray-600">{program.description}</p>
              </div>
              <Badge variant={program.type === 'family' ? 'success' : 'default'}>
                {program.type.toUpperCase()}
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <Clock size={16} />
              <span>{program.estimatedTimeframe}</span>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <CheckSquare size={16} />
                Requirements
              </h4>
              <ul className="space-y-1">
                {program.requirements.map((req, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                      <AlertTriangle size={14} className="mt-1 text-yellow-500" />
                      {req}
                    </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Processing: {program.processingTime}
              </div>
              <button
                  onClick={handleViewDetails}
                  className="flex items-center gap-2 px-4 py-2 rounded-md text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <span className="text-sm font-medium">View Details</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </Card>
  );
}