export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    photoUrl?: string;
  };
  category: 'general' | 'success-stories' | 'questions' | 'tips';
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  comments: Comment[];
  tags: string[];
}

export interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    photoUrl?: string;
  };
  createdAt: Date;
  likes: number;
}