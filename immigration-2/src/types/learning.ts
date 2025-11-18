export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'guide' | 'quiz';
  category: 'language' | 'culture' | 'legal' | 'employment';
  content: string;
  difficulty: 1 | 2 | 3;
  estimatedTime: number; // in minutes
  tags: string[];
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
  category: 'language' | 'culture' | 'legal' | 'employment';
  difficulty: 1 | 2 | 3;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}