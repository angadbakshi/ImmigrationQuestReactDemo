import { ImmigrationProgram } from '../../types/programs';

export const ontarioImmigrantNomineeProgram: ImmigrationProgram = {
  id: 'oinp',
  name: 'Ontario Immigrant Nominee Program',
  type: 'permanent',
  description: 'Provincial program for skilled workers who want to live and work in Ontario',
  requirements: [
    'Job offer from Ontario employer',
    'Work experience in skilled occupation',
    'Education requirements',
    'Language proficiency',
    'Settlement funds'
  ],
  estimatedTimeframe: '6-9 months',
  difficulty: 2,
  processingTime: '8 months',
  fees: {
    application: 1500,
    processing: 500,
    other: 200
  },
  benefits: [
    'Provincial nomination',
    'Priority processing',
    'Work in Ontario',
    'Healthcare coverage',
    'Education access'
  ],
  steps: [
    {
      id: 'job-verification',
      title: 'Job Offer Verification',
      description: 'Verify Ontario job offer',
      status: 'pending',
      estimatedTime: '4-6 weeks',
      requirements: [
        'Valid job offer letter',
        'Employer LMIA or exemption',
        'Company registration'
      ],
      documents: [
        'Detailed job offer letter',
        'Employment contract',
        'Company documents'
      ],
      tasks: [
        'Get detailed job offer',
        'Verify employer eligibility',
        'Prepare documentation'
      ]
    }
  ]
};