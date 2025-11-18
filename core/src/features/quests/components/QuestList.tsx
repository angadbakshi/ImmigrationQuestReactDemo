import {Quest} from "../../../../../immigration-2/src/types/quests";
import {QuestCard} from "../../../components/QuestCard";

interface QuestListProps {
  quests: Quest[];
  onSelectQuest: (quest: Quest) => void;
}

export function QuestList({ quests, onSelectQuest }: QuestListProps) {
  if (!quests.length) {
    return (
        <div className="text-center py-8 text-gray-500">
          No quests available at the moment.
        </div>
    );
  }

  return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quests.map((quest) => (
            <QuestCard
                key={quest.id}
                quest={quest}
                onSelect={onSelectQuest}
            />
        ))}
      </div>
  );
}