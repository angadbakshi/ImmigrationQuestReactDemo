export interface Quest {
  id: string;
  title: string;
  description: string;
  points: number;
  difficulty: 1 | 2 | 3;
  completed: boolean;
  steps: QuestStep[];
}

export interface QuestStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}