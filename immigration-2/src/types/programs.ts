export interface ImmigrationStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  estimatedTime: string;
  requirements: string[];
  documents: string[];
  tasks: string[];
}

export interface ImmigrationProgram {
  id: string;
  name: string;
  type: 'work' | 'study' | 'family' | 'permanent' | 'startup' | 'investor' | 'business' | 'undefined';
  description: string;
  requirements: string[];
  estimatedTimeframe: string;
  difficulty: 1 | 2 | 3;
  steps: ImmigrationStep[];
  eligibilityPoints?: number;
  processingTime: string;
  fees: {
    application: number;
    processing: number;
    other?: number;
  };
  benefits: string[];
}