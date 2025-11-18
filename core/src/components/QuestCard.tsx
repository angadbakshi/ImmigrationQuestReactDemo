import { useNavigate } from 'react-router-dom';
import { Trophy, BookOpen, Timer } from 'lucide-react';
import { Card } from '../../../core/src/components/ui/Card';
import { Badge } from '../../../core/src/components/ui/Badge';
import {Quest} from "../../../immigration-2/src/types/quests";

interface QuestCardProps {
  quest: Quest;
  onSelect: (quest: Quest) => void;
}

export function QuestCard({ quest, onSelect }: QuestCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/quests/${quest.id}`);
    onSelect(quest);
  };

  const getDifficultyColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-green-100 text-green-800';
      case 2:
        return 'bg-yellow-100 text-yellow-800';
      case 3:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
      <Card
          className="hover:shadow-lg transition-shadow cursor-pointer p-6"
          onClick={handleClick}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{quest.title}</h3>
          <Badge variant={quest.completed ? 'success' : 'default'}>
            {quest.completed ? 'Completed' : 'In Progress'}
          </Badge>
        </div>

        <p className="text-gray-600 mb-4">{quest.description}</p>

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Trophy size={16} />
            <span>{quest.points} pts</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen size={16} />
            <span>{quest.steps.length} steps</span>
          </div>
          <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${getDifficultyColor(quest.difficulty)}`}>
            <Timer size={16} />
            <span>Level {quest.difficulty}</span>
          </div>
        </div>
      </Card>
  );
}