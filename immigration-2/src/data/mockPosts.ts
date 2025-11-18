import { ForumPost } from '../types/community';

export const mockPosts: ForumPost[] = [
  {
    id: 'success-story-1',
    title: 'My Journey to Permanent Residency',
    content: 'After 18 months of hard work and dedication, I finally received my PR status! Here\'s how I navigated the process...',
    author: {
      id: 'user1',
      name: 'Michael Chang',
      photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    },
    category: 'success-stories',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
    likes: 124,
    comments: [
      {
        id: 'comment1',
        content: 'Congratulations! Your story is truly inspiring.',
        author: {
          id: 'user2',
          name: 'Emma Wilson',
          photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
        },
        createdAt: new Date('2024-02-16'),
        likes: 12,
      }
    ],
    tags: ['Success Story', 'PR Application', 'Tips'],
  },
  {
    id: 'question-1',
    title: 'Language Test Requirements Query',
    content: 'I\'m confused about the minimum language scores needed for the Skilled Worker program. Can someone clarify?',
    author: {
      id: 'user3',
      name: 'Sofia Rodriguez',
      photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    },
    category: 'questions',
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-20'),
    likes: 45,
    comments: [],
    tags: ['Language Test', 'Requirements', 'IELTS'],
  },
  {
    id: 'tips-1',
    title: 'Document Organization Tips',
    content: 'Here\'s my system for keeping immigration documents organized and easily accessible...',
    author: {
      id: 'user4',
      name: 'David Kim',
      photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    },
    category: 'tips',
    createdAt: new Date('2024-02-18'),
    updatedAt: new Date('2024-02-19'),
    likes: 89,
    comments: [],
    tags: ['Organization', 'Documents', 'Advice'],
  },
];