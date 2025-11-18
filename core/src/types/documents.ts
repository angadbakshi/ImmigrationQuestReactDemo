export interface Document {
  id: string;
  name: string;
  description: string;
  category: 'identification' | 'education' | 'financial' | 'employment' | 'other';
  status: 'pending' | 'uploaded' | 'verified' | 'rejected' | 'approved';
  url?: string;
  uploadDate?: Date;
  verificationDate?: Date;
  notes?: string;
}

export interface DocumentFolder {
  id: string;
  name: string;
  documents: Document[];
}