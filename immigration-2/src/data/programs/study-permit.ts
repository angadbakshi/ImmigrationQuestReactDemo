import { ImmigrationProgram } from '../../types/programs';

export const studyPermitProgram: ImmigrationProgram = {
  id: 'study-permit',
  name: 'Study Permit Program',
  type: 'study',
  description: 'For international students who want to study at designated learning institutions in Canada',
  requirements: [
    'Acceptance letter from DLI',
    'Proof of financial support',
    'Clean criminal record',
    'Medical exam if required',
    'Intent to leave after studies'
  ],
  estimatedTimeframe: '8-12 weeks',
  difficulty: 1,
  processingTime: '8 weeks',
  fees: {
    application: 150,
    processing: 85,
    other: 200, // Biometrics
  },
  benefits: [
    'Study at Canadian institutions',
    'Possible work during studies',
    'Spouse/partner work permit',
    'Children study permits',
    'Post-graduation work permit eligibility'
  ],
  steps: [
    {
      id: 'school-acceptance',
      title: 'School Acceptance',
      description: 'Get accepted to a DLI',
      status: 'pending',
      estimatedTime: '2-3 months',
      requirements: [
        'School application',
        'Previous transcripts',
        'Language test results',
        'Letter of intent'
      ],
      documents: [
        'Academic transcripts',
        'Language test results',
        'Statement of purpose',
        'Reference letters'
      ],
      tasks: [
        'Research schools',
        'Submit applications',
        'Pay application fees',
        'Accept offer'
      ]
    },
    // Additional steps...
  ],
};