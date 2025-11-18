import { Task } from '../types/tasks';

export const mockTasks: Task[] = [
  {
    id: 'language-test',
    title: 'Complete IELTS Test',
    description: 'Schedule and complete English language proficiency test',
    dueDate: new Date('2024-04-15'),
    priority: 'high',
    status: 'in-progress',
    category: 'application',
    checklist: [
      { id: 'book', text: 'Book test date', completed: true },
      { id: 'practice', text: 'Complete practice tests', completed: true },
      { id: 'documents', text: 'Prepare required documents', completed: false },
      { id: 'test', text: 'Take the test', completed: false },
    ],
  },
  {
    id: 'medical-exam',
    title: 'Immigration Medical Exam',
    description: 'Complete medical examination with approved physician',
    dueDate: new Date('2024-03-30'),
    priority: 'medium',
    status: 'pending',
    category: 'documents',
    checklist: [
      { id: 'find', text: 'Find approved physician', completed: false },
      { id: 'schedule', text: 'Schedule appointment', completed: false },
      { id: 'records', text: 'Gather medical records', completed: false },
    ],
  },
  {
    id: 'police-cert',
    title: 'Police Clearance Certificate',
    description: 'Obtain police clearance from all countries of residence',
    dueDate: new Date('2024-05-01'),
    priority: 'medium',
    status: 'pending',
    category: 'documents',
    checklist: [
      { id: 'apply', text: 'Submit application', completed: false },
      { id: 'payment', text: 'Pay processing fee', completed: false },
      { id: 'fingerprints', text: 'Complete fingerprinting', completed: false },
    ],
  },
];