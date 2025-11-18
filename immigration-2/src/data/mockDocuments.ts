import { Document } from '../../../core/src/types/documents';

export const mockDocuments: Document[] = [
  {
    id: 'passport',
    name: 'Passport',
    description: 'Valid international passport',
    category: 'identification',
    status: 'verified',
    uploadDate: new Date('2024-01-15'),
    verificationDate: new Date('2024-01-20'),
    notes: 'Valid for next 8 years',
  },
  {
    id: 'degree',
    name: 'University Degree',
    description: 'Bachelor of Computer Science',
    category: 'education',
    status: 'uploaded',
    uploadDate: new Date('2024-02-01'),
  },
  {
    id: 'work-letter',
    name: 'Employment Letter',
    description: 'Current employment verification',
    category: 'employment',
    status: 'pending',
  },
  {
    id: 'bank-statement',
    name: 'Bank Statements',
    description: 'Last 6 months of transactions',
    category: 'financial',
    status: 'rejected',
    uploadDate: new Date('2024-01-25'),
    notes: 'Please provide statements with bank seal',
  },
  {
    id: 'language-test',
    name: 'IELTS Results',
    description: 'English language proficiency test results',
    category: 'education',
    status: 'verified',
    uploadDate: new Date('2024-02-10'),
    verificationDate: new Date('2024-02-15'),
  },
];