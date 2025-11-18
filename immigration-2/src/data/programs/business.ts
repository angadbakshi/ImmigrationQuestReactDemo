import { ImmigrationProgram } from '../../types/programs';

export const selfEmployedProgram: ImmigrationProgram = {
  id: 'self-employed',
  name: 'Self-Employed Persons Program',
  type: 'business',
  description: 'For self-employed persons who can be self-employed in Canada',
  requirements: [
    'Relevant experience in athletics or cultural activities',
    'Intention and ability to be self-employed in Canada',
    'Meet minimum point requirement',
    'Sufficient settlement funds',
    'Medical and security clearances'
  ],
  estimatedTimeframe: '12-18 months',
  difficulty: 3,
  processingTime: '15 months',
  fees: {
    application: 1575,
    processing: 500,
    other: 200
  },
  benefits: [
    'Permanent residence status',
    'Business ownership opportunities',
    'Family inclusion',
    'Healthcare access',
    'Education rights'
  ],
  steps: [
    {
      id: 'business-validation',
      title: 'Business Experience Validation',
      description: 'Document self-employment experience',
      status: 'pending',
      estimatedTime: '2-3 months',
      requirements: [
        'Business ownership proof',
        'Income statements',
        'Client references'
      ],
      documents: [
        'Business registration',
        'Tax returns',
        'Client contracts'
      ],
      tasks: [
        'Gather business documents',
        'Prepare financial statements',
        'Get reference letters'
      ]
    }
  ]
};